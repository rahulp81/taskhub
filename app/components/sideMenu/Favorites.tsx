import React, { useState } from 'react';
import { useFavouriteContext } from '../context/FavouriteContextWrapper';
import Link from 'next/link';
import { useSyncContext } from '../context/SyncContext';


function Favorites() {
    const [isActive, setIsActive] = useState(true);
    const { favourite, setFavourite } = useFavouriteContext();
    const { setSync } = useSyncContext();

    const togglesetIsActive = () => {
        setIsActive(!isActive);
    };

    const length = favourite?.length;
    const arrowClass = isActive ? 'rotate-90' : '';

    interface favouriteType {
        type: 'project' | 'label' | 'filter';
        name: string
    }

    function removeFavoriteByName(nameToRemove: string, type: string) {
        if (favourite !== null) {
            console.log('called');
            
            const updatedFavorites = favourite.filter((fav) => !(fav.type == type && fav.name == nameToRemove));
            setFavourite(updatedFavorites);
            setSync({
                type: 'fav_remove',
                command: {
                    name: nameToRemove,
                    type: type,
                }
            })
        }
    }

    return (
        (length as number > 0) && (
            <section className='flex flex-col'>
                <h1 className='flex justify-between items-center font-semibold px-0.5 py-1'>
                    Favorites
                    <button
                        className={` hover:bg-neutral-200 rounded transform transition-transform ${arrowClass}`}
                        onClick={togglesetIsActive}
                    >
                        <img src={'/icons/arrow.svg'} width={24} height={24} alt="arrow" />
                    </button>
                </h1>

                {isActive && (
                    <ul className='flex flex-col gap-0.5'>
                        {favourite?.map((fav) => (
                            <li key={fav.name} className='group p-1 relative pr-2 pl-3  flex justify-between rounded '>
                                {fav.type === 'project' && (
                                    <Link className='grow' href={`/app/project/${fav.name}`}>
                                        <div className='flex items-center gap-2.5 ml-1 hover:cursor-pointer grow hover:underline'>
                                            <span className='min-h-[12px] min-w-[12px] bg-cyan-800 rounded-full'></span>
                                            <span className='text-black text-sm '>{fav.name}</span>
                                        </div>
                                    </Link>
                                )}
                                {fav.type == 'label' && (
                                    <Link className='grow' href={`/app/label/${fav.name}`}>
                                        <div className='flex  items-center grow hover:cursor-pointer hover:underline'>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="fill-black"
                                                width={17}
                                                height={17}
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M10.9042 2.1001L20.8037 3.51431L22.2179 13.4138L13.0255 22.6062C12.635 22.9967 12.0019 22.9967 11.6113 22.6062L1.71184 12.7067C1.32131 12.3162 1.32131 11.683 1.71184 11.2925L10.9042 2.1001ZM11.6113 4.22142L3.83316 11.9996L12.3184 20.4849L20.0966 12.7067L19.036 5.28208L11.6113 4.22142ZM13.7327 10.5854C12.9516 9.80433 12.9516 8.538 13.7327 7.75695C14.5137 6.9759 15.78 6.9759 16.5611 7.75695C17.3421 8.538 17.3421 9.80433 16.5611 10.5854C15.78 11.3664 14.5137 11.3664 13.7327 10.5854Z"></path>
                                            </svg>
                                            <span className='ml-2 text-sm'>{fav.name}</span>
                                        </div>
                                    </Link>
                                )
                                }
                                {fav.type === 'filter' && (
                                    <div className='flex items-center grow hover:underline hover:cursor-pointer'>
                                        <Link className='grow' href={`/app/filter/${fav.name}`}>
                                            {fav.name === 'P1' && (
                                                <span className='flex gap-1.5'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-red-700`} width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" strokeWidth="0" fill="" />
                                                    </svg>
                                                    <span className='text-sm'>Priority 1</span>
                                                </span>
                                            )}
                                            {fav.name === 'P2' && (
                                                <span className='flex gap-1.5'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-orange-500`} width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" strokeWidth="0" fill="" />
                                                    </svg>
                                                    <span className='text-sm'>Priority 2</span>
                                                </span>
                                            )}
                                            {fav.name === 'P3' && (
                                                <span className='flex gap-1.5'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`fill-blue-700`} width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" strokeWidth="0" fill="" />
                                                    </svg>
                                                    <span className='text-sm'>Priority 3</span>
                                                </span>
                                            )}
                                            {fav.name === 'P4' && (
                                                <span className='flex gap-1.5'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
                                                        <path d="M5 21v-7" />
                                                    </svg>
                                                    <span className='text-sm'>Priority 4</span>
                                                </span>
                                            )}
                                        </Link>
                                    </div>
                                )}


                                <div className='p-1 hover:bg-stone-300 rounded' onClick={() => removeFavoriteByName(fav.name, fav.type)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className=' ' width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M3 3l18 18" />
                                        <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        )
    );
}

export default Favorites;
