"use client"
import { TaskContext } from '@/app/components/context/taskContext'
import React, { useContext } from 'react'
import DateSelector from '@/app/components/datePicker/DatePicker'
import DeleteModal from '@/app/components/Modals/DeleteModal'


function Inbox() {
  const task = useContext(TaskContext)
  console.log(task);
  return (
    <>
      <div>Inbox</div>
      <DeleteModal/>
    </>

  )
}

export default Inbox