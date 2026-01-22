// contexts/ProjetosContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { IProjeto } from '@/components/Projeto'

interface ProjetosContextType {
    projetos: IProjeto[]
    setProjetos: (projetos: IProjeto[]) => void
    onDelete: (id: number) => void
    onCheck: (id: number) => void
    onEdit: (id: number, nome: string, data: Date, cor: string) => void
}

const ProjetosContext = createContext<ProjetosContextType | undefined>(undefined)

export const ProjetosProvider = ({ children }: { children: ReactNode }) => {
    const [projetos, setProjetos] = useState<IProjeto[]>([])

    const onDelete = (id: number) => {
        setProjetos(projetos.filter(projeto => projeto.id !== id))
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
        <ProjetosContext.Provider value={{ projetos, setProjetos, onDelete, onCheck, onEdit }}>
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