import { createTarefa, deleteTarefa, getTarefas, updateTarefa } from '@/controllers/FirebaseController'
import { sleep } from '@/utils'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface ITarefa {
    id: string
    tarefa: string
    data: Date
    concluida: boolean
}

interface TarefasContextType {
    tarefas: ITarefa[]
    setTarefas: (tarefas: ITarefa[]) => void
    onDeleteTarefa: (id: string) => void
    onCheckTarefa: (id: string) => void
    onEditTarefa: (id: string, tarefa: string, data: Date) => void
    adicionarTarefa: (tarefa: Omit<ITarefa, 'id'>) => Promise<void>
    carregando: boolean
    erro: boolean
    setErro: (erro: boolean) => void
    carregarTarefas: () => Promise<void>
}

const TarefasContext = createContext<TarefasContextType | undefined>(undefined)

export const TarefasProvider = ({ children }: { children: ReactNode }) => {
    const [tarefas, setTarefas] = useState<ITarefa[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(false)

    const fetchTarefasFirebase = async () => {
        const tarefasFirebase = await getTarefas()
        setTarefas(tarefasFirebase)
    }

    const carregarTarefas = async () => {
        try {
            setCarregando(true)
            setErro(false)
            console.log('carregando tarefas')
            fetchTarefasFirebase()
            console.log('tarefas carregadas')
            //await sleep(5000)
            //setErro(true)
        } catch (error) {
            setErro(true)
            console.log('Erro ao carregar tarefas: ', error)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        carregarTarefas()
    }, [])

    const adicionarTarefa = async (novaTarefa: Omit<ITarefa, 'id'>) => {
        console.log('dados tarefa:', novaTarefa)
        await createTarefa(novaTarefa)
        fetchTarefasFirebase()
    }

    const onDeleteTarefa = async (id: string) => {
        await deleteTarefa(id)
        fetchTarefasFirebase()
    }

    const onCheckTarefa = async (id: string) => {
        const tarefa = tarefas.find(tarefa => tarefa.id === id)
        if (!tarefa) return

        await updateTarefa({
            id: id,
            concluida: !tarefa.concluida
        })
        fetchTarefasFirebase()

    }

    const onEditTarefa = async (id: string, tarefaTexto: string, data: Date) => {
        await updateTarefa({
            id: id,
            tarefa: tarefaTexto,
            data
        })
        fetchTarefasFirebase()
    }

    return (
        <TarefasContext.Provider value={{ tarefas, setTarefas, onDeleteTarefa, onCheckTarefa, onEditTarefa, adicionarTarefa, carregando, erro, setErro, carregarTarefas }}>
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