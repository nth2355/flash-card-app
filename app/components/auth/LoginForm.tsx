"use client"

import { useState } from "react"
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"

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
import { login, getMe } from "@/lib/api"

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginSchema) {
    try {
      //  Login
      const res = await login(values.email, values.password)

      //  Lưu token
      localStorage.setItem("token", res.access_token)

      //  Gọi /me
      const me = await getMe(res.access_token)

      console.log("Logged in user:", me)

      toast.success("Login successfully. Welcome!")
    } catch (err: any) {
      toast.error(err.message || "Login Failed")
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
