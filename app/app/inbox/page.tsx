'use client'
import { useSession } from "next-auth/react"
import React, { useContext, useState } from 'react'
import sideMenuContext from '../../components/context/sideMenuContext'
import AddTask from '../../components/addTask/addTask'
import ViewContainer from "@/app/components/Svg/ViewContainer"
import { TaskContext } from "@/app/components/context/taskContext"
import Task from "@/app/components/addTask/Task"
import { redirect } from "next/navigation"

function Inbox() {
  const { data: session } = useSession();
  const tasks = useContext(TaskContext);
  const sideMenuAtive = useContext(sideMenuContext);

  const inBoxTask = tasks.filter((t)=> (t.project=='Inbox'))


  if (!session) {
    redirect('/login')
  }
  return (
    <div className={`grow  flex justify-center  transition-all duration-[500ms] ease-in-out ${sideMenuAtive ? '' : 'min-[800px]:ml-[-275px]'}`}>

      <main className="app-container | flex flex-col  mt-8">
        <div className="flex justify-between pr-2 pb-3 border-b-[1px] ">
          <h1 className="font-bold text-[24px]">Inbox</h1>
          <ViewContainer />
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <ul>
            {inBoxTask.map((task) => (
              <Task key={task.id} task={task}/>
            ))}
          </ul>
          <AddTask />
        </div>
      </main>

    </div>
  )
}

export default Inbox