
import Adicionar, { TIPO } from "@/components/Adicionar"
import Projeto from "@/components/Projeto"
import type { IProjeto } from "@/components/Projeto"
import { Separator } from "@radix-ui/react-separator"
import { useState } from "react"

const Projetos: React.FC = () => {

    const [projetos, setProjetos] = useState<IProjeto[]>([])

    const onDelete = (id: number) => {
        setProjetos(projetos.filter(projeto => {
            return projeto.id !== id
        }))
    }

    const onCheck = (id: number) => {
        setProjetos(projetos.map(projeto =>
            projeto.id === id
                ? { ...projeto, concluidaP: !projeto.concluidaP }
                : projeto
        ))
    }


    const onEdit = (id: number, nome: string, data: Date, cor: string) => {
        setProjetos(projetos.map(projeto =>
            projeto.id === id ? { ...projeto, nome, data, cor } : projeto
        ))
    }

    return (
        <>
            <div className="p-6 space-y-4">
                <Adicionar tipo={TIPO.PROJETO} onAdicionar={item => 'nome' in item && setProjetos([...projetos, item])} />
            </div>

            <ul>
                {projetos.map(({ id, nome, data, concluidaP: concluida, tarefas, cor }) => {
                    return <Projeto key={id} id={id} nome={nome} data={data} concluidaP={concluida}
                        expandido={true} onCheck={onCheck} onDelete={onDelete} onEdit={onEdit} tarefas={tarefas} cor={cor} />
                })}
            </ul>


        </>
    )
}

export default Projetos