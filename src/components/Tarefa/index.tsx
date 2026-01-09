import { Checkbox } from "@/components/ui/checkbox"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button"

export default function Tarefa(props: any) {
    return <aside>
        <div className="flex flex-row border-2 border-black rounded-sm items-center gap-3 pl-2 pr-2">
            <Checkbox className="p-3 cursor-pointer border border-black" />
            <p className="text-2xl flex-1">{props.tarefa} </p>
            <p className="text-2xl flex-1">{props.data}</p>
            {props.concluida}
            <Button variant="outline" size="icon" className=" p-5 cursor-pointer border border-black">
                <MdEdit />
            </Button>
            <Button variant="outline" size="icon" className=" p-5 cursor-pointer border border-black">
                <MdDelete />
            </Button>
        </div>
    </aside>
}