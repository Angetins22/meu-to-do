
import { Button } from '../ui/button'
import { FaArrowDown, FaArrowUp, FaCheckCircle, FaList } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { Card } from '../ui/card';
import Adicionar, { TIPO } from '../Adicionar';
import { useState } from 'react';
import { Input } from '../ui/input';
import Calendar22 from '../Calendar22';
import type { ITarefa } from '../Tarefa';
import Tarefa from '../Tarefa';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaCheck } from "react-icons/fa";
import { createTarefaP, deleteTarefaP, getProjetos, updateTarefaP } from '@/controllers/ProjetoController';
import { PiCaretRightLight } from "react-icons/pi";
import { PiCaretDownBold } from "react-icons/pi";
import { RxCaretRight } from "react-icons/rx";
import { PiCaretRightThin } from "react-icons/pi";
import { PiCaretDownThin } from "react-icons/pi";
import { CiUndo } from "react-icons/ci";
import { useUser } from '@/contexts/UserContext';
import { IoIosMore } from "react-icons/io";

export interface IProjeto {
    id: string
    nome: string
    data: Date
    concluidaP: boolean
    cor?: string
    expandido: boolean
    tarefas: ITarefa[]
}

interface Props extends IProjeto {
    onDelete: (id: string) => void
    onEdit: (id: string, novoTexto: string, data: Date, cor: string) => void
    onCheck: (id: string) => void
    onEditExpandido: (id: string) => void
    adicionarTarefaProjeto: (tarefa: ITarefa) => void
}

enum MODO {
    EDITANDO,
    NORMAL
}


