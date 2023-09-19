"use client"
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Color switch demo' } };


export default function CreateProjectDialog({ openModal, setOpenModal, createProject }
    : { openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, createProject: (data: { name: string, checked: boolean }) => void }
) {

    const [checked, setChecked] = useState(false);
    const [name, setName] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };


    const customDialogStyle = {
        top: '-100px', // Adjust the top position as needed
        borderRadius: '10px',
        // Adjust the maximum width as needed
    };

    return (
        <div>
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: customDialogStyle,
                }}
            >
                <form className='sm:w-[400px] gap-5 flex  flex-col' >
                    <h1 className='text-xl py-2 px-3 border-b-[1px] font-extrabold'>Add a Project</h1>
                    <div className='flex flex-col  gap-3 '>
                        <label className='flex flex-col px-3 gap-1' htmlFor="name">
                            <h2 className='font-bold  '>Name</h2>
                            <input id='name' className='border-[1px] border-stone-300 px-1 py-1 rounded' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <div className='px-3'>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        name="favoriteSwitch"
                                        color="primary"
                                    />
                                }
                                label="Add this to favorite"
                            />
                        </div>
                        <div className=' flex flex-col gap-4 px-3  py-3 border-[1px]'>
                            <div className='flex gap-4 self-end '>
                                <button type='button' className=' text-sm font-semibold  px-4 py-2 rounded bg-stone-100 hover:bg-stone-300' 
                                onClick={() => {
                                    setOpenModal(false);
                                    setChecked(false);
                                    setName('');
                                    }}>
                                    Cancel
                                </button>
                                <button type='button' className='text-white text-sm font-semibold  px-4 py-2 rounded bg-blue-500 hover:bg-blue-700' 
                                    onClick={() => {
                                        createProject({ name, checked })
                                        setOpenModal(false);
                                        }}>
                                    Add Project
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    );
}
