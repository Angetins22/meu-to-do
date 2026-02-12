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
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const Login: React.FC = () => {
    const navigate = useNavigate()

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        try {
            const result = await signInWithPopup(auth, provider)
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential === null) throw new Error('credencial nula')
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            navigate('/home')
        } catch (error: any) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            alert('erro no login')
        }

        /*signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });*/
    }

    return (
        <div className="h-full w-full flex justify-center items-center flex-col">
            <h1 className="mb-5">Obrigado pela escolha e boa organização!!!</h1>
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
                    <Button variant="outline" className="w-full cursor-pointer" onClick={() => login()}>
                        Login com google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login