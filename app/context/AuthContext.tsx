"use client"

import {createContext, useContext, useEffect, useState, ReactNode} from "react"
import {useRouter} from "next/navigation"
import {getMe} from "@/lib/api"

type User = {
    id: number
    name: string
    email: string
}

type AuthContextType = {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    login: (token: string) => Promise<void>
    logout: () => void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children} : {children : ReactNode}){
    const [user, setUser] = useState<User|null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    //App load: doc token cu
    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        if(!storedToken){
            setLoading(false)
            return
        }
        login(storedToken)
    }, [])

    //login = set token + fetch user
    const login = async(newToken: string) => {
        try{
            localStorage.setItem("token", newToken)
            setToken(newToken)

            const me = await getMe(newToken)
            setUser(me)
        }catch (error){
            console.error("Login failed: ", error)
            logout()
        }finally{
            setLoading(false)
        }
    }

    // Logout = clear everthing
    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
        setToken(null)
        router.replace("/login")
    }

    return(
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated: !!user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used in inside AuthProvider")
    }
    return context
}