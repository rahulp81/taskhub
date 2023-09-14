import { redirect } from "next/navigation"
import type { Metadata } from 'next'
import { getServerSession } from "next-auth/next"

export const metadata: Metadata = {
  title: 'Taskhub: Today',
  description: '...',
}

export  default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  // if (!session) {
  //   redirect('/login')
  // }
  return (
      <>
      {children}
      </>
  )
}