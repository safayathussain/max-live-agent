'use client'
import Link from "next/link";
import logo from '@/public/logo.svg'
import Image from "next/image";
import { loginUser, useAuth } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FetchApi } from "@/utils/FetchApi";
import TextInput from "@/components/TextInput";


const page = () => {
  const router = useRouter()
  const { auth } = useAuth()
  if (auth?.role === 'AG') return router.push('/dashboard')
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const res = await FetchApi({url: '/admin/reset-password', method: 'patch', data: {email, role: 'AG'}, isToast: true, callback: () => {
      router.push('/login')
    }})
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white mt-6 py-8 px-5 rounded-xl flex flex-col items-center w-96">
        <div className="text-center">
          <Image src={logo} alt="logo" className="flex justify-center mx-auto" />
          <p className="text-xl font-semibold text-[#5C2D95] my-4">Password Reset</p>
        </div>
        <div className="flex flex-col max-w-[350px] w-full gap-4">
          {/* email */}
          <div className="relative w-full">
            <TextInput label={'Email'} name={'email'} id={'emailField'} type="email" />
          </div>

          <div className="flex justify-end">
            <Link className="text-xs font-semibold text-primary underline" href="/login">Login?</Link>
          </div>
        </div>
        <div className="mt-2 max-w-[350px] w-full ">
          <button type="submit" className=" bg-primary  w-full py-2 rounded-lg text-white font-semibold">
            Send Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
