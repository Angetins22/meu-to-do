
import Adicionar from '@/components/Adicionar'
import { useState } from 'react'
import type { ITarefa } from '@/components/Tarefa'
import Tarefa from '@/components/Tarefa'



const Home: React.FC = () => {

    const [tarefas, setTarefas] = useState<ITarefa[]>([{ tarefa: 'pao', data: new Date(), concluida: true }])

    return (
        <>
            <div className="p-6 space-y-4">
                <Adicionar tipo="Tarefa" tarefas={tarefas} setTarefas={setTarefas} />

                <ul>
                    {tarefas.map(({ tarefa, data, concluida }) => {
                        return <Tarefa tarefa={tarefa} data={data} concluida={concluida} />
                    })}
                </ul>
            </div>
        </>
    )
}

export default Home