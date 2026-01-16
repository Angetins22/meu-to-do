
import Adicionar from '@/components/Adicionar'
import { useState } from 'react'
import type { ITarefa } from '@/components/Tarefa'
import Tarefa from '@/components/Tarefa'



const Home: React.FC = () => {


    const [tarefas, setTarefas] = useState<ITarefa[]>([{ id: 1, tarefa: 'pao', data: new Date(), concluida: false }
    ])

    const onCheck = (id: number) => {
        setTarefas(tarefas.map(tarefa =>
            tarefa.id === id
                ? { ...tarefa, concluida: !tarefa.concluida }
                : tarefa
        ))
    }

    const onDelete = (id: number) => {
        setTarefas(tarefas.filter(tarefa => {
            return tarefa.id !== id
        }))
    }

    const onEdit = (id: number, tarefa: string, data: Date) => {
        console.log(tarefa)
        setTarefas(tarefas.map(tarefA =>
            tarefA.id === id ? { ...tarefA, tarefa, data } : tarefA
        ))
    }

    return (
        <>
            <div className="p-6 space-y-4">
                <Adicionar tipo="Tarefa" tarefas={tarefas} setTarefas={setTarefas} id={1} />

                <ul>
                    {tarefas.map(({ id, tarefa, data, concluida }) => {
                        return <Tarefa key={id} id={id} tarefa={tarefa} data={data} concluida={concluida} onCheck={onCheck} onDelete={onDelete} onEdit={onEdit} />
                    })}
                </ul>
            </div>
        </>
    )
}


export default Home