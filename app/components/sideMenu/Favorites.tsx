import React, { useState } from 'react';
import { useFavouriteContext } from '../context/FavouriteContextWrapper';

function Favorites() {
    const [isActive, setIsActive] = useState(true);
    const { favourite, setFavourite } = useFavouriteContext();
    const togglesetIsActive = () => {
        setIsActive(!isActive);
    };

    const length = favourite?.length;
    const arrowClass = isActive ? 'rotate-90' : '';

    return (
        (length as number > 0) && (
            <section className='flex flex-col'>
                <h1 className='flex justify-between items-center font-semibold px-0.5'>
                    Favorites
                    <button
                        className={` hover:bg-neutral-200 rounded transform transition-transform ${arrowClass}`}
                        onClick={togglesetIsActive}
                    >
                        <img src={'/icons/arrow.svg'} width={24} height={24} alt="arrow" />
                    </button>
                </h1>

                {isActive && (
                    <ul className='flex flex-col gap-1'>
                        {favourite?.map((fav) => (
                            <li key={fav.name} className='group p-1 relative pr-2 pl-3 flex justify-between rounded hover:bg-blue-50 hover:cursor-pointer'>
                                {fav.type === 'project' && (
                                    <div className='flex items-center max-w-[130px]'>
                                        <span className='min-h-[12px] min-w-[12px] bg-cyan-800 rounded-full'></span>
                                        <span className='text-black text-sm ml-2'>{fav.name}</span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        )
    );
}

export default Favorites;
