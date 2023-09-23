'use client'
import React, { useContext, useState } from 'react'
import sideMenuContext from '../../../components/context/sideMenuContext'
import AddTask from '../../../components/addTask/addTask'
import ViewContainer from "@/app/components/Svg/ViewContainer"
import { TaskContext } from "@/app/components/context/taskContext"
import Task from "@/app/components/addTask/Task"

function Today({params} : {params : {name  : string}} ) {
  const tasks = useContext(TaskContext);
  const tasksInProject = tasks.filter((task)=> task.project ==  params.name);
  const sideMenuActive = useContext(sideMenuContext);
  return (
    <div className={`grow  flex justify-center  transition-all duration-[500ms] ease-in-out ${sideMenuActive ? '' : 'min-[800px]:ml-[-275px]'}`}>

      <main className="app-container | flex flex-col  mt-8">
        <div className="flex justify-between pr-2 pb-3 border-b-[1px] ">
          <h1 className="font-bold text-[24px]   ">{params.name}
          </h1>
          <ViewContainer />
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <ul>
            {tasksInProject.map((task) => (
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