
import Adicionar, { TIPO } from '@/components/Adicionar'
import Tarefa, { type ITarefa } from '@/components/Tarefa'
import { Button } from '@/components/ui/button'
import { useTarefas } from '@/contexts/TarefasContext'
import { IoIosRefresh } from "react-icons/io";
import { Spinner } from "@/components/ui/spinner"


const Home: React.FC = () => {
    const { tarefas, onDeleteTarefa: _onDeleteTarefa, onCheckTarefa: _onCheckTarefa, onEditTarefa: _onEditTarefa, adicionarTarefa: _adicionarTarefa, carregando, erro, carregarTarefas } = useTarefas()

    const tarefasAtivas = tarefas.filter(t => !t.concluida)

    const adicionarTarefa = (item: ITarefa) => {
        try {
            _adicionarTarefa(item)
        } catch (error) {
            alert('erro ao adicionar tarefa')
            console.log(error)
        }
    }

    const onDeleteTarefa = (id: string) => {
        try {
            _onDeleteTarefa(id)

        } catch (error) {
            alert('erro ao deletar tarefa')
            console.log(error)
        }
    }

    const onCheckTarefa = (id: string) => {
        try {
            _onCheckTarefa(id)

        } catch (error) {
            alert('erro ao completar tarefa')
            console.log(error)
        }
    }

    const onEditTarefa = (id: string, tarefa: string, data: Date) => {
        try {
            _onEditTarefa(id, tarefa, data)

        } catch (error) {
            alert('erro ao editar tarefa')
            console.log(error)
        }
    }


    if (carregando)
        return (
            <>
                <div className="p-6 space-y-4">
                    <h1 className="text-2xl font-bold mb-4">Tarefas</h1>
                    <Adicionar
                        tipo={TIPO.TAREFA}
                        onAdicionar={item => {
                            if ('tarefa' in item) adicionarTarefa(item)
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
                    <h1 className="text-2xl font-bold mb-4">Tarefas</h1>
                    <Adicionar
                        tipo={TIPO.TAREFA}
                        onAdicionar={item => {
                            if ('tarefa' in item) adicionarTarefa(item)
                        }}
                    />
                </div>

                <div className='flex mt-20 flex-col align items-center justify-start'>
                    <p className="text-gray-500 text-center mb-5">Parece que houve um problema ao carregar suas tarefas</p>
                    <Button variant="outline" className='p-7 cursor-pointer flex'
                        onClick={() => carregarTarefas()}>
                        <IoIosRefresh /> Tentar carregar novamente
                    </Button>
                </div>
            </>
        )


    return (
        <>
            <div className="p-6 space-y-4">
                <h1 className="text-2xl font-bold mb-4">Tarefas</h1>
                <Adicionar
                    tipo={TIPO.TAREFA}
                    onAdicionar={item => {
                        if ('tarefa' in item) adicionarTarefa(item)
                    }}
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