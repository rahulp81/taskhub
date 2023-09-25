"use client"
import React from 'react';
import Dialog from '@mui/material/Dialog';


export default function LogOutModal({openModal,setOpenModal,logOut }
    : {openModal:boolean, setOpenModal:  React.Dispatch<React.SetStateAction<boolean>>,logOut: ()=> void }
    ) {

    const customDialogStyle = {
        top: '-170px', // Adjust the top position as needed
        borderRadius: '10px',
        // Adjust the maximum width as needed
    };

    return (
        <div>
            <Dialog
                open={openModal}
                onClose={()=> setOpenModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: customDialogStyle,
                }}
            >
                <div className='sm:w-[450px] h-[200px]  p-4 flex gap-3 flex-col justify-between' >
                    <header className='flex flex-col justify-between'>
                        <div className='flex justify-between'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" d="M12 3a9 9 0 110 18 9 9 0 010-18zm0 1a8 8 0 100 16 8 8 0 000-16zm.5 6a.5.5 0 01.5.5V15h1a.5.5 0 110 1h-3a.5.5 0 110-1h1v-4h-1a.5.5 0 110-1h1.5zm-.16-2.68a.84.84 0 110 1.68.84.84 0 010-1.68z"></path></svg>                        <span></span>
                            </span>
                            <span>
                                <button className='hover:bg-slate-200 rounded p-1 -mt-0.5' onClick={()=> setOpenModal(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"></path></svg>
                                </button>
                            </span>
                        </div>
                    </header>
                    <main className='grow flex flex-col justify-between'>
                        <p>You will be  <span className='font-bold'>Logged Out!</span>?</p>
                        <div className='self-end flex gap-4'>
                            <button className=' text-sm font-semibold  px-4 py-2 rounded bg-stone-100 hover:bg-stone-300' onClick={()=> setOpenModal(false)}>
                                Cancel
                            </button>
                            <button className='text-white text-sm font-semibold  px-4 py-2 rounded bg-red-500 hover:bg-red-700' onClick={()=> logOut()}>
                                Log Out
                            </button>
                        </div>
                    </main>
                </div>
            </Dialog>
        </div>
    );
}
