'use client'
import Image from "next/image"
import { useSession } from "next-auth/react"
import CalendarIcon from "../../components/Svg/currentDate"
import React, { useContext, useState } from 'react'
import sideMenuContext from '../../components/context/sideMenuContext'
import currentDate from '../../lib/currentDate'
import AddTask from '../../components/addTask/addTask'
import ViewContainer from "@/app/components/Svg/ViewContainer"
import { TaskContext } from "@/app/components/context/taskContext"
import Task from "@/app/components/addTask/Task"

function Today() {
  const tasks = useContext(TaskContext);
  const sideMenuAtive = useContext(sideMenuContext);
  console.log(tasks);

  const todaysTasks = tasks.filter((task)=> task.due?.toDateString() == new Date().toDateString() )
  return (
    <div className={`grow  flex justify-center  transition-all duration-[500ms] ease-in-out ${sideMenuAtive ? '' : 'min-[800px]:ml-[-275px]'}`}>

      <main className="app-container | flex flex-col  mt-8">
        <div className="flex justify-between pr-2 pb-3 border-b-[1px] ">
          <h1 className="font-bold text-[24px]   ">Today
            <span className="text-[14px] text-gray-500 font-normal ml-2">{currentDate}</span>
          </h1>
          <ViewContainer />
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <ul>
            {todaysTasks.map((task) => (
              <Task key={task.id} task={task}/>
            ))}
          </ul>
          <AddTask />
        </div>
      </main>

    </div>
  )
}

export default Today