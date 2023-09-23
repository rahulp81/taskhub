"use client"

import { useContext, useState } from 'react';
import sideMenuContext from '../../components/context/sideMenuContext'
import { useTagsContext } from '@/app/components/context/TagsContext';
import Filter from '@/app/components/filters/Filter';
import CreateLabelDialog from '@/app/components/Modals/CreateLabelModal';
import Link from 'next/link';
import DeleteProjectDialog from '@/app/components/Modals/DeleteProjectModal';
import { useFavouriteContext } from '@/app/components/context/FavouriteContextWrapper';
import { SetTaskContext } from '@/app/components/context/taskContext';


interface Favourite {
    type: 'project' | 'label' | 'filter';
    name: string
}

function FiltersLabels() {
    const sideMenuAtive = useContext(sideMenuContext);
    const { tags, setTags } = useTagsContext();
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const { favourite, setFavourite } = useFavouriteContext();
    const setTask = useContext(SetTaskContext)
    console.log(tags, 'tags');

    function isProjectInFavorites(label: string, favorites: Favourite[] | null) {
        return favorites?.some((favorite) => favorite.type === 'label' && favorite.name === label);
    }



    function handleFav(isFavorite: boolean, label: string) {
        if (isFavorite == true) {
            setFavourite((prevFav) => {
                if (!prevFav) {
                    return [];
                }
                const updatedFav = prevFav.filter((fav) => !(fav.type == 'label' && fav.name == label));
                return updatedFav
            })
        } else {
            setFavourite((prevFav) => {
                const existingFav = prevFav || [];
                const newFav: Favourite = {
                    type: 'label',
                    name: label
                }
                const updatedFav = [...existingFav, newFav]
                return updatedFav
            })
        }
    }


    function handleDeleteLabel(label: string) {
        setTags((prevLabels) => {
            if (prevLabels) {
                const updatedLabels = prevLabels.filter(
                    (tag) => tag !== label
                );
                return updatedLabels;
            }
            return prevLabels;
        });

        setFavourite((prevFav) => {
            if (prevFav) {
                const updatedFav = prevFav.filter(
                    (fav) => fav.type !== 'label' || fav.name !== label
                );
                return updatedFav;
            }
            return prevFav;
        });

        setTask((prevTask) => {
            if (prevTask) {
                const updatedTask = prevTask.map((taskItem) => {
                    if (taskItem.labels && taskItem.labels.includes(label)) {
                        const updatedItem = {
                            ...taskItem,
                            labels: taskItem.labels.filter((taskLabel) => taskLabel !== label),
                        };
                        return updatedItem;
                    }
                    return taskItem;
                });

                return updatedTask;
            }
            return prevTask;
        });


    }




    return (
        <div className={`grow  flex justify-center  transition-all duration-[500ms] ease-in-out ${sideMenuAtive ? '' : 'min-[800px]:ml-[-275px]'}`}>
            <main className="app-container | flex flex-col gap-4 mt-8">
                <h1 className="font-bold mb-4 text-[20px]">Filters & Labels</h1>
                <div className="flex flex-col w-full gap-4 ">
                    <div className="flex flex-col gap-3">
                        <h2 className='text-base py-1 font-bold border-b-[1px]'>Filters</h2>
                        <Filter />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className='text-base flex justify-between py-1 font-bold border-b-[1px]'>
                            Labels
                            <div className='hover:bg-blue-50 py-0.5 px-1 rounded' onClick={() => setOpenModal(true)}>
                                <svg className='' width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="black"></path>
                                </svg>
                            </div>

                        </h2>
                        <ul className='flex flex-col gap-1 pl-2'>
                            {tags?.map((label) => {
                                const isFavorite = isProjectInFavorites(label, favourite);
                                return (
                                    <li key={label} className=' border-b-[1px] text-sm  flex items-center py-1'>
                                        <Link className='grow' href={`/app/label/${label}`}>
                                            <div className="flex gap-2.5 grow flex-wrap hover:underline">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="fill-black"
                                                    width={20}
                                                    height={20}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M10.9042 2.1001L20.8037 3.51431L22.2179 13.4138L13.0255 22.6062C12.635 22.9967 12.0019 22.9967 11.6113 22.6062L1.71184 12.7067C1.32131 12.3162 1.32131 11.683 1.71184 11.2925L10.9042 2.1001ZM11.6113 4.22142L3.83316 11.9996L12.3184 20.4849L20.0966 12.7067L19.036 5.28208L11.6113 4.22142ZM13.7327 10.5854C12.9516 9.80433 12.9516 8.538 13.7327 7.75695C14.5137 6.9759 15.78 6.9759 16.5611 7.75695C17.3421 8.538 17.3421 9.80433 16.5611 10.5854C15.78 11.3664 14.5137 11.3664 13.7327 10.5854Z"></path>
                                                </svg>
                                                <span>{label}</span>
                                            </div>
                                        </Link>
                                        <div className="flex gap-0.5">
                                            <button className="rounded hover:bg-slate-200  p-1"
                                                onClick={(e) => {
                                                    handleFav(isFavorite as boolean, label)
                                                }}>
                                                <div className="">
                                                    {isFavorite ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M3 3l18 18" />
                                                            <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
                                            <DeleteProjectDialog p={label} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} deleteTask={handleDeleteLabel} />
                                        </div>
                                    </li>

                                );
                            })}
                        </ul>


                    </div>


                </div>
            </main >

            <CreateLabelDialog openModal={openModal} setOpenModal={setOpenModal} />

        </div >
    )
}

export default FiltersLabels


