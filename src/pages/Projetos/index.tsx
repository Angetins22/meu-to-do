
import Adicionar, { TIPO } from "@/components/Adicionar"
import Projeto from "@/components/Projeto"
import type { IProjeto } from "@/components/Projeto"
import { useProjetos } from "@/contexts/ProjetosContext"
import { useState } from "react"

const Projetos: React.FC = () => {
    const { projetos, setProjetos, onDelete, onCheck, onEdit } = useProjetos()

    // Filtra apenas projetos NÃO completados
    const projetosAtivos = projetos.filter(p => !p.concluidaP)

    return (
        <>
            <div className="p-6 space-y-4">
                <h1 className="text-2xl font-bold mb-4">Projetos</h1>
                <Adicionar tipo={TIPO.PROJETO} onAdicionar={item => 'nome' in item && setProjetos([...projetos, item])} />
            </div>


            {projetosAtivos.length === 0 ? <p className="text-gray-500 text-center mt-8">
                Nenhum Projeto Ativo. Adicione um novo Projeto!
            </p> :
                <ul>
                    {projetosAtivos.map(({ id, nome, data, concluidaP, tarefas, cor }) => {
                        return <Projeto key={id} id={id} nome={nome} data={data} concluidaP={concluidaP}
                            expandido={true} onCheck={onCheck} onDelete={onDelete} onEdit={onEdit} tarefas={tarefas} cor={cor} />
                    })}
                </ul>
            }

        </>
    )
}

export default Projetos