"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

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

const loginSchema = z.object({
  email: z.string().email("Email invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginSchema = z.infer<typeof loginSchema>

export function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: LoginSchema) {
    console.log("Login submit:", values)
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" size="lg">Login</Button>
        </form>
      </Form>

      {/* Switch to signup */}
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
