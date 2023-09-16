"use client"
import { TaskContext } from '@/app/components/context/taskContext'
import React, { useContext } from 'react'
import DateSelector from '@/app/components/datePicker/DatePicker'



function Inbox() {
  const task = useContext(TaskContext)
  console.log(task);
  return (
    <>
      <div>Inbox</div>
      <DateSelector/>
    </>

  )
}

export default Inbox