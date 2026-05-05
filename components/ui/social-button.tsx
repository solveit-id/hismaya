import { IoLogoGoogle } from "react-icons/io5";
import { signIn } from "@/auth";

export const GoogleButton = () => {
    return (
        <form action={async() => {
            "use server";
            await signIn("google", { redirectTo: "/redirect" });
        }}>
            <button type="submit" className="flex items-center justify-center gap-1 py-2.5 rounded-full uppercase text-[#008FCC] font-medium text-sm bg-white w-full hover:bg-[#FFF19B]">
                <IoLogoGoogle />
                Sign In with Google
            </button>
        </form>
    )
}