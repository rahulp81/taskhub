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
import MyPopover from "../components/productivity/popover"
import ProfileDropDown from "../components/profile/ProfileDropDown"
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SyncProvider } from "../components/context/SyncContext"
import Search from "../components/Modals/SearchModal"

const queryClient = new QueryClient();

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
  const [sideMenuActive, setSideMenu] = useState<boolean>(true);
  const { data: session } = useSession();
  const [addTaskModal, toggleAddTaskModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElProfile, setAnchorElProfile] = useState<HTMLButtonElement | null>(null);
  const [searchActive, setSearchActive] = useState(false);

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


  if (!session) {
    redirect('/login')
  }

  function toggleSideMenu() {
    setSideMenu(!sideMenuActive);
  }

  return (
    <>
      <header className="bg-blue-500 flex items-center h-[43px] justify-center overflow-clip sticky top-0  z-40">
        <div className="flex items-center justify-between lg:px-7 px-5 grow max-w-[1800px]">
          <div className="flex gap-2.5 shrink-0 upper-left-menu">
            <button className=" p-1 rounded" onClick={toggleSideMenu}>
              <Image src="/icons/menu.svg" alt="menu" height={24} width={24} />
            </button>
            <Link href={'/app/today'} className=" p-1 rounded">
              <Image src="/icons/home.svg" alt="home" width={24} height={24} />
            </Link>
            <button className="label | flex items-center text-sm relative bg-blue-400 rounded-md px-2 sm:w-36 
             text-white hover:bg-white hover:text-blue-900" onClick={()=> setSearchActive(!searchActive)} >
              <SearchIcon />
              <div className="flex shrink">
                <span id="search" className="rounded bg-transparent left-0 ml-2
                relative focus:outline-none ">
                  Search
                </span>
                <span className="absolute top-[3.1px] mr-2 right-0 hidden ">
                  <Image src={'/icons/close.svg'} width={24} height={24} alt="close" className="opacity-60" />
                </span>
              </div>
            </button>
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
                <img src={`${session?.user?.image || '/avatar.png' }`} alt="profile" width={25} height={25} className="rounded-full" />
              </button>
            </div>

          </div>
        </div >
      </header >
      <main className={`flex grow justify-center  top-0 main-container menu-open ${sideMenuActive ? 'active' : ''}`}>
        <div className="max-w-[1800px] flex flex-row w-full">
          <SideMenuContext.Provider value={sideMenuActive}>
            <QueryClientProvider client={queryClient}>
              <SyncProvider>
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
                          <ToastContainer position="bottom-left" autoClose={1500} theme="dark" />
                          <Search setOpenModal={setSearchActive}  openModal={searchActive} />
                          {/* Components */}
                        </CompletedTaskWrapper>
                      </FavouriteProvider>
                    </ProjectProvider>
                  </TagsProvider>
                </TaskContextProvider>
              </SyncProvider>
            </QueryClientProvider>
          </SideMenuContext.Provider>
        </div>
      </main>
    </>
  )
}

