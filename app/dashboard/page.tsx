"use client"
import {useEffect} from "react"
import {useRouter} from "next/navigation"
import DashboardPage from "@/app/components/dashboard/DashboardPage"

export default function DashboardRoute() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(!token){
            router.replace("/login")
        }
    }, [router])
    



  return <DashboardPage />
}
