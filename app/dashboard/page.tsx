"use client"

import { useAuth } from "@/app/context/AuthContext"

export default function DashboardPage() {
  const { user } = useAuth()

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
