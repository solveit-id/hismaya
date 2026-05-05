"use client"

import { useFormStatus } from "react-dom";

export const LoginButton = () => {
    const {pending} = useFormStatus();
    return (
        <button 
            type="submit"
            disabled={pending}
<<<<<<< HEAD
            className='w-full text-[#008FCC] bg-white font-medium rounded-[15px] px-5 py-2.5 text-center uppercase hover:bg-[#FFF19B]'
=======
            className='w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center uppercase hover:bg-blue-800'
>>>>>>> origin/main
        >
            {pending ? "Authenticating..." : "Sign In"}
        </button>
    )
}

export const RegisterButton = () => {
    const {pending} = useFormStatus();
    return (
        <button 
            type="submit"
            disabled={pending}
<<<<<<< HEAD
            className='w-full text-[#008FCC] bg-white font-medium rounded-[15px] px-5 py-2.5 text-center uppercase hover:bg-[#FFF19B]'
=======
            className='w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center uppercase hover:bg-blue-800'
>>>>>>> origin/main
        >
            {pending ? "Registering..." : "Register"}
        </button>
    )
}