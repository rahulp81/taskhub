import { useContext } from "react";
import { TaskContext } from "../components/context/taskContext"

export function getProjectInstaces(project){
    const tasks = useContext(TaskContext);
    let instaces = tasks.filter((t)=>t.project == project);
    return instaces.length
}

