import FormLogin from "@/components/auth/form-login";
import { GoogleButton } from "@/components/ui/social-button";

const Login = () => {
  return (
<<<<<<< HEAD
    <div className='p-6 space-y-4 bg-[#008FCC] rounded-tl-[50px] rounded-br-[50px]'>
      <h1 className='text-2xl text-center font-semibold  text-white'>WELCOME BACK</h1>
      <p className="text-center text-white"> Sign in to your Hismaya account</p>
=======
    <div className='p-6 space-y-4'>
      <h1 className='text-2xl font-bold text-gray-900'>Sign In to your account</h1>
>>>>>>> origin/main
      <FormLogin />
      <div className="
          my-4 flex items-center 
          before:flex-1 before:border-t before:border-gray-300 
          after:flex-1 after:border-t after:border-gray-300
        "
      >
<<<<<<< HEAD
        <p className="mx-4 mb-0 text-center font-semibold text-white">Or</p>
=======
        <p className="mx-4 mb-0 text-center font-semibold text-gray-600">Or</p>
>>>>>>> origin/main
      </div>
      <GoogleButton />
    </div>
  )
}

export default Login
