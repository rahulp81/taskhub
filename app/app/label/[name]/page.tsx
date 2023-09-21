"use client"

import { useContext } from 'react'
import { TaskContext, SetTaskContext } from '../../../components/context/taskContext'
import ViewContainer from '@/app/components/Svg/ViewContainer'
import Task from "@/app/components/addTask/Task"
import AddTask from '../../../components/addTask/addTask'
import { useSession } from 'next-auth/react'
import sideMenuContext from '../../../components/context/sideMenuContext'

export default function Page({ params }: { params: { label: string } }) {
    const { data: session } = useSession();
    const label = params.label
    const tasks = useContext(TaskContext);
    const sideMenuAtive = useContext(sideMenuContext);
    const labelTask = tasks.filter((t) => {
        console.log(t.labels);

        return t.labels?.includes(label)
    })
    console.log(labelTask, 'label task');

    const setTask = useContext(SetTaskContext)
    console.log(tasks);


    return (
        <div className={`grow  flex justify-center  transition-all duration-[500ms] ease-in-out ${sideMenuAtive ? '' : 'min-[800px]:ml-[-275px]'}`}>

            <main className="app-container | flex flex-col  mt-8">
                <div className="flex justify-between pr-2 pb-3 border-b-[1px] ">
                    <h1 className="font-bold text-[24px]   ">{label}
                    </h1>
                    <ViewContainer />
                </div>
                <div className="flex flex-col w-full gap-2 ">
                    <ul>
                        {labelTask.map((task) => (
                            <Task key={task.id} task={task} />
                        ))}
                    </ul>
                    <AddTask />
                </div>
            </main>

        </div>
    )

}