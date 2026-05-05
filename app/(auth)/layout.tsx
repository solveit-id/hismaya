<<<<<<< HEAD
"use client"
import {motion} from "framer-motion"

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
         <motion.div
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease:"easeIn" }} 
        className="w-full max-w-lg px-6 py-8"
      >
        {children}
      </motion.div>
=======
const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-between px-6 py-8 mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow mt-0 max-w-md">
            {children}
        </div>
>>>>>>> origin/main
      </div>
    </div>
  )
}

export default AuthLayout
