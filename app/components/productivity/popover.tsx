"use client"
import React, { useContext } from 'react';
import Popover from '@mui/material/Popover';
import { useCompletedTaskContext } from '../context/CompletedTaskContextWrapper';
import { TaskContext } from '../context/taskContext';
import Link from 'next/link';

interface completedTaskType {
    taskName: string,
    completedAt: Date
    status: 'ontime' | 'late' | 'noDue'
}


const MyPopover = ({ open, anchorEl, onClose }: { open: boolean, anchorEl: HTMLButtonElement | null, onClose: () => void }) => {
    const { completedTask } = useCompletedTaskContext()
    const lateTasks = completedTask?.filter((t) => (t.status == 'late'));
    const tasks = useContext(TaskContext);
    const todaysTask = tasks.filter((task) => task.due?.toDateString() == new Date().toDateString())

    const getLastSevenDaysData = (completedTaskData: completedTaskType[] | null): { dayName: string; tasksCompleted: number }[] => {
        const today = new Date();
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const lastSevenDaysData: { dayName: string; tasksCompleted: number }[] = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            const dayName = daysOfWeek[date.getDay()];

            // Calculate the number of completed tasks for today
            const tasksCompleted = completedTaskData?.filter(
                (task) => new Date(task.completedAt).toDateString() === date.toDateString()
            ).length || 0;

            lastSevenDaysData.push({ dayName, tasksCompleted });

            // Move to the previous day for the next iteration
            today.setDate(today.getDate() - 1);
        }

        return lastSevenDaysData;
    };

    const lastSevenDaysData = getLastSevenDaysData(completedTask);


    return (
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
            <div className='flex flex-col p-5'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-sm font-bold'>Your Productivity Dashboard</h1>
                    <div className='flex gap-8 justify-center'>
                        <p className='text-xs'>{completedTask?.length} completed tasks</p>
                    </div>
                    <div className='flex flex-col items-center gap-1.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='fill-slate-500' width="48" height="48" viewBox="0 0 24 24" ><path d="M12 22c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.86 0-7 3.141-7 7s3.14 7 7 7zm0-12c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5 2.243-5 5-5zm-1-8H7v5.518a8.957 8.957 0 0 1 4-1.459V2zm6 0h-4v4.059a8.957 8.957 0 0 1 4 1.459V2z"></path><path d="m10.019 15.811-.468 2.726L12 17.25l2.449 1.287-.468-2.726 1.982-1.932-2.738-.398L12 11l-1.225 2.481-2.738.398z"></path></svg>
                        <span className='text-xs'>Tasks Completed Today :
                            <span className='font-bold'>
                                {completedTask?.filter((t) => (new Date(t.completedAt).toDateString() == new Date().toDateString())).length}
                            </span>
                        </span>
                        <span className='text-xs'>Tasks Remaining Today :
                            <span className='font-bold'>
                                {todaysTask.length}
                            </span>
                        </span>
                        <span className='text-xs'>Late Completed Tasks : <span className='font-bold'>{lateTasks?.length}</span> </span>
                        <span className='text-red-600 text-xs'>Overdue Tasks : </span>
                    </div>
                    <div className=' text-[13px] flex flex-col gap-2 font-bold border-t-[1px] py-3'>
                        Completed Tasks in Last Week
                        <div className=' pl-2 graph font-medium text-gray-500'>
                            <ul className='flex flex-col gap-1.5'>
                                {lastSevenDaysData.map((data, index) => {
                                    const taskCount = data.tasksCompleted;
                                    const taskWidth = 5;

                                    return (
                                        <li key={data.dayName} className='flex gap-2 '>
                                            <div className='flex  border-[1px] rounded flex-wrap  max-w-[200px]'>
                                                {Array.from({ length: taskCount }).map((_, index) => (
                                                    <span
                                                        key={index}
                                                        style={{ width: `${taskWidth}px` }}
                                                        className='bg-blue-600  block grow-0'
                                                    ></span>
                                                ))}
                                            </div>
                                            <span className={`${index == 0 && 'font-bold text-black'}`}> {data.dayName} : {data.tasksCompleted}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </Popover>
    );
};

export default MyPopover;
