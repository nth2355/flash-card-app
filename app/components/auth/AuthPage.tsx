"use client"
import Image from "next/image"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"

export default function AuthPage({
  mode,
  onSwitch,
}: {
  mode: "login" | "signup"
  onSwitch: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50">
      
      <Image
        src="/images/logo.png"
        width={300}
        height={300}
        alt="logo"
        className="object-contain"
      />

      <div className="w-full max-w-md">
        {mode === "login" ? (
          <LoginForm onSwitch={onSwitch} />
        ) : (
          <SignupForm onSwitch={onSwitch} />
        )}
      </div>
    </div>
  )
}
