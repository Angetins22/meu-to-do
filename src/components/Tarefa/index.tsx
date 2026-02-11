import { Checkbox } from "@/components/ui/checkbox"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { Card, } from "@/components/ui/card"
import { memo, useState } from "react";
import { Input } from "../ui/input";
import Calendar22 from "../Calendar22";
import { FaCheck } from "react-icons/fa";

export interface ITarefa {
    id: string
    tarefa: string
    data: Date
    concluida: boolean
    dentroDoProjeto?: boolean
}

interface Props extends ITarefa {
    onCheck: (id: string) => void
    onDelete: (id: string) => void
    onEdit: (id: string, novoTexto: string, data: Date) => void
}

enum MODO {
    EDITANDO,
    NORMAL
}


const Tarefa: React.FC<Props> = ({ tarefa, data: dataInicial, concluida, id, onCheck, onDelete, onEdit, dentroDoProjeto }) => {


    const [modo, setModo] = useState(MODO.NORMAL)
    const [nomeTarefa, setNomeTarefa] = useState(tarefa)
    const [data, setData] = useState<undefined | Date>(dataInicial)

    const onModo = () => {
        setModo(modo === MODO.NORMAL ? MODO.EDITANDO : MODO.NORMAL)
        if (modo === MODO.EDITANDO && data !== undefined) {
            onEdit(id, nomeTarefa, data)
        }
    }

    console.log({ dataInicial, data, id, tarefa })

    return (
        <>


            <Card className={`mb-4 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 p-4 md:p-5 
            transition-colors ${dentroDoProjeto ? 'border-0' : ''} 
            ${concluida ? 'bg-green-100 border-green-300' : ''}`}>
                <div className="flex flex-1 w-full flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
                    <Checkbox
                        className="cursor-pointer self-start md:self-auto"
                        checked={concluida}
                        onCheckedChange={() => onCheck(id)}
                    />

                    {modo === MODO.EDITANDO && (
                        <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full">
                            <Input
                                type="text"
                                placeholder="Nome"
                                onChange={event => setNomeTarefa(event.target.value)}
                                value={nomeTarefa}
                                className="w-full"
                            />
                            <Calendar22 onDate={(data) => setData(data)} dataInicial={data} />
                        </div>
                    )}

                    {modo === MODO.NORMAL && (
                        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4">
                            <p className="text-base md:text-xl flex-1">{tarefa}</p>
                            <p className="text-sm md:text-xl">
                                {data?.toLocaleDateString('pt-BR') || '(Data não definida)'}
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex gap-2 self-end md:self-auto">
                    {!concluida && (
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
            </Card>
        </>

    )
}

export default memo(Tarefa)