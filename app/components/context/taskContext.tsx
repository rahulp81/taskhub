import { createContext } from "react";

type Task = {
    id:number,
    name: string | null;
    description?: string | null;
    priority?:string | null;
    due?:Date | null;
    labels? :string[] | null;
    project?: string | null;
  };
  // Define the types for your contexts
  type TaskContextType = Task[];
  type SetTaskContextType = React.Dispatch<React.SetStateAction<Task[]>>;
  
  // Create the contexts
  export const TaskContext = createContext<TaskContextType>([]);
  export const SetTaskContext = createContext<SetTaskContextType>(() => {});
  