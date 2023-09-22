"use client"

import { useContext, useState } from 'react';
import sideMenuContext from '../../components/context/sideMenuContext'
import { useTagsContext } from '@/app/components/context/TagsContext';
import Filter from '@/app/components/filters/Filter';
import CreateLabelDialog from '@/app/components/Modals/CreateLabelModal';

function FiltersLabels() {
    const sideMenuAtive = useContext(sideMenuContext);
    const { tags, setTags } = useTagsContext();
    const [openModal ,setOpenModal] = useState(false);
    console.log(tags, 'tags');


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
                            <div className='hover:bg-blue-50 py-0.5 px-1 rounded' onClick={()=>setOpenModal(true)}>
                                <svg className='' width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="black"></path>
                                </svg>
                            </div>

                        </h2>
                        <ul className='flex flex-col gap-1 pl-2'>
                            {tags?.map((label) => {
                                return (
                                    <li key={label} className='border-b-[1px] text-sm  flex items-center py-1'>
                                        <div className="flex gap-2.5 flex-wrap">
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


