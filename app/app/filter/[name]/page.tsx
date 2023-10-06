"use client"

import { useContext } from 'react'
import { TaskContext, SetTaskContext } from '../../../components/context/taskContext'
import ViewContainer from '@/app/components/Svg/ViewContainer'
import Task from "@/app/components/addTask/Task"
import AddTask from '../../../components/addTask/addTask'
import sideMenuContext from '../../../components/context/sideMenuContext'

export default function Page({ params }: { params: { name: string } }) {
    const priority = params.name;
    const priorityName = params.name == 'P4' ? 'Priority 4' : params.name == 'P2' ? 'Priority 2' :
                        params.name == 'P3' ? 'Priority 3' : 'Prioirty 4'
    const tasks = useContext(TaskContext);
    const sideMenuAtive = useContext(sideMenuContext);
    const labelTask = tasks.filter((t) => {
        return t.priority == priority;
    })


    return (
        <div className={`grow  flex justify-center  transition-all duration-[500ms] ease-in-out ${sideMenuAtive ? 'min-[800px]:ml-[275px]' :'' }`}>

            <main className="app-container | flex flex-col  mt-8">
                <div className="flex justify-between pr-2 pb-3 border-b-[1px] ">
                    <h1 className="font-bold text-[24px]   ">{priorityName}
                    </h1>
                    <ViewContainer />
                </div>
                <div className="flex flex-col w-full gap-2 ">
                    <ul>
                        {labelTask.map((task) => (
                            <Task  key={task.id} task={task} />
                        ))}
                    </ul>
                    <AddTask priority={priority} />
                </div>
            </main>

        </div>
    )

}