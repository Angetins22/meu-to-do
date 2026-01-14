import { Button } from "@/components/ui/button"
import Tarefa from "@/components/Tarefa"
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/ui/button-group"
import Nav from "@/components/Nav"
import { MdOutlineFollowTheSigns } from "react-icons/md"
import BotaoSair from "@/components/BotaoSair"

const TarefasCompletadas: React.FC = () => {
    return (
        <>

            <div className="p-6 space-y-4">
                <Tarefa tarefa="Teste" data={new Date()} concluida />
            </div>
        </>
    )
}

export default TarefasCompletadas