import Tarefa from '@/components/Tarefa'
import { Button } from '../ui/button'
import { FaArrowDown } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import Adicionar from "@/components/Adicionar"

export default function Projeto(props: any) {
    return <aside>
        <div className="flex flex-row  border-2 border-black rounded-sm items-center gap-3 pl-2 pr-2 mb-2">
            <Button variant="outline" size="icon" className=" p-3 cursor-pointer border border-black">
                <FaArrowDown />
            </Button>
            <p className="text-2xl flex-1">{props.nome}</p>
            <p className="text-2xl flex-1">{props.data}</p>
            {props.concluida}
            <Button variant="outline" size="icon" className="text-2xl flex-1  cursor-pointer border border-black"> Marcar como completo</Button>
            {props.cor}
            <Button variant="outline" size="icon" className=" p-3 cursor-pointer border border-black">
                <IoIosColorPalette />
            </Button>
            <Button variant="outline" size="icon" className=" p-3 cursor-pointer border border-black">
                <MdEdit />
            </Button>
            <Button variant="outline" size="icon" className=" p-3 cursor-pointer border border-black">
                <MdDelete />
            </Button>
            {props.expandido}
        </div>
    </aside>
}