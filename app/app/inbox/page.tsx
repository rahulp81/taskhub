"use client"
import {TaskContext} from '@/app/components/context/taskContext'
import React, { useContext } from 'react'

function Inbox() {
  const task = useContext(TaskContext)
  console.log(task);
  return (
    <div>Inbox</div>
  )
}

export default Inbox