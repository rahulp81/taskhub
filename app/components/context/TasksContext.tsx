import { createContext, useState, useEffect, useRef } from 'react';
import { TaskContext, SetTaskContext } from "./taskContext";

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

function TasksContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [task, setTask] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

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
        console.log('result', tasks);

        const tasksWithFormattedDue = tasks.map((task: Task) => ({
          ...task,
          due: task.due ? new Date(task.due) : null, // Convert due date to desired format
        }));
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

    fetchData(); // Call the async function inside useEffect
  }, []);

  return (
    <TaskContext.Provider value={task}>
      <SetTaskContext.Provider value={setTask}>
        <TaskLoadingContext.Provider value={loading}>
          {children}
        </TaskLoadingContext.Provider>
      </SetTaskContext.Provider>
    </TaskContext.Provider>
  );
}

export default TasksContext;
