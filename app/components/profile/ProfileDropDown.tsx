"use client"
import React, { useContext, useState } from 'react';
import Popover from '@mui/material/Popover';
import { useCompletedTaskContext } from '../context/CompletedTaskContextWrapper';
import { TaskContext } from '../context/taskContext';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import LogOutModal from '../Modals/LogOutModal';
import { signOut } from "next-auth/react"


interface completedTaskType {
    taskName: string,
    completedAt: Date
    status: 'ontime' | 'late' | 'noDue'
}


const ProfileDropDown = ({ open, anchorEl, onClose }: { open: boolean, anchorEl: HTMLButtonElement | null, onClose: () => void }) => {
    const { data: session } = useSession();
    const [openModal,setOpenModal] = useState(false);

    return (
        <>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: -150,
                }}
            >
                {/* Content of the Popover */}
                <div className='flex flex-col gap-2.5 py-3 '>
                    <div className='flex gap-3  px-3'>
                        <div className='flex items-center'>
                            <img className='rounded-full' width={25} height={25} src={`${session?.user?.image}`} alt='Profile' />
                        </div>
                        <div className='flex flex-col text-sm'>
                            <p className='font-bold'>{session?.user?.name}</p>
                            <p>{session?.user?.email}</p>
                        </div>
                    </div>
                    <div className='flex gap-3 py-1 px-3 border-t-[1px] border-b-[1px]'>
                        <button className='text-sm text-red-500 w-full  flex gap-5 py-2 hover:bg-slate-100 rounded' onClick={()=> setOpenModal(!openModal)} >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path></svg>
                            </span>
                            Log Out
                        </button>
                    </div>
                    <div className='px-3 text-sm font-medium'>
                        v1.0
                    </div>
                </div>
            </Popover>
            <LogOutModal logOut={signOut} setOpenModal={setOpenModal} openModal={openModal} />
        </>
    );
};

export default ProfileDropDown;
