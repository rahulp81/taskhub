"use client"
import React, { useContext, useState } from 'react';
import { useProjectContext } from '../context/ProjectContextWrapper';
import { getProjectInstaces } from "../../lib/getInstaces";
import CreateProjectDialog from '../Modals/CreatePorjectModal';
import { useFavouriteContext } from '../context/FavouriteContextWrapper';
import { SetTaskContext, TaskContext } from '../context/taskContext';
import DeleteProjectDialog from '../Modals/DeleteProjectModal';

interface Favourite {
    type: 'project' | 'label' | 'filter';
    name: string
}

function Board() {
    const [isActive, setIsActive] = useState(false);
    const { projects, setProjects } = useProjectContext();
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const { favourite, setFavourite } = useFavouriteContext();
    const tasks = useContext(TaskContext);
    const setTasks = useContext(SetTaskContext)

    function isProjectInFavorites(project: string, favorites: Favourite[] | null) {
        return favorites?.some((favorite) => favorite.type === 'project' && favorite.name === project);
    }

    const togglesetIsActive = () => {
        setIsActive(!isActive);
    };


    function handleFav(isFavorite: boolean, project: string) {
        if (isFavorite == true) {
            setFavourite((prevFav) => {
                if (!prevFav) {
                    return [];
                }
                const updatedFav = prevFav.filter((fav) => !(fav.type == 'project' && fav.name == project));
                return updatedFav
            })
        } else {
            setFavourite((prevFav) => {
                const existingFav = prevFav || [];
                const newFav: Favourite = {
                    type: 'project',
                    name: project
                }
                const updatedFav = [...existingFav, newFav]
                return updatedFav
            })
        }
    }

    function handleDeleteProject(projectName: string) {
        // Remove the project from the 'projects' state
        setProjects((prevProjects) => {
            if (prevProjects) {
                const updatedProjects = prevProjects.filter(
                    (project) => project !== projectName
                );
                return updatedProjects;
            }
            return prevProjects;
        });

        // Remove the project from the 'favorites' state
        setFavourite((prevFav) => {
            if (prevFav) {
                const updatedFav = prevFav.filter(
                    (fav) => fav.type !== 'project' || fav.name !== projectName
                );
                return updatedFav;
            }
            return prevFav;
        });

        // Remove tasks associated with the deleted project
        setTasks((prevTasks) => {
            if (prevTasks) {
                const updatedTasks = prevTasks.filter(
                    (task) => task.project !== projectName
                );
                return updatedTasks;
            }
            return prevTasks;
        });
    }




    function createProject({ name, checked }: { name: string, checked: boolean }) {
        if (checked) {
            setFavourite((prevFav) => {
                const currentFav = prevFav || [];
                const newFav: Favourite = {
                    type: 'project',
                    name: name,
                }
                console.log(currentFav);
                const updatedFav = [...currentFav, newFav]
                return updatedFav
            })
        }
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
                        <img src='/icons/add-project.svg' width={24} height={24} alt='Add Task' onClick={() => setOpenModal(true)} />
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
                    {
                        projects?.map((p) => {
                            const isFavorite = isProjectInFavorites(p, favourite);
                            const noOfProjectInstances = tasks.filter((t) => t.project === p).length;

                            return (
                                <li key={p} className='group p-1 relative pr-2 pl-3 flex justify-between rounded hover:bg-blue-50 hover:cursor-pointer'>
                                    <div className='flex items-center break-normal max-w-[130px]'>
                                        <span className='min-h-[12px] min-w-[12px] bg-cyan-800 rounded-full'></span>
                                        <span className='text-black text-sm ml-2  break-all'>{p}</span>
                                    </div>
                                    <span className='text-xs peer text-gray-500'>
                                        {noOfProjectInstances > 0 && (
                                            <span className='absolute right-0 pr-3 group-hover:hidden'>
                                                {noOfProjectInstances}
                                            </span>
                                        )}
                                        <span className='group-hover:opacity-100 opacity-0 transition-opacity duration-250'>
                                            <div className="flex gap-0.5">
                                                <button className="rounded hover:bg-slate-200  p-1"
                                                    onClick={() => {
                                                        handleFav(isFavorite as boolean, p)
                                                    }}>
                                                    <div className="">
                                                        {isFavorite ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M3 3l18 18" />
                                                                <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </button>
                                                <button className="rounded hover:bg-slate-200 p-1 " onClick={() => setOpenDeleteModal(true)} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="" />
                                                        <path d="M4 7l16 0" />
                                                        <path d="M10 11l0 6" />
                                                        <path d="M14 11l0 6" />
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                    </svg>
                                                </button>
                                                <DeleteProjectDialog openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} deleteTask={handleDeleteProject} p={p} />
                                            </div>
                                        </span>
                                    </span>

                                </li>
                            );
                        })
                    }

                </ul>
            )
            }
            <CreateProjectDialog openModal={openModal} setOpenModal={setOpenModal} createProject={createProject} projects={projects as string[]} />


        </section >
    );
}

export default Board;
