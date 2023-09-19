import React, { useState } from 'react';
import { useProjectContext } from '../context/ProjectContextWrapper';
import { getProjectInstaces } from "../../lib/getInstaces";
import CreateProjectDialog from '../Modals/CreatePorjectModal';

function Board() {
    const [isActive, setIsActive] = useState(false);
    const { projects, setProjects } = useProjectContext();
    const [openModal, setOpenModal] = useState(false);

    const togglesetIsActive = () => {
        setIsActive(!isActive);
    };

    function createProject({name,checked} : {name:string,checked:boolean}){
        setProjects((prevProjects) => {
            const existingProject = prevProjects || [];
            const updatedProjects = [...existingProject, name];
            return updatedProjects;
        })
    }

    const arrowClass = isActive ? 'rotate-90' : '';

    return (
        <section className='flex flex-col'>
            <h1 className='flex justify-between items-center font-semibold hover:bg-[#eeeeee] p-1 rounded '>
                Projects
                <div className='flex gap-1'>
                    <button className='hover:bg-slate-50 rounded p-1'  >
                        <img src='/icons/add-project.svg' width={24} height={24} alt='Add Task' onClick={()=>setOpenModal(true)} />
                    </button>
                    <button
                        className={`hover:bg-slate-50 rounded transform transition-transform ${arrowClass}`}
                        onClick={togglesetIsActive}
                    >
                        <img src='/icons/arrow.svg' width={24} height={24} alt='Arrow' />
                    </button>
                </div>
            </h1>
            {isActive && (
                <ul className='flex flex-col gap-1'>
                    {projects?.map((p, index) => (
                        <li key={index} className='group  p-1 relative pr-2 pl-3 flex justify-between rounded hover:bg-blue-50 hover:cursor-pointer' >
                            <div className='flex items-center'>
                                <span className='min-h-[12px] min-w-[12px] bg-cyan-800 rounded-full'></span>
                                <span className='text-black text-sm ml-2'>{p}</span>
                            </div>
                            <span className='text-xs peer text-gray-500'>
                                <span className=' absolute right-0 pr-2 group-hover:hidden'>{getProjectInstaces(p) > 0 ? getProjectInstaces(p) : null}</span>
                                <span className='group-hover:opacity-100 opacity-0 transition-opacity duration-250' >options</span>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            <CreateProjectDialog openModal={openModal} setOpenModal={setOpenModal} createProject={createProject}/>
        </section>
    );
}

export default Board;
