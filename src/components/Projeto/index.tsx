
import { Button } from '../ui/button'
import { FaArrowDown } from "react-icons/fa";
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
            <Card className="flex flex-row items-center gap-4 p-5">
                <div className="flex flex-1 flex-row items-center justify-between">
                    <Button variant="outline" size="icon" className=" p-3 cursor-pointer border border-black">
                        <FaArrowDown />
                    </Button>
                    <p className="text-xl flex-1 ml-3">{nome}</p>
                    <p className="text-xl ">{data.toTimeString()}</p>
                    {concluida}
                </div>
                <div className="flex items-end justify-between">
                    <Button variant="ghost" size="icon" className="ml-2 mr-2 cursor-pointer">completar</Button>
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
                <Adicionar tipo='tarefa ao projeto' />
            </Card>
        </aside>
    )
}

export default Projeto