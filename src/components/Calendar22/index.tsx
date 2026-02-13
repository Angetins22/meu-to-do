"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


interface Props {
    onDate: (data: Date | undefined) => void
    dataInicial: Date | undefined
    className?: string
}

const Calendar22: React.FC<Props> = ({ onDate, dataInicial, className = '' }) => {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(dataInicial)

    return (
        <div className={`flex flex-col gap-3 ${className}`} >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="md:w-48 w-full justify-between font-normal cursor-pointer "
                    >
                        {date ? date.toLocaleDateString() : "Selecionar data"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            onDate(date)
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div >
    )
}

export default Calendar22
