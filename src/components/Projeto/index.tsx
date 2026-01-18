
import { Button } from '../ui/button'
import { FaArrowDown, FaCheckCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from '../ui/card';
import Adicionar from '../Adicionar';
import Tarefa from '../Tarefa';


interface Props {
    nome: string
    data: Date
    concluida: boolean
    expandido: boolean
}

const Projeto: React.FC<Props> = ({ nome, data, concluida, expandido }) => {
    return (
        <aside>
            <Card className="flex flex-col  p-5">
                <div className='flex flex-row gap-7'>
                    <div className="flex flex-1 flex-row items-center justify-between">
                        <Button variant="outline" size="icon" className=" p-3 cursor-pointer">
                            <FaArrowDown />
                        </Button>
                        <p className="text-xl flex-1 ml-3">{nome}</p>
                        <p className="text-xl  flex-1">{data.toLocaleDateString()}</p>
                        {concluida}
                    </div>
                    <div className="flex items-end justify-between">
                        <Button variant="ghost" size="icon" className="ml-2 mr-2 cursor-pointer"><FaCheckCircle /></Button>
                        <Button variant="ghost" size="icon" className="cursor-pointer ">
                            <IoIosColorPalette />
                        </Button>
                        <Button variant="ghost" size="icon" className="cursor-pointer ">
                            <MdEdit />
                        </Button>
                        <Button variant="ghost" size="icon" className="cursor-pointer ">
                            <MdDelete />
                        </Button>
                    </div>
                    {expandido}
                </div>
                <Adicionar tipo='tarefa ao projeto' />
            </Card>
        </aside>
    )
}

export default Projeto