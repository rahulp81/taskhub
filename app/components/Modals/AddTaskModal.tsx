"use client"
import React, { FormEvent, useContext, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { SetTaskContext } from '../context/taskContext';
import DueDate from '../Svg/DueDate';
import Priority from '../Svg/Priority';
import Label from '../Svg/Label';
import Project from '../projects/Project';

const label = { inputProps: { 'aria-label': 'Color switch demo' } };


export default function CreateProjectDialog({ openModal, setOpenModal }
    : {
        openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    }
) {

    const [taskPriority, setTaskPriority] = useState('P4');
    const [name, setName] = useState('');
    const formRef = useRef<HTMLFormElement>(null);
    const [dueDate, setDueDate] = useState<Date | null>(null)
    const [labels, setLabels] = useState<string[] | null>([])
    const [taskproject, setTaskProject] = useState<string | null>('Inbox')

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
        const taskDetail = { name, description, id, priority, due, labels: tags, project };
        setTask((prevTasks) => [...prevTasks, taskDetail]);
        const form = e.currentTarget as HTMLFormElement;
        setTaskPriority('P4');
        setDueDate(null);
        setLabels(labels);
        setTaskProject('Inbox')
        form.reset();
        setName('');
        setOpenModal(false)
    }


    function cancelTask() {
        if (formRef.current) {
            setTaskPriority('P4');
            setDueDate(null);
            setLabels([]);
            setTaskProject('Inbox');
            setName('');
            formRef.current.reset();
            setOpenModal(false)
        }
    }



    const customDialogStyle = {
        top: '-150px',
        borderRadius: '5px',
        background: 'rgba(255, 255, 255, 1)',
    };

    return (
        <div>
            <Dialog
                open={openModal}
                onClose={() => {
                    setName('')
                    setOpenModal(false)
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: customDialogStyle,
                    height: 'auto',
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent Enter from submitting
                    }
                }}
                slotProps={{ backdrop: { sx: { background: 'rgba(255, 255, 255, 0)' } } }}
                className=''
            >
                <form className=' rounded-lg flex flex-col  border-gray-400' onSubmit={createTask} ref={formRef}>
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
            </Dialog>
        </div>
    );
}
