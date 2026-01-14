import { Button } from "@/components/ui/button"
import Projeto from "@/components/Projeto"
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/ui/button-group"
import Nav from "@/components/Nav"
import { MdOutlineFollowTheSigns } from "react-icons/md"
import BotaoSair from "@/components/BotaoSair"

const ProjetosCompletados: React.FC = () => {
    return (
        <aside>
            <div className="p-6 space-y-4">
                <Projeto nome="Projeto" data={new Date()} concluida cor="azul" expandido />
            </div>
        </aside>
    )
}

export default ProjetosCompletados