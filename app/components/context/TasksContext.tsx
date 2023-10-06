import { createContext, useState, useEffect, useRef, useContext } from 'react';
import { TaskContext, SetTaskContext, OverDueTasksContext, SetOverDueTasksContext } from "./taskContext";

type Task = {
  id: number,
  name: string | null;
  description?: string | null;
  labels?: string[] | null;
  due?: Date | null;
  priority?: string | null;
};

// Create a context with an initial value of false (not loading)
export const TaskLoadingContext = createContext<boolean>(false);

export function useCheckOverdueTask() {
  const overdue = useContext(OverDueTasksContext);
  if (!overdue) {
    throw new Error("useTagsContext must be used within a TagsProvider");
  }
  return { overdue };
}

function TasksContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [task, setTask] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const currentTime = new Date();
  currentTime.setHours(0, 0, 0, 0)
  const overdueTasks = task.filter((t: Task) => t.due && t.due < currentTime)

  const retryRef = useRef<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      console.log('calling fetch');
      try {
        setLoading(true); // Set loading to true when fetching data
        const res = await fetch('/api/app/task');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const { tasks } = await res.json();


        const tasksWithFormattedDue = tasks.map((task: Task) => ({
          ...task,
          due: task.due ? new Date(task.due) : null, // Convert due date to desired format
        }));
        console.log('result', tasksWithFormattedDue);
        setTask(tasksWithFormattedDue);
        retryRef.current = 0;
      } catch (error) {
        if (retryRef.current < 3) {
          retryRef.current += 1;
          await fetchData(); // Retry the fetchData function
        } else {
          retryRef.current = 0;
          console.error('Failed to fetch data after 3 retries:', error);
        }
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
  }, []);

  return (
    <TaskContext.Provider value={task}>
      <SetTaskContext.Provider value={setTask}>
        <OverDueTasksContext.Provider value={overdueTasks}>
        <TaskLoadingContext.Provider value={loading}>
          {children}
        </TaskLoadingContext.Provider>
        </OverDueTasksContext.Provider>
      </SetTaskContext.Provider>
    </TaskContext.Provider>
  );
}

export default TasksContext;
