import React from 'react'

function Filter() {
    return (
        <div className='flex flex-col gap-1'>
            <div className=' flex border-b-[1px]  items-center gap-1.5 w-full  py-1 px-2 '>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-red-700`} width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" strokeWidth="0" fill="" />
                    </svg>
                </span>
                <span className='text-sm '>Priority 1</span>
            </div>
            <div className=' flex border-b-[1px] items-center w-full gap-1.5 py-1 px-2 '>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-orange-600`} width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" strokeWidth="0" fill="" />
                    </svg>
                </span>
                <span className='text-sm'>Priority 2</span>
            </div>
            <div className='flex  items-center w-full gap-1.5 border-b-[1px] group py-1 px-2 '>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-blue-700`} width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" strokeWidth="0" fill="" />
                    </svg>
                </span>
                <span className='text-sm'>Priority 3</span>
            </div>
            <div className=' flex border-b-[1px] w-full items-center gap-2 py-1 px-2  '>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
                        <path d="M5 21v-7" />
                    </svg>
                </span>
                <span className='text-sm'>Priority 4</span>
            </div>
        </div>
    )
}

export default Filter
