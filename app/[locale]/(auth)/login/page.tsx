import FormLogin from "@/components/auth/form-login";
import { GoogleButton } from "@/components/ui/social-button";

const Login = () => {
  return (
    <div className='p-6 space-y-4 bg-[#008FCC] rounded-tl-[50px] rounded-br-[50px]'>
      <h1 className='text-2xl text-center font-semibold  text-white'>WELCOME BACK</h1>
      <p className="text-center text-white"> Sign in to your Hismaya account</p>
      <FormLogin />
      <div className="
          my-4 flex items-center 
          before:flex-1 before:border-t before:border-gray-300 
          after:flex-1 after:border-t after:border-gray-300
        "
      >
        <p className="mx-4 mb-0 text-center font-semibold text-white">Or</p>
      </div>
      <GoogleButton />
    </div>
  )
}

export default Login