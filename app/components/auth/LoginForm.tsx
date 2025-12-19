"use client"

import { useState } from "react"
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/app/context/AuthContext"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { PasswordInput } from "./PasswordInput"
// import { getMe } from "@/lib/api"
import { login as loginApi } from "@/lib/api"
import {useRouter} from "next/navigation"

type DialogMessage = {
  title: string
  description: string
}

// Schema
const loginSchema = z.object({
  email: z.string().email("Email invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginSchema = z.infer<typeof loginSchema>


// Component
export function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

async function onSubmit(values: LoginSchema) {
  try {
    setLoading(true)

    //  Gọi API login
    const res = await loginApi(values.email, values.password)

    //  Đưa token cho AuthContext
    await login(res.access_token)

    // Thông báo
    toast.success("Login successfully 🎉")
    router.replace("/dashboard")
  } catch (err: any) {
    toast.error(err.message || "Login failed")
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-center">Login</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage className="font-bold italic text-red-500"/>
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="******" {...field} />
                </FormControl>
                <FormMessage className="font-bold italic text-red-500"/>
              </FormItem>
            )}
          />

          <Button className="w-full bg-gray-200 hover:bg-gray-500" size="lg" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Have you registered yet?{" "}
        <button
          className="text-primary hover:underline"
          onClick={onSwitch}
        >
          Create an account
        </button>
      </p>


    </div>
  )
}
