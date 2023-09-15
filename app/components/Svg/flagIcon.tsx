import React, { useState } from 'react'

interface PriorityProps {
    setPriority: React.Dispatch<React.SetStateAction<string>>;
    priority: string,
    color: string,
}


function flagIcon({ setPriority, priority, color }: PriorityProps) {
    const [active, setActive] = useState(false)
    function handleXclick(e: React.MouseEvent<HTMLButtonElement>) {
        console.log('clicked');

        e.stopPropagation();
        setPriority('P4');
    }
    return (
        <div className='relative'>
            <button type="button" className='hover:bg-blue-50 rounded-md flex justify-center items-center gap-1.5  group py-1.5 px-2 border-[1px] border-gray-300' onClick={() => setActive(!active)}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${color}`} width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" stroke-width="0" fill="" />
                    </svg>
                </span>
                <span className='text-xs text-gray-600 font-normal group-hover:text-black'>{priority}</span>
                <span className=" hover:text-black font-semibold text-gray-400 text-xs ml-0.5" onClick={handleXclick} >
                    <span className="">&#10005;</span>
                </span>
            </button>
            {/* Drop down Menu */}
            {active &&
                <div className={` absolute top-[99%] -left-3 border-[1px] w-32 rounded-md shadow-md bg-white z-50 ${active ? 'block' : 'block'}`}>
                    <ul className="w-full border-[1px] rounded-md">
                        <li className="w-full " onClick={() => {
                            setPriority('P1');
                            setActive(!active);
                        }}>
                            <button type="button" className='hover:bg-blue-50 rounded-md flex  items-center gap-1.5 w-full group py-1.5 px-2  border-gray-300'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-red-700`} width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" stroke-width="0" fill="" />
                                    </svg>
                                </span>
                                <span className='text-xs text-gray-600 font-normal group-hover:text-black mr-2'>Priority 1</span>
                                <span className=" text-blue-700 font-semibold  text-xs"  >
                                    {priority == 'P1' && '✔'}
                                </span>
                            </button>
                        </li>
                        <li onClick={() => {
                            setPriority('P2');
                            setActive(!active);
                        }}>
                            <button type="button" className='hover:bg-blue-50 rounded-md flex  items-center w-full gap-1.5  group py-1.5 px-2  border-gray-300'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-orange-600`} width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" stroke-width="0" fill="" />
                                    </svg>
                                </span>
                                <span className='text-xs text-gray-600 font-normal group-hover:text-black mr-2'>Priority 2</span>
                                <span className="  font-semibold text-blue-700 text-xs "  >
                                    {priority == 'P2' && '✔'}
                                </span>
                            </button>
                        </li>
                        <li onClick={() => {
                            setPriority('P3');
                            setActive(!active);
                        }}>
                            <button type="button" className='hover:bg-blue-50 rounded-md flex  items-center w-full gap-1.5  group py-1.5 px-2  border-gray-300'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-blue-700`} width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" stroke-width="0" fill="" />
                                    </svg>
                                </span>
                                <span className='text-xs text-gray-600 font-normal group-hover:text-black mr-2'>Priority 3</span>
                                <span className=" hover:text-black font-semibold text-blue-700 text-xs "  >
                                    {priority == 'P3' && '✔'}
                                </span>
                            </button>
                        </li>
                        <li onClick={() => {
                            setPriority('P4');
                            setActive(!active);
                        }}>
                            <button type="button" className='hover:bg-blue-50 rounded-md flex  w-full items-center gap-1.5  group py-1.5 px-2  border-gray-300'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-blue-700`} width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" stroke-width="0" fill="" />
                                    </svg>
                                </span>
                                <span className='text-xs text-gray-600 font-normal group-hover:text-black mr-2'>Priority 4</span>
                                <span className=" font-semibold text-blue-700 text-xs "  >
                                    {priority == 'P4' && '✔'}
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>}
        </div>
    )
}

export default flagIcon