import React, { useState } from 'react';

function Board() {
    const [isActive, setIsActive] = useState(false);

    const togglesetIsActive = () => {
        setIsActive(!isActive);
    };

    const arrowClass = isActive ? 'rotate-90' : '';

    return (
        <section className='flex flex-col'>
            <h1 className='flex justify-between items-center font-semibold hover:bg-[#eeeeee] py-1 px-0.5'>
                Projects
                <div className='flex gap-1'>
                    <button
                    className={` hover:bg-slate-50 rounded`}
                    >
                        <img src={'/icons/add-project.svg'} width={24} height={24} alt="add Task" />
                    </button>
                    <button
                        className={` hover:bg-slate-50 rounded transform transition-transform ${arrowClass}`}
                        onClick={togglesetIsActive}>
                        <img src={'/icons/arrow.svg'} width={24} height={24} alt="arrow" />
                    </button>
                </div>
            </h1>
            <div>

            </div>
        </section>
    );
}

export default Board;
