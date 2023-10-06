"use client"
import React, { useState } from 'react'
import { useCheckOverdueTask } from '../context/TasksContext';
import Task from "@/app/components/addTask/Task"

function OverDue() {
    const [active, setActive] = useState(false)
    const {overdue} = useCheckOverdueTask()
    const togglesetIsActive = () => {
        setActive(!active);
    };

    const arrowClass = active ? 'rotate-90' : '';

    return overdue.length > 0 && (
        <section className='py-3 px-2 flex flex-col gap-2 border-[1px] border-red-600 rounded'>
            <header className='flex justify-between pr-2 pb-3 border-b-[1px]'>
                <h1 className='font-bold text-red-600 text-[16px] '>Overdue Tasks
                    <span className='text-[14px] text-gray-600 font-normal ml-2'>(Reschedule(edit), delete or complete them)</span>
                </h1>
                <button className={`hover:bg-slate-50 rounded transform transition-transform ${arrowClass}`} onClick={togglesetIsActive}>
                    <img src='/icons/arrow.svg' width={24} height={24} alt='Arrow dropdown' />
                </button>
            </header>
            {active && (
                <ul className='flex flex-col'>
                    {
                        overdue.map((task) => (
                            <Task key={task.id} task={task} overdue/>
                        ))
                    }
                </ul>
            )
            }
        </section>
    )
}

export default OverDue
