import Tarefa from '@/components/Tarefa'
import Adicionar from '@/components/Adicionar'
import { Button } from "@/components/ui/button"
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/ui/button-group"


const Home: React.FC = () => {
    return (
        <>
            <div className='flex flex-row justify-between items-center mb-5'>
                <h1 className='text-2xl'>USUARIO TASKS</h1>
                <Button className="cursor-pointer pr-10 pl-10 bg-black text-white " variant="outline">Deslogar</Button>
            </div>

            <div className='flex justify-center border-2 border-black rounded-sm p-2'>
                <ButtonGroup>
                    <Button size='default' className='cursor-pointer p-7'>Projetos</Button>
                    <Button size='lg' className='cursor-pointer p-8'>Tarefas</Button>
                    <Button size='default' className='cursor-pointer p-7'>Tarefas Completadas 2</Button>
                    <Button size='default' className='cursor-pointer p-7'>Projetos Completados</Button>
                </ButtonGroup>
            </div>

            <div className="p-6 space-y-4">
                <Adicionar tipo="Tarefa" />

                <Tarefa tarefa="Teste" data="1/1/2000" concluida />
                <Tarefa tarefa="Teste2" data="11/1/2000" concluida />
                <Tarefa tarefa="Teste3" data="12/1/2000" concluida />
            </div>
        </>
    )
}

export default Home