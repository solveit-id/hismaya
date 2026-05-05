"use client"

import { useTransition } from "react";
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { signUpCredentials } from "@/lib/action";
import { RegisterButton } from '@/components/ui/button';
import { useState } from "react";

const formRegister = () => {
  const [state, formAction] = useFormState(signUpCredentials, null);
  const [pending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  return (
    <div>
      <form
        action={(formData) =>
            startTransition(() => formAction(formData))
        }
        className='space-y-6'
      >
        {state?.message ? (
            <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100' role='alert'>
                <span className='font-medium'>{state?.message}</span>
            </div>
        ): null}
        <div>
            <label htmlFor="name" className='block mb-2 text-sm font-medium text-white'>Name</label>
            <input type="text" name="name" placeholder="Full Name" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-[15px] w-full p-2.5' />
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.name}</span>
            </div>
        </div>
        <div>
            <label htmlFor="email" className='block mb-2 text-sm font-medium text-white'>Email</label>
            <input type="email" name="email" placeholder="example@gmail.com" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-[15px] w-full p-2.5' />
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.email}</span>
            </div>
        </div>
        <div className="relative">
            <label htmlFor="password" className='block mb-2 text-sm font-medium text-white'>Password</label>
            <input type={showPassword ? "text" : "password"} name="password" placeholder="********" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-[15px] w-full p-2.5' />
            <button type="button" onClick={()=> setShowPassword(!showPassword)} className="absolute right-3 top-[38px]"> {showPassword ? "🙈" : "👁️"}</button>
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.password}</span>
            </div>
        </div>
        <div className="relative">
            <label htmlFor="ConfirmPassword" className='block mb-2 text-sm font-medium text-white'>Confirm Password</label>
            <input type={showConfirmPassword ? "text": "password"} name="ConfirmPassword" placeholder="********" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-[15px] w-full p-2.5' />
            <button type="button" onClick={()=> setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-[38px]">{showConfirmPassword ?"🙈" : "👁️"} </button>
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.ConfirmPassword}</span>
            </div>
        </div>
        <RegisterButton />
        <p className='text-sm font-light text-white'>Already have an account?
            <Link href="/login"><span className='font-medium pl-1 text-[#FFF19B] hover:text-[#FAB95B]'>Sign In</span></Link>
        </p>
      </form>
    </div>
  )
}

export default formRegister
