
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
    cor: string
}

const Projeto: React.FC<Props> = ({ nome, data, concluida, expandido, cor }) => {
    return (
        <aside>
            <Card>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex flex-row  items-center gap-3 pl-2 pr-2 mb-2">
                                <Button variant="outline" size="icon" className=" p-3 cursor-pointer border border-black">
                                    <FaArrowDown />
                                </Button>
                                <p className="text-2xl flex-1">{nome}</p>
                                <p className="text-2xl flex-1">{data.toTimeString()}</p>
                                {concluida}
                                <Button variant="outline" size="icon" className="text-2xl flex-1  cursor-pointer border border-black"> Marcar como completo</Button>
                                {cor}
                                <Button variant="outline" size="icon" className=" p-3 cursor-pointer border border-black">
                                    <IoIosColorPalette />
                                </Button>
                                <Button variant="outline" size="icon" className=" p-3 cursor-pointer border border-black">
                                    <MdEdit />
                                </Button>
                                <Button variant="outline" size="icon" className=" p-3 cursor-pointer border border-black">
                                    <MdDelete />
                                </Button>
                                {expandido}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Adicionar tipo='tarefa' />
                            <div>
                                <Tarefa tarefa="Tarefa1" data={new Date()} concluida />
                                <Tarefa tarefa="Tarefa2" data={new Date()} concluida />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
        </aside>
    )
}

export default Projeto