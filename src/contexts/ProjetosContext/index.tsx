// contexts/ProjetosContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { IProjeto } from '@/components/Projeto'
import { createProjeto, deleteProjeto, getProjetos, updateProjeto } from '@/controllers/ProjetoController'
import { useUser } from '../UserContext'

interface ProjetosContextType {
    projetos: IProjeto[]
    adicionarProjeto: (projeto: Omit<IProjeto, 'id'>) => Promise<void>
    setProjetos: (projetos: IProjeto[]) => void
    onDelete: (id: string) => void
    onCheck: (id: string) => void
    onEdit: (id: string, nome: string, data: Date, cor: string) => void
    carregando: boolean
    erro: boolean
    setErro: (erro: boolean) => void
    carregarProjetos: () => Promise<void>
    onEditExpandido: (id: string) => void
}

const ProjetosContext = createContext<ProjetosContextType | undefined>(undefined)

export const ProjetosProvider = ({ children }: { children: ReactNode }) => {
    const [projetos, setProjetos] = useState<IProjeto[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(false)
    const user = useUser()
    const userId = user?.uid

    const fetchProjetosFirebase = async () => {
        if (!userId) return console.log('userId indefinido')
        const ProjetosFirebase = await getProjetos(userId)
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
    }, [userId])

    const adicionarProjeto = async (novoProjeto: Omit<IProjeto, 'id'>) => {
        if (!userId) return
        console.log('dados projeto: ', novoProjeto)
        await createProjeto(userId, novoProjeto)
        fetchProjetosFirebase()
    }

    const onDelete = async (id: string) => {
        if (!userId) return
        await deleteProjeto(id, userId)
        fetchProjetosFirebase()
    }

    const onCheck = async (id: string) => {
        if (!userId) return
        const projeto = projetos.find(projeto => projeto.id === id)
        if (!projeto) return
        await updateProjeto(userId, {
            id,
            concluidaP: !projeto.concluidaP
        })
        fetchProjetosFirebase()
    }

    const onEditExpandido = async (id: string) => {
        if (!userId) return
        const projeto = projetos.find(projeto => projeto.id === id)
        if (!projeto) return

        await updateProjeto(userId, {
            id,
            expandido: !projeto.expandido
        })
        fetchProjetosFirebase()
    }

    const onEdit = async (id: string, nome: string, data: Date, cor: string) => {
        if (!userId) return
        await updateProjeto(userId, {
            id,
            nome,
            data,
            cor
        })
        fetchProjetosFirebase()
    }

    return (
        <ProjetosContext.Provider value={{ projetos, setProjetos, onDelete, onCheck, onEdit, adicionarProjeto, carregando, erro, setErro, carregarProjetos, onEditExpandido }}>
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