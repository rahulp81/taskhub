"use client"
import React from 'react'
import Link from 'next/link'
import { useFavouriteContext } from '../context/FavouriteContextWrapper';

interface Favourite {
    type: 'project' | 'label' | 'filter';
    name: string
}

function Filter() {
    const { favourite, setFavourite } = useFavouriteContext();


    function isProjectInFavorites(filter: string, favorites: Favourite[] | null) {
        return favorites?.some((favorite) => favorite.type === 'filter' && favorite.name === filter);
    }

    const isP1Fav = isProjectInFavorites('P1', favourite)
    const isP2Fav = isProjectInFavorites('P2', favourite)
    const isP3Fav = isProjectInFavorites('P3', favourite)
    const isP4Fav = isProjectInFavorites('P4', favourite)


    function handleFav(isFavorite: boolean, filter: string) {
        if (isFavorite == true) {
            setFavourite((prevFav) => {
                if (!prevFav) {
                    return [];
                }
                const updatedFav = prevFav.filter((fav) => !(fav.type == 'filter' && fav.name == filter));
                return updatedFav
            })
        } else {
            setFavourite((prevFav) => {
                const existingFav = prevFav || [];
                const newFav: Favourite = {
                    type: 'filter',
                    name: filter,
                }
                const updatedFav = [...existingFav, newFav]
                return updatedFav
            })
        }
    }



    return (
        <div className='flex flex-col gap-1'>

            <div className='flex border-b-[1px]  items-center gap-1.5 w-full  py-0.5 px-2 '>
                <Link className='flex gap-1.5 hover:underline grow' href={'/app/filter/P1'}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`fill-red-700`} width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" strokeWidth="0" fill="" />
                        </svg>
                    </span>
                    <span className='text-sm '>Priority 1</span>
                </Link>
                <span className="flex gap-0.5">
                    <button className="rounded hover:bg-slate-200  p-1"
                        onClick={(e) => {
                            handleFav(isP1Fav as boolean, 'P1')
                        }}>
                        <div className="">
                            {isP1Fav ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 3l18 18" />
                                    <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            )}
                        </div>
                    </button>
                </span>
            </div>

            <div className='flex border-b-[1px]  items-center gap-1.5 w-full  py-0.5 px-2 '>
                <Link className='flex gap-1.5 hover:underline grow' href={'/app/filter/P2'}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`fill-orange-500`} width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" strokeWidth="0" fill="" />
                        </svg>
                    </span>
                    <span className='text-sm '>Priority 2</span>
                </Link>
                <span className="flex gap-0.5">
                    <button className="rounded hover:bg-slate-200  p-1"
                        onClick={(e) => {
                            handleFav(isP2Fav as boolean, 'P2')
                        }}>
                        <div className="">
                            {isP2Fav ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 3l18 18" />
                                    <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            )}
                        </div>
                    </button>
                </span>
            </div>

            <div className='flex border-b-[1px]  items-center gap-1.5 w-full  py-0.5 px-2 '>
                <Link className='flex gap-1.5 hover:underline grow' href={'/app/filter/P3'}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`fill-blue-700`} width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" strokeWidth="0" fill="" />
                        </svg>
                    </span>
                    <span className='text-sm '>Priority 3</span>
                </Link>
                <span className="flex gap-0.5">
                    <button className="rounded hover:bg-slate-200  p-1"
                        onClick={(e) => {
                            handleFav(isP3Fav as boolean, 'P3')
                        }}>
                        <div className="">
                            {isP3Fav ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 3l18 18" />
                                    <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            )}
                        </div>
                    </button>
                </span>
            </div>



            <div className='hover:underline  flex border-b-[1px] w-full items-center gap-2 py-1 px-2'>
                <Link className='flex gap-1.5 hover:underline grow' href={'/app/filter/P4'}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
                            <path d="M5 21v-7" />
                        </svg>
                    </span>
                    <span className='text-sm'>Priority 4</span>
                </Link>
                <span className="flex gap-0.5">
                    <button className="rounded hover:bg-slate-200  p-1"
                        onClick={(e) => {
                            handleFav(isP4Fav as boolean, 'P4')
                        }}>
                        <div className="">
                            {isP4Fav ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 3l18 18" />
                                    <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            )}
                        </div>
                    </button>
                </span>
            </div>

        </div>
    )
}

export default Filter
