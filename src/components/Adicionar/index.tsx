import { IoAddCircle } from "react-icons/io5";
import Calendar22 from "@/components/Calendar22"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Props {
    tipo: string
}

const Adicionar: React.FC<Props> = ({ tipo }) => {
    return (
        <aside className="w-full mb-10">
            <p className="text-2xl items-start mb-5">Adicionar {tipo}</p>
            <div className="flex flex-row gap-3 items-center">
                <Input type="text" placeholder="Nome" />
                <Calendar22 />
                <Button variant="outline" size="icon" className="cursor-pointer">
                    <IoAddCircle />
                </Button>
            </div>
        </aside>
    )
}

export default Adicionar