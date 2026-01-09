import { Button } from "@/components/ui/button"

const Login: React.FC = () => {
    return (
        <>
            <div>
                <h1 className="text-2xl">Logue, crie tasks ou projetos e farme aura!</h1>
            </div>
            <h2>Não precisa se cadastrar, basta entrar com sua conta google</h2>

            <div className="flex justify-center items-center h-screen">
                <Button className="cursor-pointer pr-10 pl-10 bg-black text-white " variant="outline">Login</Button>
            </div>
        </>
    )
}

export default Login