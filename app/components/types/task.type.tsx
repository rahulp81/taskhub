 type Task = {
    id : number,
    name: string | null;
    description?: string | null;
    priority?:string | null | undefined;
    due?: Date | null;
    labels?: string[];
    project?:string | null,
    // Add any other properties you need
  };

  export default Task;