import { useNavigate } from "react-router";
import { MdOutlineFollowTheSigns } from 'react-icons/md'
import { Button } from "../ui/button";

const BotaoSair: React.FC = () => {

    const navigate = useNavigate()
    return (

        <Button onClick={() => navigate('/login')} className="cursor-pointer" size="lg" variant="outline">
            <MdOutlineFollowTheSigns />
            Sair
        </Button>
    )
}

export default BotaoSair