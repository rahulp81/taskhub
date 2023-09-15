import { useState } from "react";

interface DueDateProps {
    setPriority: React.Dispatch<React.SetStateAction<string>>;
    priority: string,
}

function DueDate() {
    return (
        <button className='hover:bg-blue-50 rounded-md flex justify-center  gap-3 items-end group py-1.5 px-2 border-[1px] border-gray-300'>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                    <path d="M16 3v4" />
                    <path d="M8 3v4" />
                    <path d="M4 11h16" />
                    <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                </svg>
            </span>
            <span className='text-sm text-gray-600 font-normal group-hover:text-black'>   Due Date</span>
        </button>

    )
}

export default DueDate