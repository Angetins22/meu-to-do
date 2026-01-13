import { Checkbox } from "@/components/ui/checkbox"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Props {
    tarefa: string
    data: Date
    concluida: boolean

}

const Tarefa: React.FC<Props> = ({ tarefa, data, concluida }) => {
    return (
        <aside>
            <Card className="flex flex-row items-center justify-between gap-4 p-5">
                <div className="flex flex-1 flex-row items-center justify-between">
                    <Checkbox className="cursor-pointer mr-10" />
                    <p className="text-xl flex-1">{tarefa} </p>
                    <p className="text-xl flex-1">{data.toTimeString()}</p>
                </div>
                {concluida}
                <div className="w-1/10">
                    <Button variant="ghost" size="icon" className="cursor-pointer mr-2">
                        <MdEdit />
                    </Button>
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                        <MdDelete />
                    </Button>
                </div>
            </Card>
        </aside>
    )
}

export default Tarefa