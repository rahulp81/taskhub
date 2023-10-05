"use client"
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Color switch demo' } };


export default function CreateProjectDialog({ openModal, setOpenModal, createProject, projects }
    : {
        openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
        createProject: (data: { name: string, checked: boolean }) => void,
        projects: string[]
    }
) {

    const [checked, setChecked] = useState(false);
    const [name, setName] = useState('')
    const [error, setError] = useState<string>('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };


    const customDialogStyle = {
        top: '-100px',
        borderRadius: '10px',
    };

    return (
        <div>
            <Dialog
                open={openModal}
                onClose={() => {
                    setName('')
                    setError('')
                    setOpenModal(false)
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: customDialogStyle,
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent Enter from submitting
                    }
                }}

            >
                <form className='sm:w-[400px] gap-4 flex  flex-col' >
                    <h1 className='text-xl py-2 px-3 border-b-[1px] font-extrabold'>Add a Project</h1>
                    <div className='flex flex-col  gap-3 '>
                        <label className='flex flex-col relative px-3 gap-1' htmlFor="name">
                            {error ? <p className=' text-red-500  font-medium'>{error}</p> : null}
                            <h2 className='font-bold  '>Name
                            </h2>
                            <input id='name' className='border-[1px] border-stone-300 px-1 py-1 rounded' type="text" value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError('');
                                }} />
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
                                        setError('');
                                        setName('');
                                    }}>
                                    Cancel
                                </button>
                                <button
                                    type='button'
                                    className={`${name ? 'bg-blue-500 hover:bg-blue-600 ' : 'bg-blue-200 cursor-not-allowed '}  text-sm px-3 py-1.5 rounded font-semibold  text-white `}
                                    disabled={(name) ? false : true}
                                    onClick={() => {
                                        // Check if a project with the same name already exists
                                        const isProjectExists = projects.includes(name);

                                        if (!isProjectExists) {
                                            createProject({ name, checked });
                                            setName('')
                                            setOpenModal(false);
                                        } else {
                                            setError('A project with the same name already exists!.');
                                        }
                                        setChecked(false);
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
