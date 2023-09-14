import React from 'react'

function FilterLabel() {
    return (
        <div className='flex text-[15px] justify-between  hover:bg-[#eeeeee] p-1.5 rounded-md'>
            <div className='flex gap-2.5 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 24 24"><path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="rgba(230,174,45,1)"></path></svg>
                <span className='text-black '>Filters & Label</span>
            </div>
            <span className='opacity-50 pr-1'></span>
        </div>
    )
}

export default FilterLabel