import UseClickOutside from "@/app/components/hooks/UseClickOutside";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";

interface DueDateProps {
    setDueDate: React.Dispatch<React.SetStateAction<Date | null>>;
    dueDate: Date | null,
}

function DueDate({ dueDate, setDueDate }: DueDateProps) {
    // const[active,setIsActive] = useState(true);
    // const [startDate, setStartDate] = useState(new Date());
    // const buttonRef = useRef<HTMLButtonElement | null>(null);
    // const dropdownRef = useRef<HTMLDivElement>(null);
    // UseClickOutside({buttonRef,setIsActive,dropdownRef}) //Custom Hool for implementing Dropdown close at outside Click
    return (
        <div className="relative flex gap-2 border-[1px]  items-center hover:bg-blue-100 group rounded ">
                <span className="pl-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                        <path d="M16 3v4" />
                        <path d="M8 3v4" />
                        <path d="M4 11h16" />
                        <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    </svg>
                </span>
                <DatePicker
                             className="max-w-[110px]  text-sm placeholder:text-black group-hover:bg-blue-100"
                             selected={dueDate}
                             onChange={(date) => setDueDate(date as Date)}
                             isClearable
                             placeholderText="Set Due Date"
                             minDate={new Date()}
                             dateFormat="dd/MM/yyyy"
                 />
        </div>


    )
}

export default DueDate






// import UseClickOutside from "@/app/app/hooks/UseClickOutside";
// import { useRef, useState } from "react";

// interface DueDateProps {
//     setDueDate: React.Dispatch<React.SetStateAction<string>>;
//     dueDate: string,
// }

// function DueDate({ dueDate, setDueDate }: DueDateProps) {
//     const[active,setIsActive] = useState(true);
//     const buttonRef = useRef<HTMLButtonElement | null>(null);
//     const dropdownRef = useRef<HTMLDivElement>(null);
//     UseClickOutside({buttonRef,setIsActive,dropdownRef}) //Custom Hool for implementing Dropdown close at outside Click
//     return (
//         <div className="relative">
//             <button type="button" className='hover:bg-blue-50 rounded-md flex justify-center  gap-3 items-end group py-1.5 px-2 border-[1px] border-gray-300'
//              onClick={()=> {setIsActive(!active)}} ref={buttonRef} >
//                 <span>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                         <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
//                         <path d="M16 3v4" />
//                         <path d="M8 3v4" />
//                         <path d="M4 11h16" />
//                         <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
//                     </svg>
//                 </span>
//                 <span className='text-sm text-gray-600 font-normal group-hover:text-black'>Due Date</span>
//             </button>
//             {
//                 active &&  (
//                     <div className="absolute border-[1px] shadow-md rounded bg-white" ref={dropdownRef}>
//                         <div className="flex">
                            

//                         </div>
//                     </div>
//                 )
//             }
//         </div>


//     )
// }

// export default DueDate