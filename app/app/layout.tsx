"use client"
import Image from "next/image"
import { useSession } from "next-auth/react"
import React from 'react'
import { redirect } from 'next/navigation'
import SearchIcon from '../components/Svg/SearchIcon'
import SideMenu from "../components/sideMenu/SideMenu"
import { useState } from "react"
import SideMenuContext from "../components/context/sideMenuContext"
import TaskContextProvider from "../components/context/TasksContext"
import { TagsProvider } from "../components/context/TagsContext"
import { ProjectProvider } from "../components/context/ProjectContextWrapper"
import { FavouriteProvider } from "../components/context/FavouriteContextWrapper"
import Link from "next/link"
import AddTaskModal from "../components/Modals/AddTaskModal"
import { CompletedTaskWrapper } from "../components/context/CompletedTaskContextWrapper"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Popover } from "@mui/material"
import MyPopover from "../components/productivity/popover"
import ProfileDropDown from "../components/profile/ProfileDropDown"



export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
  const [sideMenuActive, setSideMenu] = useState<boolean>(true);
  const { data: session } = useSession();
  const [addTaskModal, toggleAddTaskModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElProfile, setAnchorElProfile] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };


  const openProfile = Boolean(anchorElProfile);
  const idProfile = openProfile ? 'simple-popover' : undefined;


  console.log(session);

  if (!session) {
    redirect('/login')
  }

  function toggleSideMenu() {
    setSideMenu(!sideMenuActive);
  }

  return (
    <>
      <header className="bg-blue-500 flex items-center h-[43px] justify-center overflow-clip  z-40">
        <div className="flex items-center justify-between lg:px-7 px-5 grow max-w-[1800px]">
          <div className="flex gap-2.5 shrink-0 upper-left-menu">
            <button className=" p-1 rounded" onClick={toggleSideMenu}>
              <Image src="/icons/menu.svg" alt="menu" height={24} width={24} />
            </button>
            <Link href={'/app/today'} className=" p-1 rounded">
              <Image src="/icons/home.svg" alt="home" width={24} height={24} />
            </Link>
            <label htmlFor="search" className="label | flex items-center text-sm relative bg-blue-400 rounded-md px-1.5 hover:bg-white">
              <SearchIcon />
              <div className="flex shrink">
                <input id="search" type="text" placeholder="Search" className="rounded bg-transparent left-0 ml-2
                relative focus:outline-none placeholder:text-[14px]  min-[460px]:placeholder:text-white "/>
                <button className="absolute top-[3.1px] mr-2 right-0 hidden ">
                  <Image src={'/icons/close.svg'} width={24} height={24} alt="close" className="opacity-60" />
                </button>
              </div>
            </label>
          </div>
          <div className="flex gap-5 shrink-0">
            <button onClick={() => toggleAddTaskModal(!addTaskModal)}>
              <Image src={'/icons/addTask.svg'} alt="add Task" width={28} height={28} />
            </button>

            <div className="flex items-center">
              <button className={`flex text-white gap-1.5 p-1 rounded items-center text-sm hover:bg-blue-800 ${open ? 'bg-blue-700' : ''}`} aria-describedby={id} onClick={handleClick}>
                <Image src={'/icons/productivity.svg'} alt="productivity dashboard" width={24} height={24} />
              </button>
            </div>

            <div className="flex items-center">
            <button className={`flex text-white gap-1.5 p-1 rounded items-center text-sm hover:bg-blue-800 ${openProfile ? 'bg-blue-700' : ''}`} aria-describedby={idProfile} onClick={handleClickProfile}>
                <img src={`${session?.user?.image}`} alt="profile" width={25} height={25} className="rounded-full" />
              </button>
            </div>

          </div>
        </div>
      </header>
      <main className={`flex grow justify-center main-container menu-open ${sideMenuActive ? 'active' : ''}`}>
        <div className="max-w-[1800px] flex flex-row  w-full">
          <SideMenuContext.Provider value={sideMenuActive}>
            <TaskContextProvider>
              <TagsProvider >
                <ProjectProvider>
                  <FavouriteProvider>
                    <CompletedTaskWrapper>
                      {/* Components */}
                      <SideMenu active={sideMenuActive} />
                      <AddTaskModal openModal={addTaskModal} setOpenModal={toggleAddTaskModal} />
                      {children}
                      <MyPopover anchorEl={anchorEl} onClose={handleClose} open={open} />
                      <ProfileDropDown anchorEl={anchorElProfile} onClose={handleCloseProfile} open={openProfile} />
                      <ToastContainer position="bottom-left" autoClose={2000} theme="dark" />
                      {/* Components */}
                    </CompletedTaskWrapper>
                  </FavouriteProvider>
                </ProjectProvider>
              </TagsProvider>
            </TaskContextProvider>
          </SideMenuContext.Provider>
        </div>
      </main>

    </>
  )
}

