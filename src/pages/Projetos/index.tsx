
import Adicionar, { TIPO } from "@/components/Adicionar"
import Projeto from "@/components/Projeto"
import type { IProjeto } from "@/components/Projeto"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useProjetos } from "@/contexts/ProjetosContext"
import { useState } from "react"
import { IoIosRefresh } from "react-icons/io"

const Projetos: React.FC = () => {
    const { projetos, setProjetos, onDelete: _onDelete, onCheck: _onCheck, onEdit: _onEdit, adicionarProjeto: _adicionarProjeto, carregando, erro, carregarProjetos, onEditExpandido: _onEditExpandido } = useProjetos()

    // Filtra apenas projetos NÃO completados
    const projetosAtivos = projetos.filter(p => !p.concluidaP)

    const onEditExpandido = (id: string) => {
        try {
            _onEditExpandido(id)
        } catch (e) {
            alert('erro ao expandir projeto')
            console.log(e)
        }
    }

    const adicionarProjeto = (item: IProjeto) => {
        try {
            _adicionarProjeto(item)
        } catch (e) {
            alert('erro ao adicionar projeto')
            console.log(e)
        }
    }

    const onDelete = (id: string) => {
        try {
            _onDelete(id)
        } catch (e) {
            alert('erro ao deletar tarefa')
            console.log(e)
        }
    }

    const onCheck = (id: string) => {
        try {
            _onCheck(id)
        } catch (e) {
            alert('erro ao concluir projeto')
            console.log(e)
        }
    }

    const onEdit = (id: string, nome: string, data: Date, cor: string) => {
        try {
            _onEdit(id, nome, data, cor)
        } catch (e) {
            alert('erro ao editar projeto')
            console.log(e)
        }
    }

    if (carregando)
        return (
            <>
                <div className="p-6 space-y-4">
                    <h1 className="text-2xl font-bold mb-4">Projetos</h1>
                    <Adicionar
                        tipo={TIPO.PROJETO}
                        onAdicionar={item => {
                            if ('nome' in item) adicionarProjeto(item)
                        }}
                    />
                </div>

                <div className='flex mt-20 flex-col align items-center justify-start'>
                    <p className="text-gray-500 text-center mb-5">
                        Tarefas sendo carregadas, aguarde!
                    </p>
                    <Spinner className='flex' />
                </div>
            </>
        )

    if (erro)
        return (
            <>
                <div className="p-6 space-y-4">
                    <h1 className="text-2xl font-bold mb-4">Projetos</h1>
                    <Adicionar
                        tipo={TIPO.PROJETO}
                        onAdicionar={item => {
                            if ('nome' in item) adicionarProjeto(item)
                        }}
                    />
                </div>

                <div className='flex mt-20 flex-col align items-center justify-start'>
                    <p className="text-gray-500 text-center mb-5">Parece que houve um problema ao carregar suas tarefas</p>
                    <Button variant="outline" className='p-7 cursor-pointer flex'
                        onClick={() => carregarProjetos()}>
                        <IoIosRefresh /> Tentar carregar novamente
                    </Button>
                </div>
            </>
        )

    return (
        <>
            <div className="p-6 space-y-4">
                <h1 className="text-2xl font-bold mb-4">Projetos</h1>
                <Adicionar tipo={TIPO.PROJETO} onAdicionar={item => {
                    if ('nome' in item) adicionarProjeto(item)
                }} />
            </div>


            {projetosAtivos.length === 0 ? <p className="text-gray-500 text-center mt-8">
                Nenhum Projeto Ativo. Adicione um novo Projeto!
            </p> :
                <ul>
                    {projetosAtivos.map(({ id, nome, data, concluidaP, tarefas, cor, expandido }) => {
                        return <Projeto key={id} id={id} nome={nome} data={data} concluidaP={concluidaP}
                            expandido={expandido} onCheck={onCheck} onDelete={onDelete}
                            onEdit={onEdit} tarefas={tarefas} cor={cor} onEditExpandido={onEditExpandido} />
                    })}
                </ul>
            }

        </>
    )
}

export default Projetos