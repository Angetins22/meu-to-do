import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router";
const auth = getAuth();



const useUser = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                navigate('/home')
            } else {
                setUser(null)
                navigate('/login')
            }
            console.log('usuario: ', user)
        });
    }, [])
    return user
}

export default useUser