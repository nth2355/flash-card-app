"use client"
import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"
import Image from "next/image";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-slate-50">
      
      {/* Logo */}
      <Image
        src="/images/logo.png"
        width={300}
        height={300}
        alt="logo"
        className="object-contain"
      />

      {/* Form Container */}
      <div className="w-full max-w-md">
        {mode === "login" ? (
          <LoginForm onSwitch={() => setMode("signup")} />
        ) : (
          <SignupForm onSwitch={() => setMode("login")} />
        )}
      </div>
    </div>
  )
}
