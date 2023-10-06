'use client'
import { useSession } from "next-auth/react"
import React, { useContext, useState } from 'react'
import sideMenuContext from '../../components/context/sideMenuContext'
import AddTask from '../../components/addTask/addTask'
import ViewContainer from "@/app/components/Svg/ViewContainer"
import { TaskContext } from "@/app/components/context/taskContext"
import Task from "@/app/components/addTask/Task"
import { redirect } from "next/navigation"
import formatDate from "@/app/lib/formatDate"



function Upcoming() {
    const { data: session } = useSession();
    const tasks = useContext(TaskContext);
    const sideMenuAtive = useContext(sideMenuContext);

    const upComingTasks = tasks.filter(
        (t) =>
        (
            t && t.due && t.due > new Date()
        ))
    
    console.log(upComingTasks, new Date());
    

    const uniqueDates: Date[] = [];

    upComingTasks.forEach((task) => {
        if (!uniqueDates.some((date) => date.toDateString() === task?.due?.toDateString())) {
            uniqueDates.push(task.due as Date);
        }
    });

    uniqueDates.sort((a,b)=> {
        return a.getTime() - b.getTime();
    })



    if (!session) {
        redirect('/login')
    }
    return (
        <div className={`grow  flex justify-center  transition-all duration-[500ms] ease-in-out ${sideMenuAtive ? '' : 'min-[800px]:ml-[-275px]'}`}>

            <main className="app-container | flex flex-col gap-3 mt-8">
                <div className="flex justify-between pr-2 pb-3 border-b-[1px] ">
                    <h1 className="font-bold text-[24px]">Upcoming Tasks</h1>
                    <ViewContainer />
                </div>
                <div className="flex flex-col w-full gap-2 ">
                    <ul className="flex flex-col gap-4">
                        {uniqueDates.map((date, index) => (
                            <li key={date.toString()} className="">
                                <ul className="flex flex-col gap-2 mt-1">
                                    <h2 className="font-bold text-gray-600 text-[16px] border-b-[1px] ">{formatDate(date)}</h2>
                                    {upComingTasks
                                        .filter((task) => task?.due?.toDateString() === date.toDateString())
                                        .map((filteredTask, taskIndex) => (
                                            <Task key={filteredTask.id} task={filteredTask} />
                                        ))}
                                </ul>

                            </li>
                        ))}
                    </ul>
                </div>
            </main>

        </div>
    )
}

export default Upcoming