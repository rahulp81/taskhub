"use client"
import React, { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { TaskContext } from '../context/taskContext';
import SearchIcon from '../../components/Svg/SearchIcon'
import Task from "@/app/components/addTask/Task"

interface Favourite {
    type: 'project' | 'label' | 'filter';
    name: string
}

export default function Search({ openModal, setOpenModal }
    : { openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [search, setSearch] = useState('')
    const tasks = useContext(TaskContext);

    const filteredTasks = search ? tasks?.filter((task) => {
        return (task.name?.toLowerCase().includes(search.toLowerCase()) ||
            task.labels?.some((l) => l.toLowerCase().includes(search.toLowerCase())) ||
            task.project?.toLowerCase().includes(search.toLowerCase()) ||
            task.description?.toLowerCase().includes(search.toLowerCase()))
    })
        : [];

    const customDialogStyle = {
        top: '-150px',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 1)',
    };

    return (
        <div>
            <Dialog
                open={openModal}
                onClose={() => {
                    setSearch('');
                    setOpenModal(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: customDialogStyle,
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    }
                }}
                slotProps={{ backdrop: { sx: { background: 'rgba(255, 255, 255, 0)' } } }}
            >
                <div className='flex flex-col gap-2'>
                    <form className='sm:w-[450px] gap-5 flex  flex-col' >
                        <label htmlFor="search" className="flex items-center text-sm p-2.5 relative  px-4 border-b-[1px]">
                            <SearchIcon />
                            <div className="flex shrink">
                                <input id="search" type="text" placeholder="Search" className="rounded bg-transparent left-0 ml-4
                            relative focus:outline-none placeholder:text-[16px]" value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </label>
                    </form>
                    <div className='flex h-[200px] overflow-y-scroll p-2.5 px-4 w-full' >
                        {!search ? <span className='break-words max-w-[400px] '>Type to Search Task with its Name , Description or Labels</span>
                            : (search && filteredTasks.length > 0) ?
                                <ul className='w-full'>
                                    {filteredTasks.map((task) => (
                                        <Task key={task.id} task={task} />
                                    ))}
                                </ul>
                                : 'No Tasks Found'
                        }
                    </div>
                </div>

            </Dialog>
        </div >
    );
}
