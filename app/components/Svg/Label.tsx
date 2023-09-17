import UseClickOutside from '@/app/app/hooks/UseClickOutside'
import React, { useRef, useState } from 'react'

function Label({ setLabels, labels }: { labels: string[] | null, setLabels: React.Dispatch<React.SetStateAction<string[] | null>> }) {
    const [active, setIsActive] = useState(false);
    const tempLabels = ['ok', 'fine'];
    const [tempoLabels, setTempoLabels] = useState([''])
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    UseClickOutside({ buttonRef, dropdownRef, setIsActive })


    function handleLabelAddition(label: string) {
        const index = tempoLabels.indexOf(label);

        if(index > -1){
            const newTemp = [...tempoLabels];
            newTemp.splice(index,1)
            setTempoLabels(newTemp)
        }else{
            const newTemp = [...tempoLabels];
            newTemp.push(label);
            setTempoLabels(newTemp)
        }


    }

    return (
        <div className='relative'>
            <button type='button' className='hover:bg-blue-50  rounded-md flex gap-3 items-end group py-1.5 px-2 border-[1px] border-gray-300'
                ref={buttonRef} onClick={() => setIsActive(!active)} >
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path d="M10.9042 2.1001L20.8037 3.51431L22.2179 13.4138L13.0255 22.6062C12.635 22.9967 12.0019 22.9967 11.6113 22.6062L1.71184 12.7067C1.32131 12.3162 1.32131 11.683 1.71184 11.2925L10.9042 2.1001ZM11.6113 4.22142L3.83316 11.9996L12.3184 20.4849L20.0966 12.7067L19.036 5.28208L11.6113 4.22142ZM13.7327 10.5854C12.9516 9.80433 12.9516 8.538 13.7327 7.75695C14.5137 6.9759 15.78 6.9759 16.5611 7.75695C17.3421 8.538 17.3421 9.80433 16.5611 10.5854C15.78 11.3664 14.5137 11.3664 13.7327 10.5854Z"></path></svg>
                </span>
                <span className='text-sm text-gray-600 font-normal group-hover:text-black'>Label</span>
            </button>
            {
                active &&
                <div className='bg-white absolute rounded shadow border-[1px] min-w-[120px] ' ref={dropdownRef}>
                    <ul className='flex flex-col w-full overflow-y-scroll '>
                        {tempLabels.map((label) => {
                            return (
                                <li key={label} className='flex  px-2  justify-between items-center py-1 hover:bg-blue-50 hover:cursor-pointer' onClick={() => handleLabelAddition(label)}>
                                    <div className='flex gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='fill-black' width={20} height={20} viewBox="0 0 24 24"><path d="M10.9042 2.1001L20.8037 3.51431L22.2179 13.4138L13.0255 22.6062C12.635 22.9967 12.0019 22.9967 11.6113 22.6062L1.71184 12.7067C1.32131 12.3162 1.32131 11.683 1.71184 11.2925L10.9042 2.1001ZM11.6113 4.22142L3.83316 11.9996L12.3184 20.4849L20.0966 12.7067L19.036 5.28208L11.6113 4.22142ZM13.7327 10.5854C12.9516 9.80433 12.9516 8.538 13.7327 7.75695C14.5137 6.9759 15.78 6.9759 16.5611 7.75695C17.3421 8.538 17.3421 9.80433 16.5611 10.5854C15.78 11.3664 14.5137 11.3664 13.7327 10.5854Z"></path></svg>
                                        <span>{label} </span>
                                    </div>
                                    <span className={`h-3.5 w-3.5 border-[1px] border-black ${tempoLabels?.includes(label) ? 'bg-black' : 'hover:bg-gray-200'}
                                    rounded `}></span>
                                </li>
                            )
                        })}
                    </ul>
                </div>

            }
        </div>
    )
}

export default Label