"use client"

import { useContext } from 'react';
import sideMenuContext from '../../components/context/sideMenuContext'


function FiltersLabels() {
    const sideMenuAtive = useContext(sideMenuContext);

    return (
        <div className={`grow  flex justify-center  transition-all duration-[500ms] ease-in-out ${sideMenuAtive ? '' : 'min-[800px]:ml-[-275px]'}`}>

            <main className="app-container | flex flex-col gap-3 mt-8">
                <h1 className="font-bold mb-4 text-[20px]">Filters & Labels</h1>
                <div className="flex flex-col w-full gap-2 ">
                    <div className="flex flex-col gap-4">
                        <h2 className='text-base py-1 font-bold border-b-[1px]'>Filters</h2>
                        <ul className='flex flex-col'>

                        </ul>

                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className='text-base py-1 font-bold border-b-[1px]'>Labels</h2>
                        <ul className='flex flex-col'>

                        </ul>

                    </div>


                </div>
            </main >

        </div >
    )
}

export default FiltersLabels


