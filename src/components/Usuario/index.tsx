
import BotaoSair from "../BotaoSair";


const Usuario: React.FC = () => {


    return (
        <>
            <div className='flex flex-row justify-between items-center mb-5'>
                <h1 className='text-2xl'>USUARIO TASKS</h1>
                <BotaoSair />
            </div>
        </>
    )
}

export default Usuario