"use client"
import React from 'react'

function TaskMenu({active}: {active : boolean}) {

    if(!active){
        return
    }

    const styles: { position: 'absolute'; left: string; top: string } = {
        position: 'absolute',
        left:'80%',
        top: '5%',
    };

    return (
        <div className={`border-[1px] rounded-lg p-4 z-50 bg-white shadow-slate-200  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_10px]`}
            style={styles}
        >
            <ul className='flex flex-col gap-2'>
                <li><button>Edit Task</button></li>
                <li><button>Got to Project</button></li>
                <li>
                    <div>
                        <button>Set or Change Due Date</button>
                        <div>
                            <h3>Priority</h3>
                            <div>
                                <button>1</button>
                                <button>2</button>
                                <button>3</button>
                                <button>4</button>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <button>Change Project</button>
                    </div>
                </li>
                <li><button className='text-red-500'>Delete Task</button></li>
            </ul>
        </div>
    )
}

export default TaskMenu
