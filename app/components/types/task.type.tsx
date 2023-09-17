 type Task = {
    id : number,
    name: string | null;
    description?: string | null;
    priority?:string | null | undefined;
    due?: Date | null;
    label?: string[];
    // Add any other properties you need
  };

  export default Task;