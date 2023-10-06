"use client"
import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import Task from '../types/task.type'
import { Image } from 'next/dist/client/image-component'
import DueDate from '../Svg/DueDate';
import Label from '../Svg/Label';
import { SetTaskContext, TaskContext } from '../context/taskContext';
import TaskMenu from '../OptionsMenu/TaskMenu';
import Priority from '../Svg/Priority';
import { format } from 'date-fns';
import Link from 'next/link';
import Project from '../projects/Project';
import DeleteDialog from '../Modals/DeleteModal';
import { useCompletedTaskContext } from '../context/CompletedTaskContextWrapper';
import { toast } from 'react-toastify';
import { useSyncContext } from '../context/SyncContext';
import { useCheckOverdueTask } from '../context/TasksContext';

interface TaskProps {
  task: Task;
  overdue?: boolean
}

interface completedTaskType {
  taskName: string,
  completedAt: Date
  status: 'ontime' | 'late' | 'noDue'
}


const todaysDate = new Date();
todaysDate.setHours(0, 0, 0, 0);

export default function Task({ task, overdue }: TaskProps) {
  const updateTask = useContext(SetTaskContext);
  const tasks = useContext(TaskContext)
  const [isEditing, setIsEditing] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(task.due as Date)
  const [priority, setPriority] = useState(task.priority as string)
  const [labels, setLabels] = useState<string[] | null>(task.labels as string[])
  const [taskProject, setTaskProject] = useState<string | null>(task.project || null)
  const [updatedPriority, setUpdatedPriority] = useState(priority);
  const [updatedDueDate, setUpdatedDueDate] = useState<Date | null>(dueDate as Date)  //
  const [updatedLabels, setUpdatedLabels] = useState<string[] | null>(labels as string[]);
  const [updatedTaskProject, setUpdatedTaskProject] = useState<string | null>(taskProject)
  const [modalOpen, setModalOpen] = useState(false);
  const doneButtonRef = useRef<HTMLButtonElement | null>(null);
  const { setCompletedTask } = useCompletedTaskContext()
  const { setSync } = useSyncContext();
  const { overdue : overDue } = useCheckOverdueTask()

  // For Editor
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const currentLabels =
    <span className='gap-1 flex flex-wrap sm:justify-end'>
      {updatedLabels?.map((label, index) => (
        <span className='bg-blue-100 rounded px-1' key={index}>
          #{label}
        </span>
      ))}
    </span>


  const date = task.due as Date;
  let formattedDate: string | null = null;

  if (date) {
    formattedDate = format(date, 'd MMM yyyy');
  }


  function editTask(e: FormEvent) {
    e.preventDefault();
    setPriority(updatedPriority);
    setDueDate(updatedDueDate)
    setLabels(updatedLabels)
    setTaskProject(updatedTaskProject)
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('task-name') as string | null;
    const description = formData.get('task-description') as string | null;
    const id = task.id;
    const priority = updatedPriority;
    const due = updatedDueDate;
    const tags = updatedLabels;
    const project = updatedTaskProject
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((orginalTask) => orginalTask.id === id)

    if (taskIndex !== -1) {
      updatedTasks[taskIndex] = {
        id: id,
        name: name,
        description: description,
        priority: priority,
        due: due,
        labels: tags,
        project: project,
      }
    }
    updateTask(updatedTasks);

    setSync({
      type: 'task',
      action: 'PATCH',
      command: {
        taskDetail: {
          id: id,
          name: name,
          description: description,
          priority: priority,
          due: due,
          labels: tags,
          project: project,
        }
      }
    })

    // const form = e.currentTarget as HTMLFormElement;
    setIsEditing(!isEditing)
  }

  function deleteTask() {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    updateTask(updatedTasks);
    setSync({
      type: 'task',
      action: 'DELETE',
      command: {
        taskId: task.id
      }
    })

  }

  async function handleDoneClick() {
    const button = doneButtonRef.current as HTMLButtonElement;
    button?.classList.add('expand-button');
    const audio = new Audio('/sound/taskdone.mp3');
    audio.play();

    setTimeout(() => {

      const completedTaskItem: completedTaskType = {
        taskName: task.name as string,
        completedAt: new Date(),
        status: task.due ? (task.due >= todaysDate ? 'ontime' : 'late') : 'noDue',
      };

      setCompletedTask((prevTask) => {
        if (prevTask) {
          return [...prevTask, completedTaskItem];
        }
        return [completedTaskItem];
      });

      setSync({
        type: 'completedTask',
        command: {
          completedTaskItem: completedTaskItem,
          taskId: task.id
        }
      })

      const updatedTasks = tasks.filter((t) => t.id !== task.id);
      updateTask(updatedTasks);
      toast.success(
        <p>
          Task {name} completed
        </p>
      );


    }, 300);

  }



  return (!isEditing) ?
    (
      <>
        <li
          key={task.id}
          className="border-b-[1px] flex px-2.5 py-2.5 justify-between  group relative" >
          <div className="flex gap-2.5 relative">
            {/* Drag feature <span className="absolute -top-[2px] -left-[33px] opacity-0 group-hover:opacity-100 rounded hover:bg-slate-100 cursor-move p-[2px]">
          <Image src={'/icons/drag.svg'} alt="drag" height={20} width={20} />
        </span> */}
            <button onClick={handleDoneClick} ref={doneButtonRef} className={`done | w-[20px] h-[20px] border-[1.5px]  p-1 rounded-full flex items-center hover:bg-slate-100
         ${priority == 'P1' ? `border-red-500 bg-red-300` : priority == 'P2' ? `border-orange-500 bg-orange-300 ` : priority == 'P3' ? `border-blue-500 bg-blue-300` : `border-gray-500`} `}>
              <span className="text-sm font-bold text-green-600 hidden">&#x2713;</span>
            </button>
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col'>
                <span className='max-w-[175px] sm:max-w-none break-words'>{task.name}</span>
                <span className='max-w-[175px] break-words text-[14px] text-gray-600 '>{task.description}</span>
              </div>
              <div className='flex mt-2 items-center gap-3 gap-y-1 flex-wrap md:max-w-[300px] lg:max-w-none max-w-[150px]'>
                {date &&
                  <span className='text-[12px] flex items-center py-0.5 '>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                      <path d="M16 3v4" />
                      <path d="M8 3v4" />
                      <path d="M4 11h16" />
                      <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    </svg>
                    {formattedDate}
                  </span>}
                <span className='flex gap-2 flex-wrap max-w-[200px] md:max-w-[300px]  lg:max-w-none gap-y-0.5'>
                  {labels?.map((l, index) => (
                    <Link key={l} href={`/app/label/${l}`} className='text-[13px] flex items-center text-gray-500 hover:underline'>
                      <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" className={'fill-gray-500'}>
                        <path d="M10.9042 2.1001L20.8037 3.51431L22.2179 13.4138L13.0255 22.6062C12.6350 22.9967 12.0019 22.9967 11.6113 22.6062L1.71184 12.7067C1.32131 12.3162 1.32131 11.683 1.71184 11.2925L10.9042 2.1001ZM11.6113 4.22142L3.83316 11.9996L12.3184 20.4849L20.0966 12.7067L19.0360 5.28208L11.6113 4.22142ZM13.7327 10.5854C12.9516 9.80433 12.9516 8.5380 13.7327 7.75695C14.5137 6.9759 15.7800 6.9759 16.5611 7.75695C17.3421 8.5380 17.3421 9.80433 16.5611 10.5854C15.7800 11.3664 14.5137 11.3664 13.7327 10.5854Z"></path>
                      </svg>
                      {l}
                    </Link>
                  ))}
                </span>

              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 justify-between">
            <div className="flex gap-2 -mt-1  justify-end ">
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
              <button className="rounded hover:bg-slate-200 p-1" onClick={() => setModalOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
            {
              taskProject == 'Inbox' ?
                (
                  <Link href={`/app/inbox`}>
                    <button type='button' className=' py-1 px-1 flex max-w-fit items-center self-end rounded hover:bg-blue-50' >
                      <div className='flex  items-center gap-2'>
                        <span className='text-black text-sm '>Inbox</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 24 24"><path d="M4.02381 3.78307C4.12549 3.32553 4.5313 3 5 3H19C19.4687 3 19.8745 3.32553 19.9762 3.78307L21.9762 12.7831C21.992 12.8543 22 12.927 22 13V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V13C2 12.927 2.00799 12.8543 2.02381 12.7831L4.02381 3.78307ZM5.80217 5L4.24662 12H9C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12H19.7534L18.1978 5H5.80217ZM16.584 14C15.8124 15.7659 14.0503 17 12 17C9.94968 17 8.1876 15.7659 7.41604 14H4V19H20V14H16.584Z" fill="#dc4c3e"></path></svg>
                      </div>
                    </button>
                  </Link>) :
                (
                  <Link href={`/app/project/${taskProject}`}>
                    <button type='button' className=' py-1 px-1 flex max-w-fit  rounded  self-end hover:bg-blue-50' >
                      <div className='flex  items-center gap-2'>
                        <span className='text-black text-sm'>{taskProject}</span>
                        <span className='min-h-[12px] min-w-[12px] bg-cyan-800 rounded-full'></span>
                      </div>
                    </button>
                  </Link>
                )
            }

          </div>
        </li>
        <DeleteDialog taskName={task.name as string} openModal={modalOpen} setOpenModal={setModalOpen} deleteTask={deleteTask} />
      </>
    ) :
    (
      (
        // onClick={() => {setEditing(!editing)}}
        <form className='border-[1px] rounded-lg flex flex-col  border-gray-400' onSubmit={editTask}>
          <div className='gap-2 flex flex-col px-3 py-2'>
            <div className='flex  justify-between flex-wrap  gap-y-2 pb-1  '>
              <input type="text" name='task-name' placeholder='Task Name' className='grow placeholder:font-medium font-medium'
                value={`${name}`} onChange={(e) => { setName(e.target.value) }} />
              <p className=' flex sm:max-w-[300px] self-center'>{currentLabels}</p>
            </div>
            <input type="text" value={description as string} onChange={(e) => { setDescription(e.target.value) }} name='task-description' placeholder='Description' className='placeholder:font-normal ml-0.5 text-[14px] placeholder:text-sm ' />
          </div>
          <div className='flex gap-2.5 px-3 pt-1.5 pb-4 flex-wrap '>
            <DueDate dueDate={updatedDueDate} setDueDate={setUpdatedDueDate} />
            <Priority setPriority={setUpdatedPriority} priority={updatedPriority} />
            <Label labels={updatedLabels} setLabels={setUpdatedLabels} />
          </div>
          <div className='border-t-[1px] px-3 py-2 flex justify-between'>
            <Project setTaskProject={setUpdatedTaskProject} taskProject={updatedTaskProject} />
            <div className='flex gap-2'>
              <button type='button' className='text-sm  px-3 rounded font-semibold bg-zinc-100 hover:bg-zinc-200' onClick={() => {
                setIsEditing(!isEditing);
                setUpdatedPriority(priority);
                setUpdatedDueDate(dueDate);
                setUpdatedLabels(labels);
                setUpdatedTaskProject(taskProject);
                setName(task.name)
                setDescription(task.description)
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

