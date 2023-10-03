"use client"
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { useTagsContext } from '../context/TagsContext';
import { useFavouriteContext } from '../context/FavouriteContextWrapper';
import { useSyncContext } from '../context/SyncContext';

interface Favourite {
    type: 'project' | 'label' | 'filter';
    name: string
}

export default function CreateLabelDialog({ openModal, setOpenModal }
    : { openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [checked, setChecked] = useState(false);
    const [name, setName] = useState('')
    const { tags, setTags } = useTagsContext();
    const [error, setError] = useState('');
    const { setFavourite } = useFavouriteContext();
    const {setSync}  = useSyncContext();


    const handleCreateLabel =  (checked: boolean, name: string) => {
        setSync({
            type: 'label',
            action : 'POST',
            command: {
                name: name,
                checked: checked,
            }
        })
    };

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
                onClose={() => {
                    setName('');
                    setError('');
                    setOpenModal(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: customDialogStyle,
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    }
                }}
            >
                <form className='sm:w-[400px] gap-5 flex  flex-col' >
                    <h1 className='text-xl py-2 px-3 border-b-[1px] font-extrabold'>Add Label</h1>
                    <div className='flex flex-col  gap-3 '>
                        <label className='flex flex-col px-3 gap-1' htmlFor="name">
                            {error ? <p className=' text-red-500  font-medium'>{error}</p> : null}
                            <h2 className='font-bold  '>Name</h2>
                            <input id='name' className='border-[1px] border-stone-300 px-1 py-1 rounded' type="text" value={name}
                                onChange={(e) => {
                                    setError('');
                                    setName(e.target.value)
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
                                        setName('');
                                        setError('')
                                    }}>
                                    Cancel
                                </button>
                                <button type='button' className='text-white text-sm font-semibold  px-4 py-2 rounded bg-blue-500 hover:bg-blue-700'
                                    onClick={() => {
                                        // Check if a project with the same name already exists
                                        const labelExists = tags?.includes(name);
                                        if (!labelExists) {
                                            setTags((prevTags) => {
                                                const prevLabels = prevTags || [];
                                                const updatedTags = [...prevLabels, name]
                                                return updatedTags;
                                            })
                                            if (checked) {
                                                setFavourite((prevFav) => {
                                                    const currentFav = prevFav || [];
                                                    const newFav: Favourite = {
                                                        type: 'label',
                                                        name: name,
                                                    }
                                                    const updatedFav = [...currentFav, newFav]
                                                    return updatedFav
                                                })
                                            }
                                            setOpenModal(false);
                                            setName('');
                                            setChecked(false)
                                            handleCreateLabel(checked, name);
                                        } else {
                                            setError('A Label with same name already exists!.');
                                        }
                                    }}>
                                    Create Label
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    );
}
