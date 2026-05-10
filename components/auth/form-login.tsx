"use client"

import { useFormState } from 'react-dom';
import { Link } from "@/lib/i18n/navigation"
import { signInCredentials } from '@/features/auth/action';
import { LoginButton } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const formLogin = () => {
  const [state, formAction] = useFormState(signInCredentials, null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (
        state?.success &&
        state?.redirectTo
    ) {
        router.push(
        state.redirectTo
        );
    }
    }, [state, router]);

  return (
    <div>
      <form action={formAction} className='space-y-6'>
        {state?.message ? (
            <div className='w-full h-screen p-4 mb-4 text-sm text-red-800 rounded-100px bg-red-100' role='alert'>
                <span className='font-medium'>{state?.message}</span>
            </div>
        ): null}
        <div>
            <label htmlFor="login" className='block mb-2 text-sm font-semibold text-white'>EMAIL OR PHONE</label>
            <input type="text" name="login" placeholder="example@gmail.com / 08123456789" className='bg-white border border-white text-gray-900 rounded-[15px] w-full p-2.5 justify-center' />
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.login}</span>
            </div>
        </div>
        <div className='relative'>
            <label htmlFor="password" className='block mb-2 text-sm font-semibold text-white'>PASSWORD</label>
            <input type={showPassword ? "text":"password"} name="password" placeholder="********" className='bg-white border border-white text-gray-900 rounded-[15px] w-full p-2.5' />
            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-[38px]'>{showPassword ? "🙈" : "👁️"}</button>
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.password}</span>
            </div>
        </div>
        <LoginButton />
        <p className='text-sm font-semibold text-white'>Don&apos;t have an account yet?
            <Link href="/register"><span className='font-semibold pl-1 text-[#FFF19B] hover:text-[#FAB95B]'>Sign Up here</span></Link>
        </p>
      </form>
    </div>
  ) 
}

export default formLogin
