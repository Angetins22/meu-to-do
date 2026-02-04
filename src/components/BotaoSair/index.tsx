import { useNavigate } from "react-router";
import { MdOutlineFollowTheSigns } from 'react-icons/md'
import { Button } from "../ui/button";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const BotaoSair: React.FC = () => {

    const navigate = useNavigate()


    const deslogar = async () => {
        try {

            await signOut(auth)
            console.log(auth)
            navigate('/login')
        } catch (error) {
            alert('erro ao deslogar')
        }
    }

    return (

        <Button onClick={() => deslogar()} className="cursor-pointer" size="lg" variant="outline">
            <MdOutlineFollowTheSigns />
            Sair
        </Button>
    )
}

export default BotaoSair