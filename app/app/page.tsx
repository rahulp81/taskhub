"use client"
import { useSession } from "next-auth/react"
import {redirect} from 'next/navigation'

function page() {
    const {data : session} = useSession()
    if(session){
    redirect('app/today')
    }
  return (
    <></>
  )
}

export default page