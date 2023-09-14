'use client'
import Image from "next/image"
import { useSession } from "next-auth/react"
import CalendarIcon from "../../components/Svg/currentDate"
import React, { useContext, useState } from 'react'
import sideMenuContext from '../../components/context/sideMenuContext'
import currentDate from '../../lib/currentDate'
import AddTask from '../../components/addTask/addTask'
import ViewContainer from "@/app/components/Svg/ViewContainer"

function Today() {
  const { data: session } = useSession();
  const sideMenuAtive = useContext(sideMenuContext)
  return (
    <div className={`grow  flex justify-center  transition-all duration-[500ms] ease-in-out ${sideMenuAtive ? '' : 'min-[800px]:ml-[-275px]'}`}>

      <main className="app-container | flex flex-col  mt-8">
        <div className="flex justify-between pr-2 pb-3 border-b-[1px] mb-1">
          <h1 className="font-bold text-[24px]   ">Today
            <span className="text-[14px] text-gray-500 font-normal ml-2">{currentDate}</span>
          </h1>
          <ViewContainer />
        </div>
        <div className="flex flex-col w-full mt-0.5">
          <div>
            <AddTask />
          </div>

        </div>
      </main>

    </div>
  )
}

export default Today