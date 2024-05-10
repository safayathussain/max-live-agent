import Image from "next/image";
import Link from "next/link";
import logo from '@/public/logo.svg'


const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white mt-6 py-8 px-5 rounded-xl flex flex-col items-center w-96">
        <div className="flex justify-center mb-4">
          <Image src={logo}></Image>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-[#5C2D95]">Please Login</p>
        </div>
        <div className="flex flex-col max-w-[350px] w-full mt-8 gap-4">
          {/* email */}
          <div className="relative w-full">
            <input
              type="email"
              id="emailField"
              className="block font-medium focus:border-lightGray text-black px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label
              htmlFor="emailField"
              className="text-sm absolute text-lightGray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-lightGray peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Email
            </label>
          </div>
          {/* password */}
          <div className="relative w-full">
            <input
              type="password"
              id="passField"
              className="block font-medium focus:border-lightGray text-black px-2.5 pt-4 w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label
              htmlFor="passField"
              className="text-sm absolute text-lightGray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-lightGray peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Password
            </label>
          </div>
          <div className="flex justify-end">
            <Link className="text-xs text-primary underline" href="/reset-password">Reset Password?</Link>
          </div>
        </div>
        <div className="mt-2 max-w-[350px] w-full ">
          <button className=" bg-primary  w-full py-2 rounded-lg text-white font-semibold">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
