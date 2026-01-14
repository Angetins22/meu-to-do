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
        <div className="w-full flex justify-center">
            <ButtonGroup>
                <Button variant={location.pathname === '/projetos' ? "default" : "secondary"} size='lg' className='cursor-pointer' onClick={() => handleNavClick('/projetos')}>Projetos</Button>
                <Button variant={location.pathname === '/home' ? "default" : "secondary"} size='lg' className='cursor-pointer' onClick={() => handleNavClick('/home')}>Tarefas</Button>
                <Button variant={location.pathname === '/tarefas-completadas' ? "default" : "secondary"} size='lg' className='cursor-pointer' onClick={() => handleNavClick('/tarefas-completadas')}>Tarefas Completadas</Button>
                <Button variant={location.pathname === '/projetos-completados' ? "default" : "secondary"} size='lg' className='cursor-pointer' onClick={() => handleNavClick('/projetos-completados')}>Projetos Completados</Button>
            </ButtonGroup>
        </div>
    )

}

export default Nav