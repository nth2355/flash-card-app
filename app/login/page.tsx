"use client"
import { useRouter } from "next/navigation"
import AuthPage from "@/app/components/auth/AuthPage"
import {useEffect} from "react"
import { useAuth } from "@/app/context/AuthContext"

export default function LoginPage() {
  const router = useRouter()
  const {isAuthenticated, loading} = useAuth()

  useEffect(() => {
    if(!loading && isAuthenticated){
      router.replace("/dashboard")
    }
  }, [loading, isAuthenticated])

  return (
    <AuthPage
      mode="login"
      onSwitch={() => router.push("/register")}
    />
  )
}
