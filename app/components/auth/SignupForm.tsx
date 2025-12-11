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

const signupSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Email invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

type SignupSchema = z.infer<typeof signupSchema>

export function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: SignupSchema) {
    console.log("Signup submit:", values)
  }

  return (
    <div className="space-y-3 w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-center">Register</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage className="font-bold italic text-red-500" />
              </FormItem>
            )}
          />

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
          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                    <PasswordInput placeholder="******" {...field} />
                </FormControl>
                <FormMessage className="font-bold italic text-red-500"/>
                </FormItem>
            )}
          />


          <Button className="w-full" size="lg">Register</Button>
        </form>
      </Form>

      {/* Switch to login */}
      <p className="text-center text-sm text-muted-foreground">
        Have you registered already?{" "}
        <button
          className="text-primary hover:underline"
          onClick={onSwitch}
        >
          Login
        </button>
      </p>
    </div>
  )
}
