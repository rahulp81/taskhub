"use client";

import React, { useRef, useState } from 'react'
import { useProjectContext } from '../context/ProjectContextWrapper';
import UseClickOutside from '@/app/components/hooks/UseClickOutside';

function Project({ taskProject, setTaskProject }: { taskProject: string | null, setTaskProject: React.Dispatch<React.SetStateAction<string | null>> }) {
    const [active, setIsActive] = useState(false);
    const [projectSearch, setProjectSearch] = useState('');
    const { projects, setProjects } = useProjectContext() //Projects made by the user apart from inbox- which is deafault aka for uncategorized tasks
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    UseClickOutside({ buttonRef, dropdownRef, setIsActive })


    const filteredProjects = projectSearch ? projects?.filter((project) => project.toLowerCase().includes(projectSearch.toLowerCase()))
        : projects;
    console.log(taskProject);
    // <span className='ml-auto'>&#10004;</span>

    function handleCreateProject() {
        fetch(`/api/app/project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                name : projectSearch,
                isFavorite : false
            })
        })

        setProjects((prevProjects) => {
            const existingProjects = prevProjects || [];
            const updatedProjects = [...existingProjects, projectSearch];
            return updatedProjects;
        });

        setTaskProject(projectSearch)
        // setIsActive(true);
        setProjectSearch('')
    }


    return (
        <div className='relative'>
            {
                taskProject == 'Inbox' ?
                    (<button type='button' className='px-2 py-2  rounded hover:bg-blue-50' onClick={() => setIsActive(!active)} ref={buttonRef}>
                        <div className='flex gap-1 items-center '>
                            <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 24 24"><path d="M4.02381 3.78307C4.12549 3.32553 4.5313 3 5 3H19C19.4687 3 19.8745 3.32553 19.9762 3.78307L21.9762 12.7831C21.992 12.8543 22 12.927 22 13V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V13C2 12.927 2.00799 12.8543 2.02381 12.7831L4.02381 3.78307ZM5.80217 5L4.24662 12H9C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12H19.7534L18.1978 5H5.80217ZM16.584 14C15.8124 15.7659 14.0503 17 12 17C9.94968 17 8.1876 15.7659 7.41604 14H4V19H20V14H16.584Z" fill="#dc4c3e"></path></svg>
                            <span className='text-black text-sm w-full '>Inbox  </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" className='ml-1' ><path d="m11.998 17 7-8h-14z"></path></svg>
                        </div>
                    </button>) :
                    (
                        <button type='button' className='px-2 py-2  rounded hover:bg-blue-50' onClick={() => setIsActive(!active)} ref={buttonRef}>
                            <div className='flex gap-2 items-center '>
                                <span className='min-h-[12px] min-w-[12px] bg-cyan-800 rounded-full'></span>
                                <span className='text-black text-sm w-full '>{taskProject}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" className='ml-1' ><path d="m11.998 17 7-8h-14z"></path></svg>
                            </div>
                        </button>
                    )
            }
            {active &&
                <div className='bg-white absolute -left-[10%]  rounded-md shadow border-[1px] min-w-[180px] max-h-32 z-50 ' ref={dropdownRef}>
                    <input type="text" className='w-full px-2 py-1 border-b-[1px]' value={projectSearch} onChange={(e) => setProjectSearch(e.target.value)}
                        placeholder='Enter Project Name' />
                    <ul className='flex flex-col overflow-y-scroll max-h-[100px] '>
                        <li key={'inbox'} className='hover:bg-blue-100 hover:cursor-pointer px-2 py-1' onClick={() => { setTaskProject('Inbox') }}>
                            <div className='flex  items-center justify-between  '>
                                <div className='flex gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 24 24"><path d="M4.02381 3.78307C4.12549 3.32553 4.5313 3 5 3H19C19.4687 3 19.8745 3.32553 19.9762 3.78307L21.9762 12.7831C21.992 12.8543 22 12.927 22 13V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V13C2 12.927 2.00799 12.8543 2.02381 12.7831L4.02381 3.78307ZM5.80217 5L4.24662 12H9C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12H19.7534L18.1978 5H5.80217ZM16.584 14C15.8124 15.7659 14.0503 17 12 17C9.94968 17 8.1876 15.7659 7.41604 14H4V19H20V14H16.584Z" fill="#dc4c3e"></path></svg>
                                    <span className='text-black text-sm  '>Inbox  </span>
                                </div>
                                {taskProject == 'Inbox' &&
                                    <div>
                                        &#10004;
                                    </div>
                                }
                            </div>
                        </li>
                        {
                            filteredProjects?.map((p) => (
                                <li key={p} className='hover:bg-blue-100 hover:cursor-pointer px-3 py-1' onClick={() => setTaskProject(p)}>
                                    <div className='flex  items-center justify-between'>
                                        <div className='flex gap-3 items-center'>
                                            <span className='h-3 w-3 bg-cyan-700 rounded-full'></span>
                                            <span>{p}</span>
                                        </div>
                                        {taskProject == p &&
                                            <div>
                                                &#10004;
                                            </div>
                                        }
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    {(projectSearch && filteredProjects?.length == 0) && (
                        <button
                            // ref={additionalRef}
                            type='button'
                            className="mt-0.5 font-bold text-sm py-1  px-2 w-full hover:bg-blue-50"
                            onClick={handleCreateProject}
                        >
                            + Create <span className='font-bold'>{projectSearch}</span>
                        </button>
                    )}
                </div>
            }

        </div>
    )
}

export default Project
