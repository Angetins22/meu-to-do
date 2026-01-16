import { Checkbox } from "@/components/ui/checkbox"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { Card, } from "@/components/ui/card"
import { memo, useState } from "react";
import { Input } from "../ui/input";
import Calendar22 from "../Calendar22";
import { FaCheckCircle } from "react-icons/fa";

export interface ITarefa {
    id: number
    tarefa: string
    data: Date
    concluida: boolean
    onCheck: (id: number) => void
    onDelete: (id: number) => void
    onEdit: (id: number, novoTexto: string, data: Date) => void
}

enum MODO {
    EDITANDO,
    NORMAL
}


const Tarefa: React.FC<ITarefa> = ({ tarefa, data: dataInicial, concluida, id, onCheck, onDelete, onEdit }) => {


    const [modo, setModo] = useState(MODO.NORMAL)
    const [nomeTarefa, setNomeTarefa] = useState(tarefa)
    const [data, setData] = useState<undefined | Date>(dataInicial)

    const onModo = () => {
        setModo(modo === MODO.NORMAL ? MODO.EDITANDO : MODO.NORMAL)
        if (modo === MODO.EDITANDO && data !== undefined) {
            onEdit(id, nomeTarefa, data)
        }
    }

    return (

        <Card className={`mb-4 flex flex-row items-center justify-between gap-4 p-5 transition-colors ${concluida ? 'bg-green-100 border-green-300' : ''
            }`} >
            <div className="flex flex-1 flex-row items-center justify-between">
                <Checkbox className="cursor-pointer mr-10" checked={concluida} onCheckedChange={() => onCheck(id)} />
                {modo === MODO.EDITANDO &&
                    <>
                        <Input type="text" placeholder="Nome" onChange={event => setNomeTarefa(event.target.value)} value={nomeTarefa} />
                        <Calendar22 onDate={(data) => setData(data)} dataInicial={data} />
                    </>
                }
                {modo === MODO.NORMAL &&
                    <>
                        <p className="text-xl flex-1">{tarefa} </p>
                        <p className="text-xl flex-1">{data?.toLocaleDateString('pt-BR') || '(Data não definida)'}</p>
                    </>
                }
            </div>
            {concluida}
            <div className="w-1/10">
                <Button variant="ghost" size="icon" className="cursor-pointer mr-2" onClick={() => onModo()}>
                    {modo === MODO.EDITANDO &&
                        <FaCheckCircle />
                    }
                    {modo === MODO.NORMAL &&
                        <MdEdit />
                    }
                </Button>
                {modo === MODO.NORMAL &&
                    <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => onDelete(id)}>
                        <MdDelete />
                    </Button>
                }
            </div>
        </Card>

    )
}

export default memo(Tarefa)