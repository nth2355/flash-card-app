"use client"
import { useRouter } from "next/navigation"
import AuthPage from "@/app/components/auth/AuthPage"

export default function RegisterPage() {
  const router = useRouter()

  return (
    <AuthPage
      mode="signup"
      onSwitch={() => router.push("/login")}
    />
  )
}
