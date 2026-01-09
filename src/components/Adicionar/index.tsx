import { IoAddCircle } from "react-icons/io5";
import Calendar22 from "@/components/Calendar22"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Adicionar(props: any) {
    return <aside>
        <div className="border-2 border-black rounded-sm">
            <p className="text-2xl items-start">Adicionar {props.tipo}</p>
            <br />
            <div className="pl-2 pr-2 flex flex-row gap-3 items-center">
                <Input type="text" placeholder="Nome" className="border border-black" />
                <Calendar22 />
                <Button variant="outline" size="icon" className="rounded-full p-5 cursor-pointer border border-black">
                    <IoAddCircle />
                </Button>
            </div>
        </div>
    </aside>
}