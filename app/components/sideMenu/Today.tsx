import React from 'react'
import CurrentDate from '../Svg/currentDate'
import CalendarIcon from '../Svg/currentDate'

function Today({noOfTaskInstances} : {noOfTaskInstances : number}) {
    return (
        <div className='flex text-[15px] justify-between  hover:bg-[#eeeeee] p-1.5 rounded-md'>
            <div className='flex gap-2.5 items-center'>
                <CurrentDate />
                <span className='text-black '>Today</span>
            </div>
            <span className='opacity-50 pr-1'>{noOfTaskInstances}</span>
        </div>
    )
}

export default Today