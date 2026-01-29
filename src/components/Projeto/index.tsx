
import { Button } from '../ui/button'
import { FaArrowDown, FaArrowUp, FaCheckCircle } from "react-icons/fa";
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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaCheck } from "react-icons/fa";



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
}

enum MODO {
    EDITANDO,
    NORMAL
}


const Projeto: React.FC<Props> = ({ nome, data: dataInicial, concluidaP: concluidaP, expandido: expandidoInicial, id, cor, onCheck, onDelete, onEdit }) => {

    const [modo, setModo] = useState(MODO.NORMAL)
    const [nomeProjeto, setNomeProjeto] = useState(nome)
    const [data, setData] = useState<undefined | Date>(dataInicial)
    const [expandido, setExpandido] = useState(expandidoInicial)
    const [tarefas, setTarefas] = useState<ITarefa[]>([{ id: 1, tarefa: 'Test', data: new Date(), concluida: false }])

    const onModo = () => {
        setModo(modo === MODO.NORMAL ? MODO.EDITANDO : MODO.NORMAL)
        if (modo === MODO.EDITANDO && data !== undefined) {
            onEdit(id, nomeProjeto, data, cor || 'white')
        }
    }


    const onCheck1 = (id: string) => {
        setTarefas(tarefas.map(tarefa =>
            tarefa.id === id
                ? { ...tarefa, concluida: !tarefa.concluida }
                : tarefa
        ))
    }

    const onDelete1 = (id: string) => {
        setTarefas(tarefas.filter(tarefa => {
            return tarefa.id !== id
        }))
    }

    const onEdit1 = (id: string, tarefa: string, data: Date) => {
        setTarefas(tarefas.map(tarefA =>
            tarefA.id === id ? { ...tarefA, tarefa, data } : tarefA
        ))
    }
    return (
        <aside>
            <Card className={`flex flex-col  p-5 mb-5 ${concluidaP ? 'bg-green-100 border-green-300' : ''} `} style={{ backgroundColor: cor }}>
                <div className='flex flex-row gap-7'>
                    <div className="flex flex-1 flex-row items-center justify-between">
                        <Button variant="ghost" size="icon" className=" p-3 cursor-pointer" onClick={() => setExpandido(!expandido)}>
                            {expandido ? <FaArrowUp /> : <FaArrowDown />}
                        </Button>
                        {modo === MODO.EDITANDO &&
                            <>
                                <Input type="text" placeholder="Nome" onChange={event => setNomeProjeto(event.target.value)} value={nomeProjeto} />
                                <Calendar22 onDate={(data) => setData(data)} dataInicial={data} />
                            </>
                        }
                        {modo === MODO.NORMAL &&
                            <>
                                <p className="text-xl flex-1 ml-3">{nome}</p>
                                <p className="text-xl  flex-1">{data?.toLocaleDateString('pt-BR') || '(Data não definida)'}</p>
                            </>
                        }
                    </div>
                    <div className="flex items-end justify-between">
                        {modo === MODO.NORMAL &&
                            <>
                                <Button variant="ghost" size="icon" className="ml-2 mr-2 cursor-pointer" onClick={() => onCheck(id)}><FaCheckCircle /></Button>
                                {!concluidaP &&
                                    <>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className='cursor-pointer'><IoIosColorPalette /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuLabel>Cores</DropdownMenuLabel>
                                                    <DropdownMenuItem className='cursor-pointer' onClick={() => onEdit(id, nome, dataInicial, '#ff3333')}>Vermelho</DropdownMenuItem>
                                                    <DropdownMenuItem className='cursor-pointer' onClick={() => onEdit(id, nome, dataInicial, '#3973ac')}>Azul</DropdownMenuItem>
                                                    <DropdownMenuItem className='cursor-pointer' onClick={() => onEdit(id, nome, dataInicial, '#ff80ff')}>Rosa</DropdownMenuItem>
                                                </DropdownMenuGroup>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className='cursor-pointer' onClick={() => {
                                                    let cor = window.prompt("Qual a cor ?")
                                                    if (cor !== null) onEdit(id, nome, dataInicial, cor)
                                                }}>Custom</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </>
                                }
                            </>
                        }
                        {!concluidaP &&
                            <>
                                <Button variant="ghost" size="icon" className="cursor-pointer " onClick={() => onModo()}>
                                    {modo === MODO.EDITANDO &&
                                        <FaCheck />
                                    }
                                    {modo === MODO.NORMAL &&
                                        <MdEdit />
                                    }
                                </Button>
                                {modo === MODO.NORMAL &&
                                    <Button variant="ghost" size="icon" className="cursor-pointer " onClick={() => onDelete(id)}>
                                        <MdDelete />
                                    </Button>
                                }
                            </>
                        }
                    </div>
                </div>
                {expandido &&
                    <>
                        {!concluidaP &&
                            <Adicionar tipo={TIPO.TAREFA} onAdicionar={item => 'tarefa' in item && setTarefas([...tarefas, item])} />
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