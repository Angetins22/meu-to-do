import Tarefa from '@/components/Tarefa'
import Adicionar from '@/components/Adicionar'
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


const Home: React.FC = () => {
    return (
        <>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-2xl'>USUARIO TASKS</h1>
                <Button className="cursor-pointer pr-10 pl-10 bg-black text-white " variant="outline">Deslogar</Button>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Projetose</NavigationMenuTrigger>
                        <NavigationMenuTrigger>Tarefas</NavigationMenuTrigger>
                        <NavigationMenuTrigger>Projetos Completados</NavigationMenuTrigger>
                        <NavigationMenuTrigger>Tarefas Completadas</NavigationMenuTrigger>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

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