"use client"
import { FormEvent, useContext, useReducer, useRef, useState } from 'react';
import DueDate from '../Svg/DueDate';
import Priority from '../Svg/Priority';
import Label from '../Svg/Label';
import { SetTaskContext, TaskContext } from '../context/taskContext';
import { useTagsContext } from '../context/TagsContext';
import Project from '../projects/Project';
import { toast } from 'react-toastify';
import Link from 'next/link';

const todaysDate = new Date();
todaysDate.setHours(0, 0, 0, 0);

type addTask = {
  today? : boolean | null,
  project? : string,
  tags? : string[],
  priority? : string,
}

function addTask({today,project,tags,priority}: addTask) {
  const [editing, setEditing] = useState(false)
  const [taskPriority, setTaskPriority] = useState('P4');
  const [name, setName] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [dueDate, setDueDate] = useState<Date | null>(today ? todaysDate : null)
  const [labels, setLabels] = useState<string[] | null>([])
  const [taskproject, setTaskProject] = useState<string | null>(project ? project : 'Inbox')



  const setTask = useContext(SetTaskContext);
  const currentLabels =
    <span className='gap-1 flex'>
      {labels?.map((label, index) => (
        <span className='bg-blue-100 rounded px-1' key={index}>
          #{label}
        </span>
      ))}
    </span>

  function createTask(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('task-name') as string | null;
    const description = formData.get('task-description') as string | null;
    const id = Date.now() as number;
    const priority = taskPriority;
    const due = dueDate;
    const project = taskproject;
    const tags = labels || [];
    const taskDetail = { name, description, id, priority, due, labels : tags, project };
    setTask((prevTasks) => [...prevTasks, taskDetail]);
    toast.success(
      <p>
       Task added to <Link className='underline font-bold' href={`/app/project/${taskproject}`} >{taskproject}</Link>
      </p>
    );
    const form = e.currentTarget as HTMLFormElement;
    setTaskPriority('P4');
    setDueDate(today ? todaysDate : null);
    setLabels(labels);
    setTaskProject(project ? project : 'Inbox')
    form.reset();
    setName('');
    setEditing(!editing);
  }

  function cancelTask() {
    if (formRef.current) {
      setEditing(!editing);
      setTaskPriority('P4');
      setDueDate(today ? todaysDate : null);
      setLabels([]);
      setTaskProject(project ? project : 'Inbox')
      formRef.current.reset();
      setName('');
    }
  }


  return (
    (!editing) ?
      (<button className="flex gap-2 text-sm items-center text-gray-500 group pt-3 pb-20 w-full" onClick={() => { setEditing(!editing) }}>
        <span className='rounded-full group-hover:bg-[#3b82f6]'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} height={22} className='fill-[#3b82f6] group-hover:fill-[white]'>
            <path
              d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
            />
          </svg>
        </span>
        <span className='group-hover:text-[#3b82f6]'>
          Add Task
        </span>
      </button>)
      :
      (
        // onClick={() => {setEditing(!editing)}}
        <form className='border-[1px] rounded-lg flex flex-col  border-gray-400' onSubmit={createTask} ref={formRef}>
          <div className='gap-2 flex flex-col px-3 py-2'>
            <div className='flex  justify-between pr-5 '>
              <input type="text" name='task-name' placeholder='Task Name' className='grow placeholder:font-medium font-medium'
                value={`${name}`} onChange={(e) => { setName(e.target.value) }} />
              <p>{currentLabels}</p>
            </div>

            <input type="text" name='task-description' placeholder='Description' className='placeholder:font-normal ml-0.5 text-[14px] placeholder:text-sm ' />
          </div>
          <div className='flex gap-3 px-3 mt-1.5 mb-4 relative flex-wrap'>
            <DueDate dueDate={dueDate} setDueDate={setDueDate} />
            <Priority setPriority={setTaskPriority} priority={taskPriority} />
            <Label setLabels={setLabels} labels={labels} />
          </div>
          <div className='border-t-[1px] px-3 py-2 flex justify-between'>
            <Project setTaskProject={setTaskProject} taskProject={taskproject} />
            <div className='flex gap-2'>
              <button type='button' className='text-sm py-1.5  px-3 rounded font-semibold bg-zinc-100 hover:bg-zinc-200' onClick={cancelTask}>
                Cancel
              </button>
              <button type='submit' disabled={(name) ? false : true} className={`${name ? 'bg-blue-500 hover:bg-blue-600 ' : 'bg-blue-200 cursor-not-allowed '}  text-sm px-3 py-1.5 rounded font-semibold  text-white `}>
                Add task
              </button>
            </div>
          </div>
        </form>
      )
  );
};

export default addTask;


