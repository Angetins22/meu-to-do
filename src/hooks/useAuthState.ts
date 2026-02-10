
import { UserContext } from "@/contexts/UserContext";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router";
const auth = getAuth();


const useAuthState = () => {
    const navigate = useNavigate()

    const context = useContext(UserContext)

    if (!context) return
    const { setUser } = context

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                navigate('/home')
            } else {
                setUser(null)
                navigate('/login')
            }
        });
    }, [])


}

export default useAuthState