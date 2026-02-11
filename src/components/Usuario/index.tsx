
import { useUser } from "@/contexts/UserContext";
import BotaoSair from "../BotaoSair";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";

const Usuario: React.FC = () => {

    const user = useUser()
    const userNome = user?.displayName || 'Usuario'
    const userFoto = user?.photoURL || "https://github.com/shadcn.png"

    console.log(userFoto)
    console.log(userNome)


    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className='flex flex-row justify-between items-center mb-5 '>
                <div className="flex flex-row">
                    <Avatar className="mr-3">
                        <AvatarImage
                            src={userFoto}
                            alt="imagem.perfil"

                        />
                    </Avatar>
                    <h1 className='text-2xl'>{userNome} Tarefas</h1>

                </div>

                <BotaoSair />
            </div>
        </>
    )
}

export default Usuario