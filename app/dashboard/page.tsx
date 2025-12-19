"use client"

import { useAuth } from "@/app/context/AuthContext"
import {useRouter} from "next/navigation"
import {useEffect} from "react"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { loading, isAuthenticated } = useAuth()

  useEffect(() => {
    if(!loading && !isAuthenticated) {
      router.replace("/login")
    }
  }, [loading, isAuthenticated])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        Welcome back, {user?.name} 👋
      </h1>

      <p className="text-muted-foreground">
        This is your dashboard.
      </p>
    </div>
  )
}
