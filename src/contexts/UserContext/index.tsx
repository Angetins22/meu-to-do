import useAuthState from "@/hooks/useAuthState"
import type { User } from "firebase/auth"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface UserContextType {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)




    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}

export const useUser = (): User | null => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser deve ser usado dentro de UserProvider')
    }
    return context.user
}


