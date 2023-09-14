import React, { useState } from 'react';

function Favorites() {
    const [isActive, setIsActive] = useState(false);

    const togglesetIsActive = () => {
        setIsActive(!isActive);
    };

    const arrowClass = isActive ? 'rotate-90' : '';

    return (
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
        </section>
    );
}

export default Favorites;
