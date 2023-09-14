import React from 'react'

function Priority() {
    return (
        <button className='hover:bg-blue-50 rounded-md flex justify-center  gap-3 items-end group py-1.5 px-2 border-[1px] border-gray-300'>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
                    <path d="M5 21v-7" />
                </svg>
            </span>
            <span className='text-sm text-gray-600 font-normal group-hover:text-black'>Priority</span>
        </button>
    )
}

export default Priority