import { Button } from "@/components/ui/button"
import Adicionar from "@/components/Adicionar"
import Tarefa from "@/components/Tarefa"
import Projeto from "@/components/Projeto"


const Projetos: React.FC = () => {
    return (
        <>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-2xl'>USUARIO PROJETOS</h1>
                <Button className="cursor-pointer pr-10 pl-10 bg-black text-white " variant="outline">Deslogar</Button>
            </div>

            <div className="p-6 space-y-4">
                <Adicionar tipo="Projeto" />
            </div>
            <div className='border-2 border-black rounded-sm p-5'>
                <Projeto nome="Projeto" data="10/10/2010" concluida cor expandido />
                <div>
                    <Adicionar tipo="Tarefa ao projeto" />
                </div>
                <div>
                    <Tarefa tarefa="Tarefa1" data="10/12/2010" concluida />
                </div>
            </div>
        </>
    )
}

export default Projetos