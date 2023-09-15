"use client"
import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import Task from '../types/task.type'
import { Image } from 'next/dist/client/image-component'
import DueDate from '../Svg/DueDate';
import Label from '../Svg/Label';
import { SetTaskContext, TaskContext } from '../context/taskContext';
import TaskMenu from '../OptionsMenu/TaskMenu';
import Priority from '../Svg/Priority';

interface TaskProps {
  task: Task;
}

export default function Task({ task }: TaskProps) {
  const updateTask = useContext(SetTaskContext);
  const tasks = useContext(TaskContext)
  const [isEditing, setIsEditing] = useState(false);
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState(task.priority as string)
  const [updatedPriority,setUpdatedPriority] = useState(priority);

  const [isVisible, setIsVisible] = useState(false);

  // For Editor
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);


  function editTask(e: FormEvent) {
    e.preventDefault();
    setPriority(updatedPriority);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('task-name') as string | null;
    const description = formData.get('task-description') as string | null;
    const id = task.id;
    const priority = updatedPriority;
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((orginalTask) => orginalTask.id === id)

    if (taskIndex !== -1) {
      updatedTasks[taskIndex] = {
        id: id,
        name: name,
        description: description,
        priority:priority,
      }
    }
    updateTask(updatedTasks);
    const form = e.currentTarget as HTMLFormElement;
    setIsEditing(!isEditing)
  }

  function deleteTask() {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    updateTask(updatedTasks);
  }


  return (!isEditing) ?
    (<li
      key={task.id}
      className="border-b-[1px] flex px-2.5 pt-2.5 pb-6 justify-between cursor-pointer group relative" >
      <div className="flex gap-2.5 relative">
        <span className="absolute -top-[2px] -left-[33px] opacity-0 group-hover:opacity-100 rounded hover:bg-slate-100 cursor-move p-[2px]">
          <Image src={'/icons/drag.svg'} alt="drag" height={20} width={20} />
        </span>
        <button className=" done | w-[20px] h-[20px] border-[1.5px] border-gray-500 p-1 rounded-full flex items-center hover:bg-slate-100">
          <span className="text-sm hidden">&#x2713;</span>
        </button>
        <div className='flex flex-col'>
          <span>{task.name}</span>
          <span className='text-[13px] text-gray-600 mt-1'>{task.description}</span>
        </div>
      </div>
      <div className="">
        <div className="flex gap-2 -mt-1 opacity-0 group-hover:opacity-100">
          <button className="rounded hover:bg-slate-200 p-1" onClick={() => setIsEditing(!isEditing)}>
            <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </div>
          </button>
          <button className="rounded hover:bg-slate-200 p-1">
            <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h16" />
                <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              </svg>
            </div>
          </button>
          <button className="rounded hover:bg-slate-200 p-1 relative" onClick={() => setIsVisible(!isVisible)}>
            <TaskMenu active={isVisible} />
            <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
            </div>
          </button>
        </div>
        {/* <button></button>  this is for task if it is anywhere than inbox aka has Project*/}
      </div>
    </li>) :
    (
      (
        // onClick={() => {setEditing(!editing)}}
        <form className='border-[1px] rounded-lg flex flex-col  border-gray-400' onSubmit={editTask}>
          <div className='gap-2 flex flex-col px-3 py-2'>
            <input type="text" value={name as string} onChange={(e) => { setName(e.target.value) }} name='task-name' placeholder='Task Name' className='placeholder:font-medium font-medium' />
            <input type="text" value={description as string} onChange={(e) => { setDescription(e.target.value) }} name='task-description' placeholder='Description' className='placeholder:font-normal ml-0.5 text-[14px] placeholder:text-sm ' />
          </div>
          <div className='flex gap-2.5 px-3 pt-1.5 pb-4'>
            <DueDate />
            <Priority setPriority={setUpdatedPriority} priority={updatedPriority} />
            <Label />
          </div>
          <div className='border-t-[1px] px-3 py-2 flex justify-between'>
            <button className='px-2 py-2  rounded hover:bg-blue-50'>
              <div className='flex gap-1 items-center '>
                <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 24 24"><path d="M4.02381 3.78307C4.12549 3.32553 4.5313 3 5 3H19C19.4687 3 19.8745 3.32553 19.9762 3.78307L21.9762 12.7831C21.992 12.8543 22 12.927 22 13V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V13C2 12.927 2.00799 12.8543 2.02381 12.7831L4.02381 3.78307ZM5.80217 5L4.24662 12H9C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12H19.7534L18.1978 5H5.80217ZM16.584 14C15.8124 15.7659 14.0503 17 12 17C9.94968 17 8.1876 15.7659 7.41604 14H4V19H20V14H16.584Z" fill="#dc4c3e"></path></svg>
                <span className='text-black text-sm '>Inbox</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className='ml-1' ><path d="m11.998 17 7-8h-14z"></path></svg>
              </div>
            </button>
            <div className='flex gap-2'>
              <button type='button' className='text-sm  px-3 rounded font-semibold bg-zinc-100 hover:bg-zinc-200' onClick={() => {
                setIsEditing(!isEditing);
                setUpdatedPriority(priority);
                }}>
                Cancel
              </button>
              <button type='submit' className={'text-sm px-3 rounded font-semibold bg-blue-500 text-white hover:bg-blue-600'}>
                Edit task
              </button>
            </div>
          </div>
        </form>
      )

    )

}

