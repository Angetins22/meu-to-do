import { IoAddCircle } from "react-icons/io5";
import Calendar22 from "@/components/Calendar22"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, type ChangeEventHandler } from "react";
import type { ITarefa } from "../Tarefa";

interface Props {
    tipo: string
    tarefas: ITarefa[]
    setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>
}

const Adicionar: React.FC<Props> = ({ tipo, tarefas, setTarefas }) => {

    const [task, setTask] = useState<string>('')
    const [data, setData] = useState<undefined | Date>(undefined)


    const handleAddTarefaList = () => {

        if (!task) {
            return
        }

        if (!data) {
            return
        }

        const novaTarefa: ITarefa = {
            id: Date.now(),
            data: data,
            tarefa: task,
            concluida: false
        }

        setTarefas([...tarefas, novaTarefa])

        setTask('')
    }

    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const inputTask = event.target.value
        setTask(inputTask)
    }

    return (
        <aside className="w-full mb-10">
            <p className="text-2xl items-start mb-5">Adicionar {tipo}</p>
            <div className="flex flex-row gap-3 items-center">
                <Input type="text" placeholder="Nome" onChange={handleChangeInput} value={task} />
                <Calendar22 onDate={(date) => setData(date)} />
                <Button variant="outline" size="icon" className="cursor-pointer" onClick={handleAddTarefaList}>
                    <IoAddCircle />
                </Button>
            </div>
        </aside>
    )
}

export default Adicionar