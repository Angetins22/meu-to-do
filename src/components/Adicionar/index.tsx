import { IoAddCircle } from "react-icons/io5";
import Calendar22 from "@/components/Calendar22"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, type ChangeEventHandler } from "react";
import type { ITarefa } from "../Tarefa";
import type { IProjeto } from "../Projeto";

interface Props {
    tipo: TIPO
    onAdicionar: (item: ITarefa | IProjeto) => void
}

export enum TIPO {
    TAREFA,
    PROJETO
}

const Adicionar: React.FC<Props> = ({ tipo, onAdicionar }) => {

    const [nome, setNome] = useState<string>('')
    const [data, setData] = useState<undefined | Date>(undefined)


    const handleAdd = () => {

        if (!nome) {
            return
        }

        if (!data) {
            return
        }

        if (tipo === TIPO.TAREFA) {
            onAdicionar({ id: new Date().getTime(), tarefa: nome, data, concluida: false, concluidaP: false, dentroDoProjeto: false })
        }

        if (tipo === TIPO.PROJETO) {
            onAdicionar({ id: new Date().getTime(), nome, data, concluidaP: false, expandido: true, tarefas: [] })
        }

        setNome('')
        setData(undefined)
    }

    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const inputTask = event.target.value
        setNome(inputTask)
    }

    return (
        <aside className="w-full mb-10">
            <p className="text-2xl items-start mb-5">Adicionar {tipo === TIPO.TAREFA ? 'Tarefa' : 'Projeto'}</p>
            <div className="flex flex-row gap-3 items-center">
                <Input type="text" placeholder="Nome" onChange={handleChangeInput} value={nome} />
                <Calendar22 dataInicial={data} onDate={(date) => setData(date)} />
                <Button variant="outline" size="icon" className="cursor-pointer" onClick={handleAdd}>
                    <IoAddCircle />
                </Button>
            </div>
        </aside>
    )
}

export default Adicionar