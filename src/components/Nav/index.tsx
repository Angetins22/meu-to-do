import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"

const Nav: React.FC = () => {

    return (
        <div className="w-full flex justify-center">
            <ButtonGroup>
                <Button size='lg' className='cursor-pointer'>Projetos</Button>
                <Button variant="secondary" size='lg' className='cursor-pointer'>Tarefas</Button>
                <Button variant="secondary" size='lg' className='cursor-pointer'>Tarefas Completadas 2</Button>
                <Button variant="secondary" size='lg' className='cursor-pointer'>Projetos Completados</Button>
            </ButtonGroup>
        </div>
    )

}

export default Nav