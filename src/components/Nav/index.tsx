import { useState } from "react";
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { useLocation, useNavigate } from "react-router";

const Nav: React.FC = () => {

    const location = useLocation();

    const navigate = useNavigate()

    const [cor, setCor] = useState(false)

    const handleClick = () => setCor(!cor)
    const handleNavClick = (nav: string) => {
        navigate(nav)

    }


    return (
        <div className="w-full flex justify-center md:px-2">
            <ButtonGroup className="flex-col gap-1 w-full md:flex-row md:gap-0 md:w-auto">
                <Button variant={location.pathname === '/projetos' ? "default" : "secondary"} size='lg' className='cursor-pointer w-full md:w-auto' onClick={() => handleNavClick('/projetos')}>Projetos</Button>
                <Button variant={location.pathname === '/home' ? "default" : "secondary"} size='lg' className='cursor-pointer w-full md:w-auto' onClick={() => handleNavClick('/home')}>Tarefas</Button>
                <Button variant={location.pathname === '/tarefas-completadas' ? "default" : "secondary"} size='lg' className='cursor-pointer w-full md:w-auto' onClick={() => handleNavClick('/tarefas-completadas')}>Tarefas Completadas</Button>
                <Button variant={location.pathname === '/projetos-completados' ? "default" : "secondary"} size='lg' className='cursor-pointer w-full md:w-auto' onClick={() => handleNavClick('/projetos-completados')}>Projetos Completados</Button>
            </ButtonGroup>
        </div>
    )

}

export default Nav