"use client"
import { useContext, useState } from 'react';
import sideMenuContext from '../../components/context/sideMenuContext'
import { useTagsContext } from '@/app/components/context/TagsContext';
import Filter from '@/app/components/filters/Filter';
import CreateLabelDialog from '@/app/components/Modals/CreateLabelModal';
import { useFavouriteContext } from '@/app/components/context/FavouriteContextWrapper';
import { SetTaskContext } from '@/app/components/context/taskContext';
import Tags from './Tags';
import { useRef } from 'react';
import { useSyncContext } from '@/app/components/context/SyncContext';

interface Favourite {
    type: 'project' | 'label' | 'filter';
    name: string
}

function FiltersLabels() {
    const sideMenuAtive = useContext(sideMenuContext);
    const { tags, setTags } = useTagsContext();
    const [openModal, setOpenModal] = useState(false);
    const { favourite, setFavourite } = useFavouriteContext();
    const setTask = useContext(SetTaskContext)
    const { setSync } = useSyncContext()

    function isProjectInFavorites(label: string, favorites: Favourite[] | null) {
        return favorites?.some((favorite) => favorite.type === 'label' && favorite.name === label);
    }

    // Define a ref to store the timeouts for each label
    const fetchTimeoutRef = useRef<{ [label: string]: NodeJS.Timeout | undefined }>({});

    // Set a new timeout for this specific label and save the reference
    async function handleFav(isFavorite: boolean, label: string) {
        // Clear any previous timeout for the current label
        if (fetchTimeoutRef.current[label]) {
            clearTimeout(fetchTimeoutRef.current[label]!);
        }

        fetchTimeoutRef.current[label] = setTimeout( () => {
            if (isFavorite === true) {

                setSync({
                    type: 'fav_remove',
                    command: {
                        name: label,
                        type: 'label',
                    }
                })

            } else {
                setSync({
                    type: 'fav_add',
                    command: {
                        name: label,
                        type: 'label',
                    }
                })
            }
        }, 500);

        // Optimistic UI state update (not delayed)
        if (isFavorite === true) {
            setFavourite((prevFav) => {
                if (!prevFav) {
                    return [];
                }
                const updatedFav = prevFav.filter((fav) => !(fav.type === 'label' && fav.name === label));
                return updatedFav;
            });
        } else {
            setFavourite((prevFav) => {
                const existingFav = prevFav || [];
                const newFav: Favourite = {
                    type: 'label',
                    name: label,
                };
                const updatedFav = [...existingFav, newFav];
                return updatedFav;
            });

        }
    }


    async function handleDeleteLabel(label: string) {
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

        setTimeout(() => {
            setSync({
                type: 'label',
                action: 'DELETE',
                command: {
                    name: label
                }
            })
        }, 510);

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
                                const isFavorite = isProjectInFavorites(label, favourite) as boolean;
                                return (
                                    <Tags key={label} handleDeleteLabel={handleDeleteLabel} isFavorite={isFavorite}
                                        handleFav={handleFav} label={label} />
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


