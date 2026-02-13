
import { UserContext } from "@/contexts/UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router";
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