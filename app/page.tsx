import { redirect } from 'next/navigation'
import '../app/globals.css'
import "react-datepicker/dist/react-datepicker.css";
import { getServerSession } from "next-auth"

export default async function Homepage() {
  const session = await getServerSession()
  if(!session){
    redirect('/login')
  }else{
    redirect("/app/today")
  }
  return (
    <>
    </>
  )
}
