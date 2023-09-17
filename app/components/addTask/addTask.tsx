"use client"
import { FormEvent, useContext, useReducer, useRef, useState } from 'react';
import DueDate from '../Svg/DueDate';
import Priority from '../Svg/Priority';
import Label from '../Svg/Label';
import { SetTaskContext, TaskContext } from '../context/taskContext';
import { useTagsContext } from '../context/TagsContext';


function addTask() {
  const [editing, setEditing] = useState(false)
  const [taskPriority, setTaskPriority] = useState('P4');
  const [name,setName] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [dueDate,setDueDate] = useState<Date | null>(null)
  const [labels,setLabels] = useState<string[] | null>([])

  const setTask = useContext(SetTaskContext);


  function createTask(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('task-name') as string | null;
    const description = formData.get('task-description') as string | null;
    const id = Date.now() as number;
    const priority = taskPriority;
    const due =dueDate;
    const label = labels;
    const taskDetail = { name, description, id,priority,due,label};
    setTask((prevTasks) => [...prevTasks, taskDetail]);
    const form = e.currentTarget as HTMLFormElement;
    setTaskPriority('P4');
    setDueDate(null);
    setLabels([]);
    form.reset();
    setName('');
  }

  function cancelTask(){
    if(formRef.current){
      setEditing(!editing);
      setTaskPriority('P4');
      setDueDate(null);
      setLabels([]);
      formRef.current.reset();
      setName('');
    }
  }


  return (
    (!editing) ?
      (<button className="flex gap-2 text-sm items-center text-gray-500 group py-1 w-full" onClick={() => { setEditing(!editing) }}>
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
            <input type="text" name='task-name' placeholder='Task Name' className='placeholder:font-medium font-medium'
             value={name} onChange={(e) => {setName(e.target.value)} } />
            <input type="text" name='task-description' placeholder='Description' className='placeholder:font-normal ml-0.5 text-[14px] placeholder:text-sm ' />
          </div>
          <div className='flex gap-3 px-3 mt-1.5 mb-4 relative'>
            <DueDate dueDate={dueDate} setDueDate={setDueDate} />
            <Priority setPriority={setTaskPriority} priority={taskPriority} />
            <Label setLabels ={setLabels} labels ={labels} />
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
              <button type='button' className='text-sm  px-3 rounded font-semibold bg-zinc-100 hover:bg-zinc-200' onClick={cancelTask}>
                Cancel
              </button>
              <button type='submit' disabled={(name) ? false : true } className={`${name ? 'bg-blue-500 hover:bg-blue-600 ' : 'bg-blue-200 cursor-not-allowed ' }  text-sm px-3 rounded font-semibold  text-white `}>
                Add task
              </button>
            </div>
          </div>
        </form>
      )
  );
};

export default addTask;