const Projeto: React.FC<Props> = ({ nome, data: dataInicial, concluidaP: concluidaP, expandido: expandidoInicial, id, cor, tarefas: tarefasInicial, onCheck, onDelete, onEdit, onEditExpandido: _onEditExpandido, adicionarTarefaProjeto: _adicionarTarefaProjeto }) => {

    const [modo, setModo] = useState(MODO.NORMAL)
    const [nomeProjeto, setNomeProjeto] = useState(nome)
    const [data, setData] = useState<undefined | Date>(dataInicial)
    const [expandido, setExpandido] = useState(expandidoInicial)
    const [tarefas, setTarefas] = useState<ITarefa[]>(tarefasInicial)
    const user = useUser()
    const userId = user?.uid

    const onCor = (cor: string) => {
        onEdit(id, nome, dataInicial, cor)
        const body = document.querySelector('body')
        if (!body) return
        body.style.pointerEvents = 'unset'
    }

    const onModo = () => {
        setModo(modo === MODO.NORMAL ? MODO.EDITANDO : MODO.NORMAL)
        if (modo === MODO.EDITANDO && data !== undefined) {
            onEdit(id, nomeProjeto, data, cor || 'white')
        }
    }

    const adicionarTarefaProjeto = async (novaTarefa: Omit<ITarefa, 'id'>) => {
        if (!userId) return console.log('userId indefinido')
        try {
            const tarefaCriada = await createTarefaP(userId, id, novaTarefa)
            if (tarefaCriada) {
                setTarefas([...tarefas, tarefaCriada])
            }
        } catch (e) {
            console.log('erro ao adicionar tarefa: ', e)
        }
    }

    const onCheck1 = async (tarefaId: string) => {
        if (!userId) return console.log('userId indefinido')
        const tarefa = tarefas.find(tarefa => tarefa.id === tarefaId)
        if (!tarefa) return

        try {
            await updateTarefaP(userId, id, tarefaId, {
                concluida: !tarefa.concluida
            })
            setTarefas(tarefas.map(t =>
                t.id === tarefaId ? { ...t, concluida: !t.concluida } : t
            ))
        } catch (e) {
            console.error('Erro ao marcar tarefa:', e)
        }

    }

    const onDelete1 = async (tarefaId: string) => {
        if (!userId) return console.log('userId indefinido')
        try {
            await deleteTarefaP(userId, id, tarefaId)
            setTarefas(tarefas.filter(tarefa => tarefa.id !== tarefaId))
        } catch (e) {
            console.error('Erro ao deletar tarefa:', e)
        }
    }

    const onEdit1 = async (tarefaId: string, tarefa: string, data: Date) => {
        if (!userId) return console.log('userId indefinido')
        try {
            await updateTarefaP(userId, id, tarefaId, { tarefa, data })
            setTarefas(tarefas.map(t =>
                t.id === tarefaId ? { ...t, tarefa, data } : t
            ))
        } catch (e) {
            console.error('Erro ao editar tarefa:', e)
        }
    }

    return (
        <aside>
            <Card className={`flex flex-col  p-3 md:p-5 mb-5 ${concluidaP ? 'bg-green-100 border-green-300' : ''} `}
                style={{ backgroundColor: cor }}>
                <div className='flex flex-row md:flex-row gap-3 md:gap-7'>
                    <div className="flex flex-1 flex-row md:flex-row items-start md:items-center gap-8 md:gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="p-2 md:p-3 cursor-pointer self-start"
                            onClick={() => {
                                _onEditExpandido(id)
                                setExpandido(!expandido)
                            }}
                        >
                            {expandido ? <PiCaretDownThin /> : <PiCaretRightThin />}
                        </Button>

                        {modo === MODO.EDITANDO && (
                            <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full">
                                <Input
                                    type="text"
                                    placeholder="Nome"
                                    onChange={event => setNomeProjeto(event.target.value)}
                                    value={nomeProjeto}
                                    className="w-full"
                                />
                                <Calendar22 onDate={(data) => setData(data)} dataInicial={data} />
                            </div>
                        )}

                        {modo === MODO.NORMAL && (
                            <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4">
                                <p className="text-base md:text-xl flex-1">{nome}</p>
                                <p className="text-sm md:text-xl">
                                    {data?.toLocaleDateString('pt-BR') || '(Data não definida)'}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap justify-self-end-safe gap-1 md:gap-2 md:self-auto md:hidden ">
                        {modo === MODO.EDITANDO &&
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                                onClick={() => onModo()}
                            >
                                {modo === MODO.EDITANDO ? <FaCheck /> : <MdEdit />}
                            </Button>
                        }
                        {modo === MODO.NORMAL &&
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="cursor-pointer md:hidden"
                                            >
                                                {modo === MODO.EDITANDO ? <FaCheck /> : <IoIosMore />}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {modo === MODO.NORMAL && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="cursor-pointer"
                                                        onClick={() => onCheck(id)}
                                                    >
                                                        {!concluidaP ? <FaCheckCircle /> : <CiUndo />}
                                                    </Button>

                                                    {!concluidaP && (
                                                        < DropdownMenu >
                                                            <DropdownMenuTrigger>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className='cursor-pointer'
                                                                >
                                                                    <IoIosColorPalette />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuGroup>
                                                                    <DropdownMenuSub>
                                                                        <DropdownMenuSubTrigger>
                                                                            Cores
                                                                        </DropdownMenuSubTrigger>
                                                                        <DropdownMenuPortal>
                                                                            <DropdownMenuSubContent>
                                                                                <DropdownMenuItem className='cursor-pointer' onClick={() => onCor('#ed1c24')}>
                                                                                    Vermelho
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuItem className='cursor-pointer' onClick={() => onCor('#3973ac')}>
                                                                                    Azul
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuItem className='cursor-pointer' onClick={() => onCor('#ff80ff')}>
                                                                                    Rosa
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuItem className='cursor-pointer' onClick={() => onCor('#ffffff')}>
                                                                                    Branco
                                                                                </DropdownMenuItem>
                                                                            </DropdownMenuSubContent>
                                                                        </DropdownMenuPortal>
                                                                    </DropdownMenuSub>
                                                                </DropdownMenuGroup>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className='cursor-pointer' onClick={() => {
                                                                    const cor = window.prompt("Qual a cor ?")
                                                                    if (cor) onCor(cor)
                                                                }}>
                                                                    Custom
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </ DropdownMenu >
                                                    )}
                                                </>
                                            )}

                                            {!concluidaP && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="cursor-pointer"
                                                        onClick={() => onModo()}
                                                    >
                                                        {modo === MODO.EDITANDO ? <FaCheck /> : <MdEdit />}
                                                    </Button>

                                                    {modo === MODO.NORMAL && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="cursor-pointer"
                                                            onClick={() => onDelete(id)}
                                                        >
                                                            <MdDelete />
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenuTrigger>
                                </DropdownMenu>
                            </>
                        }
                    </div>
                    <div className="md:flex flex-wrap md:flex-nowrap items-center gap-1 md:gap-2 self-end md:self-auto hidden ">
                        {modo === MODO.NORMAL && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="cursor-pointer"
                                    onClick={() => onCheck(id)}
                                >
                                    {!concluidaP ? <FaCheckCircle /> : <CiUndo />}
                                </Button>

                                {!concluidaP && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className='cursor-pointer'
                                            >
                                                <IoIosColorPalette />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuGroup>
                                                <DropdownMenuLabel>Cores</DropdownMenuLabel>
                                                <DropdownMenuItem className='cursor-pointer' onClick={() => onEdit(id, nome, dataInicial, '#ff3333')}>
                                                    Vermelho
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className='cursor-pointer' onClick={() => onEdit(id, nome, dataInicial, '#3973ac')}>
                                                    Azul
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className='cursor-pointer' onClick={() => onEdit(id, nome, dataInicial, '#ff80ff')}>
                                                    Rosa
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className='cursor-pointer' onClick={() => onEdit(id, nome, dataInicial, '#ffffff')}>
                                                    Branco
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className='cursor-pointer' onClick={() => {
                                                let cor = window.prompt("Qual a cor ?")
                                                if (cor !== null) onEdit(id, nome, dataInicial, cor)
                                            }}>
                                                Custom
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </>
                        )}

                        {!concluidaP && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="cursor-pointer"
                                    onClick={() => onModo()}
                                >
                                    {modo === MODO.EDITANDO ? <FaCheck /> : <MdEdit />}
                                </Button>

                                {modo === MODO.NORMAL && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="cursor-pointer"
                                        onClick={() => onDelete(id)}
                                    >
                                        <MdDelete />
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
                {expandido &&
                    <>
                        {!concluidaP &&
                            <Adicionar tipo={TIPO.TAREFA} onAdicionar={item => {
                                if ('tarefa' in item) adicionarTarefaProjeto(item)
                            }} />
                        }

                        <div>
                            <ul>

                                {tarefas.map(({ id, tarefa, data, concluida }) => {
                                    return <Tarefa key={id} id={id} tarefa={tarefa} data={data} concluida={concluidaP ? true : concluida}
                                        onCheck={onCheck1} onDelete={onDelete1} onEdit={onEdit1} dentroDoProjeto={true} />
                                })}

                            </ul>
                        </div>
                    </>
                }
            </Card>
        </aside>
    )
}

export default Projeto