'use client'
import Image from "next/image";
import Link from "next/link";
import logo from '@/public/logo.svg'
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/redux/slices/AuthSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, loginUser } from "@/utils/functions";
import TextInput from "@/components/TextInput";


const page = () => {

  const router = useRouter()
  const auth = getAuth()
  if (auth.role === 'AG') return router.push('/dashboard/')
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.pass.value
    await loginUser(email, password, () => router.push('/dashboard/'))
  }
  
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white mt-6 py-8 px-5 rounded-xl flex flex-col items-center w-96">
        <div className="flex justify-center mb-4">
          <Image src={logo}></Image>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-[#5C2D95]">Please Login</p>
        </div>
        <div className="flex flex-col max-w-[350px] w-full mt-8 gap-2">
          {/* email */}
          <div className="relative w-full">
          <TextInput label={'Email'} name={'email'} id={'email'}/>
          </div>
          {/* password */}
          <div className="relative w-full">
          <TextInput label={'Password'} name={'password'} id={'pass'}/>
          </div>
          <div className="flex justify-end">
            <Link className="text-xs text-primary underline" href="/reset-password">Reset Password?</Link>
          </div>
        </div>
        <div className="mt-2 max-w-[350px] w-full ">
          <button type="submit" className=" bg-primary  w-full py-2 rounded-lg text-white font-semibold">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
