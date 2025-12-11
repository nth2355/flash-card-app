"use client"

import { useState } from "react"
import { Input } from "@/app/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export function PasswordInput({ ...props }) {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <Input 
        type={show ? "text" : "password"} 
        {...props} 
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          text-muted-foreground hover:text-foreground
          transition-colors
        "
      >
        {show ? (
          <EyeOff className="size-4 cursor-pointer" />
        ) : (
          <Eye className="size-4 cursor-pointer" />
        )}
      </button>
    </div>
  )
}
