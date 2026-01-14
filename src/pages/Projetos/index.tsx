import { Button } from "@/components/ui/button"
import Adicionar from "@/components/Adicionar"
import Tarefa from "@/components/Tarefa"
import Projeto from "@/components/Projeto"
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/ui/button-group"
import Nav from "@/components/Nav"
import { MdOutlineFollowTheSigns } from "react-icons/md"
import BotaoSair from "@/components/BotaoSair"


const Projetos: React.FC = () => {
    return (
        <>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-2xl'>USUARIO PROJETOS</h1>
                <BotaoSair />
            </div>



            <div className="p-6 space-y-4">
                <Adicionar tipo="Projeto" />
            </div>
            <div className='border-2 border-black rounded-sm p-5'>
                <Projeto nome="Projeto" data={new Date()} concluida cor="azul" expandido />
            </div>
        </>
    )
}

export default Projetos