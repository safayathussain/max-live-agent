import Image from "next/image";
import Link from "next/link";
import logo from '@/public/logo.svg'
import TextInput from "@/components/TextInput";


const page = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white mt-6 py-8 px-5 rounded-xl flex flex-col items-center w-96">
                <div className="flex justify-center mb-4">

                    <Image src={logo}></Image>
                </div>
                <div className="text-center">
                    <p className="text-xl font-semibold text-[#5C2D95]">Reset password</p>
                </div>
                <div className="flex flex-col max-w-[350px] w-full mt-8 gap-2">
                    {/* email */}
                    <div className="relative w-full">
                    <TextInput label={'Email'} name={'email'} id={'email'}/>
                    </div>
                    <div className="flex justify-end">
                        <Link className="text-xs text-primary underline" href="/login">Login?</Link>
                    </div>
                </div>
                <div className="mt-2 max-w-[350px] w-full ">
                    <button className=" bg-primary  w-full py-2 rounded-lg text-white font-semibold">
                        Send request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;
