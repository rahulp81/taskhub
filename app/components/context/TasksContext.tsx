import React, { useState } from 'react';
import { TaskContext, SetTaskContext } from "./taskContext";

type Task = {
  id : number,
  name: string | null;
  description?: string | null;
  // Add any other properties you need
};

function TasksContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [task, setTask] = useState<Task[]>([]);

  return (
    <TaskContext.Provider value={task}>
      <SetTaskContext.Provider value={setTask}>
        {children}
      </SetTaskContext.Provider>
    </TaskContext.Provider>
  );
}

export default TasksContext;
