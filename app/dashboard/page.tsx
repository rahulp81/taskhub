'use client'
import { useSession } from "next-auth/react"

function Onboarding() {
const {data: session} = useSession();
  return (
    <div>Onboarding  user {session?.user?.name}</div>
  )
}

export default Onboarding