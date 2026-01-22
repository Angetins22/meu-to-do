import { createContext, useContext, useState, type ReactNode } from 'react'

export interface ITarefa {
    id: number
    tarefa: string
    data: Date
    concluida: boolean
}

interface TarefasContextType {
    tarefas: ITarefa[]
    setTarefas: (tarefas: ITarefa[]) => void
    onDeleteTarefa: (id: number) => void
    onCheckTarefa: (id: number) => void
    onEditTarefa: (id: number, tarefa: string, data: Date) => void
}

const TarefasContext = createContext<TarefasContextType | undefined>(undefined)

export const TarefasProvider = ({ children }: { children: ReactNode }) => {
    const [tarefas, setTarefas] = useState<ITarefa[]>([])

    const onDeleteTarefa = (id: number) => {
        setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
    }

    const onCheckTarefa = (id: number) => {
        setTarefas(tarefas.map(tarefa =>
            tarefa.id === id
                ? { ...tarefa, concluida: !tarefa.concluida }
                : tarefa
        ))
    }

    const onEditTarefa = (id: number, tarefaTexto: string, data: Date) => {
        setTarefas(tarefas.map(tarefa =>
            tarefa.id === id ? { ...tarefa, tarefa: tarefaTexto, data } : tarefa
        ))
    }

    return (
        <TarefasContext.Provider value={{ tarefas, setTarefas, onDeleteTarefa, onCheckTarefa, onEditTarefa }}>
            {children}
        </TarefasContext.Provider>
    )
}

export const useTarefas = () => {
    const context = useContext(TarefasContext)
    if (!context) {
        throw new Error('useTarefas deve ser usado dentro de TarefasProvider')
    }
    return context
}