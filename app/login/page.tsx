"use client"
import { useRouter } from "next/navigation"
import AuthPage from "@/app/components/auth/AuthPage"

export default function LoginPage() {
  const router = useRouter()

  return (
    <AuthPage
      mode="login"
      onSwitch={() => router.push("/register")}
    />
  )
}
