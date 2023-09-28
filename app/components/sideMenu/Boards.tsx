"use client"
import React, { useContext, useState } from 'react';
import { useProjectContext } from '../context/ProjectContextWrapper';
import CreateProjectDialog from '../Modals/CreatePorjectModal';
import { useFavouriteContext } from '../context/FavouriteContextWrapper';
import { SetTaskContext, TaskContext } from '../context/taskContext';
import DeleteProjectDialog from '../Modals/DeleteProjectModal';
import Link from 'next/link';
import Project from './project';

interface Favourite {
    type: 'project' | 'label' | 'filter';
    name: string
}

function Board() {
    const [isActive, setIsActive] = useState(true);
    const { projects, setProjects } = useProjectContext();
    const [openModal, setOpenModal] = useState(false);
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
            fetch(`/api/app/favorite`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: project
                })
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
            fetch(`/api/app/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'project',
                    name: project,
                })
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


        fetch(`/api/app/project`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName: projectName
            })
        })

        //DB sync handled in api endpoint itself
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

        fetch(`/api/app/project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                isFavorite: checked
            })
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
                                <Project handleDeleteProject={handleDeleteProject} handleFav={handleFav} isFavorite={isFavorite as boolean}
                                    noOfProjectInstances={noOfProjectInstances} p={p} key={p}
                                />
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
