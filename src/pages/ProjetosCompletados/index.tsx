
import Projeto from "@/components/Projeto"
import { useProjetos } from "@/contexts/ProjetosContext"

const ProjetosCompletados: React.FC = () => {
    const { projetos, onDelete, onCheck, onEdit } = useProjetos()

    // Filtra apenas projetos completados
    const projetosCompletados = projetos.filter(p => p.concluidaP)

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Projetos Completados</h1>

            {projetosCompletados.length === 0 ?
                <p className="text-gray-500 text-center mt-8">Nenhum projeto completado ainda. Complete um para vê-lo aqui!</p>
                :
                <ul>
                    {projetosCompletados.map(({ id, nome, data, concluidaP, tarefas, cor }) => {
                        return <Projeto key={id} id={id} nome={nome} data={data} concluidaP={concluidaP}
                            expandido={false} onCheck={onCheck} onDelete={onDelete} onEdit={onEdit} tarefas={tarefas} cor={cor} />
                    })}
                </ul>
            }
        </div>
    )
}

export default ProjetosCompletados