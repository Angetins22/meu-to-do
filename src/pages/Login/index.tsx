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
import { useNavigate } from "react-router"

const Login: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="h-full w-full flex justify-center items-center flex-col">
            <h1 className="mb-5">Boa organização</h1>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Logue em sua conta</CardTitle>
                    <CardDescription>
                        Entre com sua conta do google
                    </CardDescription>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button variant="outline" className="w-full cursor-pointer" onClick={() => navigate('/home')}>
                        Login com google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login