"use client"
import React from 'react'
import Inbox from './Inbox'
import Today from './Today'
import Upcoming from './Upcoming'
import FilterLabel from './FiltersLabel'
import Favorites from './Favorites'
import Board from './Boards'
import { usePathname } from 'next/navigation'
import Link from 'next/dist/client/link'

function SideMenu({ active }: { active: boolean }) {
    const currentRoute = usePathname();

    return (
        <section
            className={`flex  flex-col fixed overflow-x-hidden left-0   gap-10 side-menu min-h-full w-[275px] bg-[#fafafa] px-6 pt-8 side-menu
              transform transition-transform duration-500 ease-in-out ${active ? 'translate-x-0 ' : '-translate-x-[300%]  '
                }`}
        >
            <nav className='flex flex-col gap-1 '>
                <Link href={'/app/inbox'} className={currentRoute == '/app/inbox' ? 'active-link' : ''} >
                    <Inbox />
                </Link>
                <Link href={'/app/today'} className={currentRoute == '/app/today' ? 'active-link' : ''}>
                    <Today />
                </Link>
                <Link href={'/app/upcoming'} className={currentRoute == '/app/upcoming' ? 'active-link' : ''}>
                    <Upcoming />
                </Link>
                <Link href={'/app/filters-labels'} className={currentRoute == '/app/filters-labels' ? 'active-link' : ''}>
                    <FilterLabel />
                </Link>
            </nav>
            <Favorites />
            <Board />
        </section>
    )
}

export default SideMenu