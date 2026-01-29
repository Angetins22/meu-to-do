// contexts/ProjetosContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { IProjeto } from '@/components/Projeto'
import { createProjeto, deleteProjeto, getProjetos } from '@/controllers/ProjetoController'

interface ProjetosContextType {
    projetos: IProjeto[]
    adicionarProjeto: (projeto: Omit<IProjeto, 'id'>) => Promise<void>
    setProjetos: (projetos: IProjeto[]) => void
    onDelete: (id: string) => void
    onCheck: (id: string) => void
    onEdit: (id: string, nome: string, data: Date, cor: string) => void
}

const ProjetosContext = createContext<ProjetosContextType | undefined>(undefined)

export const ProjetosProvider = ({ children }: { children: ReactNode }) => {
    const [projetos, setProjetos] = useState<IProjeto[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(false)

    const fetchProjetosFirebase = async () => {
        const ProjetosFirebase = await getProjetos()
        setProjetos(ProjetosFirebase)
    }

    const carregarProjetos = async () => {
        try {
            setCarregando(false)
            setErro(false)
            console.log('carregando projetos')
            fetchProjetosFirebase()
            console.log('projetos carregados')
        } catch (e) {
            setErro(true)
            console.log('erro ao carregar projetos: ', e)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        carregarProjetos()
    }, [])

    const adicionarProjeto = async (novoProjeto: Omit<IProjeto, 'id'>) => {
        console.log('dados projeto: ', novoProjeto)
        await createProjeto(novoProjeto)
        fetchProjetosFirebase()
    }

    const onDelete = async (id: string) => {
        await deleteProjeto(id)
        fetchProjetosFirebase()
    }

    const onCheck = (id: string) => {
        setProjetos(projetos.map(projeto =>
            projeto.id === id
                ? { ...projeto, concluidaP: !projeto.concluidaP }
                : projeto
        ))
    }

    const onEdit = (id: string, nome: string, data: Date, cor: string) => {
        setProjetos(projetos.map(projeto =>
            projeto.id === id ? { ...projeto, nome, data, cor } : projeto
        ))
    }

    return (
        <ProjetosContext.Provider value={{ projetos, setProjetos, onDelete, onCheck, onEdit, adicionarProjeto }}>
            {children}
        </ProjetosContext.Provider>
    )
}

export const useProjetos = () => {
    const context = useContext(ProjetosContext)
    if (!context) {
        throw new Error('useProjetos deve ser usado dentro de ProjetosProvider')
    }
    return context
}