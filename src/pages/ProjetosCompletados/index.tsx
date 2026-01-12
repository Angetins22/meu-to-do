import { Button } from "@/components/ui/button"
import Projeto from "@/components/Projeto"
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/ui/button-group"

const ProjetosCompletados: React.FC = () => {
    return (
        <>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-2xl'>USUARIO PROJETOS COMPLETADOS</h1>
                <Button className="cursor-pointer pr-10 pl-10 bg-black text-white " variant="outline">Deslogar</Button>
            </div>

            <div className='flex justify-center border-2 border-black rounded-sm p-2'>
                <ButtonGroup>
                    <Button size='default' className='cursor-pointer p-7'>Projetos</Button>
                    <Button size='default' className='cursor-pointer p-7'>Tarefas</Button>
                    <Button size='default' className='cursor-pointer p-7'>Tarefas Completadas 2</Button>
                    <Button size='lg' className='cursor-pointer p-8'>Projetos Completados</Button>
                </ButtonGroup>
            </div>

            <div className="p-6 space-y-4">
                <Projeto nome="Projeto" data="10/10/2010" concluida cor expandido />
            </div>
        </>
    )
}

export default ProjetosCompletados