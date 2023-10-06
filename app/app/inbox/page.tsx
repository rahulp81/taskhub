'use client'
import { useSession } from "next-auth/react"
import React, { useContext, useState } from 'react'
import sideMenuContext from '../../components/context/sideMenuContext'
import AddTask from '../../components/addTask/addTask'
import ViewContainer from "@/app/components/Svg/ViewContainer"
import { TaskContext } from "@/app/components/context/taskContext"
import { TaskLoadingContext } from "@/app/components/context/TasksContext"
import Task from "@/app/components/addTask/Task"
import { redirect } from "next/navigation"
import PulseLoader from "react-spinners/PulseLoader"
import OverDue from "@/app/components/overDue/OverDue"

function Inbox() {
  const { data: session } = useSession();
  const tasks = useContext(TaskContext);
  const loading = useContext(TaskLoadingContext);
  const sideMenuAtive = useContext(sideMenuContext);
  const inBoxTask = tasks.filter((t) => (t.project == 'Inbox'))
  

  if (!session) {
    redirect('/login')
  }
  return (
    <div className={`grow  flex justify-center  transition-all duration-[500ms] ease-in-out ${sideMenuAtive ? 'min-[800px]:ml-[275px]' :'' }`}>

      <main className="app-container | flex flex-col gap-7  mt-8">
        <div className="flex justify-between pr-2 pb-3 border-b-[1px] ">
          <h1 className="font-bold text-[24px]">Inbox</h1>
          <ViewContainer />
        </div>
        <OverDue/>
        <div className={`flex flex-col w-full min-h-full gap-2 `}>
          {loading ?
            (<div className=" flex h-full items-center justify-center" >
              <PulseLoader color="#0911ed" size={15} />
            </div>) :
            <ul>
              {inBoxTask.map((task) => (
                <Task key={task.id} task={task} />
              ))}
              <AddTask />
            </ul>
          }
        </div>
      </main>

    </div>
  )
}

export default Inbox