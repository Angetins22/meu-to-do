import Tarefa from '@/components/Tarefa'
import Adicionar from '@/components/Adicionar'
import { Button } from "@/components/ui/button"
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/ui/button-group"
import Nav from '@/components/Nav'


const Home: React.FC = () => {
    return (
        <>
            <div className='flex flex-row justify-between items-center mb-5'>
                <h1 className='text-2xl'>USUARIO TASKS</h1>
                <Button className="cursor-pointer pr-10 pl-10 bg-black text-white " variant="outline">Deslogar</Button>
            </div>

            <Nav />

            <div className="p-6 space-y-4">
                <Adicionar tipo="Tarefa" />

                <Tarefa tarefa="Teste" data={new Date()} concluida />
                <Tarefa tarefa="Teste2" data={new Date()} concluida />
                <Tarefa tarefa="Teste3" data={new Date()} concluida />
            </div>
        </>
    )
}

export default Home