
import Adicionar, { TIPO } from '@/components/Adicionar'
import { useState } from 'react'
import type { ITarefa } from '@/components/Tarefa'
import Tarefa from '@/components/Tarefa'
import { useTarefas } from '@/contexts/TarefasContext'




const Home: React.FC = () => {
    const { tarefas, setTarefas, onDeleteTarefa, onCheckTarefa, onEditTarefa } = useTarefas()

    // Filtra apenas tarefas NÃO completadas
    const tarefasAtivas = tarefas.filter(t => !t.concluida)

    return (
        <>
            <div className="p-6 space-y-4">
                <h1 className="text-2xl font-bold mb-4">Tarefas</h1>
                <Adicionar
                    tipo={TIPO.TAREFA}
                    onAdicionar={item => 'tarefa' in item && setTarefas([...tarefas, item])}
                />
            </div>

            <div className="px-6">
                {tarefasAtivas.length === 0 ?
                    <p className="text-gray-500 text-center mt-8">
                        Nenhuma tarefa ativa. Adicione uma nova tarefa!
                    </p>
                    :
                    <ul>
                        {tarefasAtivas.map(({ id, tarefa, data, concluida }) => {
                            return <Tarefa
                                key={id} id={id} tarefa={tarefa} data={data} concluida={concluida} onCheck={onCheckTarefa}
                                onDelete={onDeleteTarefa} onEdit={onEditTarefa} dentroDoProjeto={false}
                            />
                        })}
                    </ul>
                }
            </div>
        </>
    )
}


export default Home