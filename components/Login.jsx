import Image from "next/image"
import { signIn } from 'next-auth/client'
import Button from "@material-tailwind/react/Button"

function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Image src="/assets/docs.png" height={300} width={550} objectFit="contain" />
            <Button color="blue" buttonType="filled" ripple="light" className="w-44 mt-10 text-xl" onClick={() => signIn('google')}>
                Login
            </Button>
        </div>
    )
}

export default Login
