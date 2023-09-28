import UseClickOutside from '@/app/components/hooks/UseClickOutside'
import React, { useContext, useRef, useState } from 'react'
import { useTagsContext } from '../context/TagsContext';

function Label({ setLabels, labels }: { labels: string[] | null, setLabels: React.Dispatch<React.SetStateAction<string[] | null>> }) {
    const [active, setIsActive] = useState(false);
    const [tagsSearch, setTagsSearch] = useState('');
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    // const additionalRef = useRef<HTMLButtonElement | null>(null);
    const { tags, setTags } = useTagsContext();
    UseClickOutside({ buttonRef, dropdownRef, setIsActive })

    const filteredLabels = tagsSearch
        ? tags?.filter((label) => label.toLowerCase().includes(tagsSearch.toLowerCase()))
        : tags;


    //For Current Task aka choosing from available tags
    function handleLabelAddition(label: string) {
        const index = labels?.indexOf(label);

        console.log(labels, 'clicked');
        if (index as number > -1) {
            const newTemp = [...labels as string[]];
            newTemp.splice(index as number, 1)
            setLabels(newTemp)
        } else if (Array.isArray(labels)) {
            const newTemp = [...labels as string[]];
            newTemp.push(label);
            setLabels(newTemp)
        } else {
            const newTemp = [label];
            setLabels(newTemp);
        }
    }

    //For adding overall a new Tag
    function handleCreateLabel() {
        console.log('clicked');
        console.log(tagsSearch);
        const updatedTags = [...tags as string[]];
        updatedTags?.push(tagsSearch)
        console.log(updatedTags);
        setTags(updatedTags);
        fetch(`/api/app/label`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: tagsSearch,
                isFavorite: false
            })
        })
        const newTemp = [...labels as string[]];
        newTemp.push(tagsSearch);
        setLabels(newTemp)
        setIsActive(true);
        setTagsSearch('')
    }


    return (
        <div className='relative mr-20'>
            <button
                type='button'
                className={`hover:bg-blue-200  rounded-md flex gap-3 ${(labels && labels?.length > 0) && 'bg-blue-400'}
                             items-end group py-1.5 px-2 border-[1px] border-gray-300`}
                ref={buttonRef}
                onClick={() => setIsActive(!active)}
            >
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className={(labels && labels?.length > 0) ? 'fill-white' : ''}>
                        <path d="M10.9042 2.1001L20.8037 3.51431L22.2179 13.4138L13.0255 22.6062C12.6350 22.9967 12.0019 22.9967 11.6113 22.6062L1.71184 12.7067C1.32131 12.3162 1.32131 11.683 1.71184 11.2925L10.9042 2.1001ZM11.6113 4.22142L3.83316 11.9996L12.3184 20.4849L20.0966 12.7067L19.0360 5.28208L11.6113 4.22142ZM13.7327 10.5854C12.9516 9.80433 12.9516 8.5380 13.7327 7.75695C14.5137 6.9759 15.7800 6.9759 16.5611 7.75695C17.3421 8.5380 17.3421 9.80433 16.5611 10.5854C15.7800 11.3664 14.5137 11.3664 13.7327 10.5854Z"></path>
                    </svg>
                </span>
                <span className={`text-sm text-gray-600  group-hover:text-black
                ${(labels && labels?.length > 0) && 'text-white font-semibold'}`}>
                    Labels
                </span>
            </button>

            {
                active &&
                <div className='bg-white absolute -left-[10%]  rounded shadow border-[1px] min-w-[200px] z-50 ' ref={dropdownRef}>
                    <input
                        type="text"
                        className="w-full px-2 text-base pb-1.5 border-b-[1px]"
                        placeholder="Type a label"
                        value={tagsSearch}
                        onChange={(e) => setTagsSearch(e.target.value)}
                    />
                    <ul className="flex flex-col w-full overflow-y-scroll max-h-[200px]">
                        {filteredLabels?.map((label) => (
                            <li
                                key={label}
                                className="flex px-2  justify-between items-center py-1 hover:bg-blue-50 hover:cursor-pointer"
                                onClick={() => handleLabelAddition(label)}
                            >
                                <div className="flex gap-2 flex-wrap">
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
                                <span
                                    className={`h-3.5 w-3.5 border-[1px] border-black  ${labels?.includes(label) ? "bg-blue-700 border-none" : "hover:bg-gray-200"
                                        } rounded`}
                                ></span>
                            </li>
                        ))}
                    </ul>
                    {(tagsSearch && filteredLabels?.length == 0) && (
                        <button
                            // ref={additionalRef}
                            type='button'
                            className="mt-0.5 font-bold text-sm py-1  px-2 w-full hover:bg-blue-50"
                            onClick={handleCreateLabel}
                        >
                            + Create <span className='font-bold'>{tagsSearch}</span>
                        </button>
                    )}
                </div>

            }
        </div>
    )
}

export default Label