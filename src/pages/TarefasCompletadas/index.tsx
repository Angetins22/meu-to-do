
import Tarefa from "@/components/Tarefa"
import { useTarefas } from "@/contexts/TarefasContext"

const TarefasCompletadas: React.FC = () => {
    const { tarefas, onDeleteTarefa, onCheckTarefa, onEditTarefa } = useTarefas()

    // Filtra apenas tarefas completadas
    const tarefasCompletadas = tarefas.filter(t => t.concluida)

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Tarefas Completadas</h1>

            {tarefasCompletadas.length === 0 ?
                <p className="text-gray-500 text-center mt-8">
                    Nenhuma tarefa completada ainda. Complete uma tarefa para vê-la aqui!
                </p>
                :
                <ul>
                    {tarefasCompletadas.map(({ id, tarefa, data, concluida }) => {
                        return <Tarefa
                            key={id} id={id} tarefa={tarefa} data={data} concluida={concluida} onCheck={onCheckTarefa}
                            onDelete={onDeleteTarefa} onEdit={onEditTarefa} dentroDoProjeto={false}
                        />
                    })}
                </ul>
            }
        </div>
    )
}
export default TarefasCompletadas