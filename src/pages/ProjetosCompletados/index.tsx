import { Button } from "@/components/ui/button"
import Projeto from "@/components/Projeto"

const ProjetosCompletados: React.FC = () => {
    return (
        <>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-2xl'>USUARIO PROJETOS COMPLETADOS</h1>
                <Button className="cursor-pointer pr-10 pl-10 bg-black text-white " variant="outline">Deslogar</Button>
            </div>

            <Projeto nome="Projeto" data="10/10/2010" concluida cor expandido />
        </>
    )
}

export default ProjetosCompletados