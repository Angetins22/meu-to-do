
import Adicionar from '@/components/Adicionar'
import { Button } from "@/components/ui/button"
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/ui/button-group"
import Nav from '@/components/Nav'
import { MdOutlineFollowTheSigns } from 'react-icons/md'
import BotaoSair from '@/components/BotaoSair'
import { useState } from 'react'
import type { ITarefa } from '@/components/Tarefa'
import Tarefa from '@/components/Tarefa'



const Home: React.FC = () => {

    const [tarefas, setTarefas] = useState<ITarefa[]>([{ tarefa: 'pao', data: new Date(), concluida: true }, { tarefa: 'pao2', data: new Date(), concluida: false }])

    return (
        <>
            <div className='flex flex-row justify-between items-center mb-5'>
                <h1 className='text-2xl'>USUARIO TASKS</h1>
                <BotaoSair />
            </div>



            <div className="p-6 space-y-4">
                <Adicionar tipo="Tarefa" />

                <ul>
                    {tarefas.map(({ tarefa, data, concluida }) => {
                        return <Tarefa tarefa={tarefa} data={data} concluida={concluida} />
                    })}
                </ul>
            </div>
        </>
    )
}

export default Home