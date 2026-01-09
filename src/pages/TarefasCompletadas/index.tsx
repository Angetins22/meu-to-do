import { Button } from "@/components/ui/button"
import Tarefa from "@/components/Tarefa"

const TarefasCompletadas: React.FC = () => {
    return (
        <>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-2xl'>USUARIO TAREFAS COMPLETADAS</h1>
                <Button className="cursor-pointer pr-10 pl-10 bg-black text-white " variant="outline">Deslogar</Button>
            </div>

            <div className="p-6 space-y-4">
                <Tarefa tarefa="Teste" data="1/1/2000" concluida />
            </div>
        </>
    )
}

export default TarefasCompletadas