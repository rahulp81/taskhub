import Link from 'next/link';
import React, { useState } from 'react'
import DeleteLabelDialog from '@/app/components/Modals/DeleteProjectModal';

function Tags({ isFavorite, label, handleFav, handleDeleteLabel }:
    {
        isFavorite: boolean, label: string, handleFav: (isFavorite: boolean, label: string) => void,
        handleDeleteLabel: (label: string) => void
    }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
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
                <DeleteLabelDialog p={label} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} deleteTask={handleDeleteLabel} />
            </div>
        </li>
    )
}

export default Tags
