import Image from 'next/image';
import logo from '@/public/logo.svg'
import Link from 'next/link';


const page = () => {


  return (
    <div>
      <div className="bg-white w-full min-h-[calc(100vh-200px)] flex items-center justify-center rounded-lg ">
        <div className='flex justify-center px-8 py-4 text-center'>
          <div>
            <p className='text-xl text-grayColor'>Your Profile</p>
            <Image src={logo} className='size-20 rounded-full mx-auto mt-4'></Image>
            <div>
              <div className="flex flex-col  sm:min-w-[350px] w-full mt-8 gap-4">
                <div class="relative w-full">
                  <input
                    type="email"
                    id="useridField"
                    className="block font-medium focus:border-lightGray text-black pb-2.5 pt-4 w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="useridField"
                    className="text-sm absolute text-lightGray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-lightGray peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Your Email
                  </label>
                </div>
                <div class="relative w-full">
                  <input
                    type="email"
                    id="useridField"
                    className="block font-medium focus:border-lightGray text-black pb-2.5 pt-4 w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="useridField"
                    className="text-sm absolute text-lightGray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-lightGray peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Your Email
                  </label>
                </div>
                <div class="relative w-full">
                  <input
                    type="email"
                    id="useridField"
                    className="block font-medium focus:border-lightGray text-black pb-2.5 pt-4 w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="useridField"
                    className="text-sm absolute text-lightGray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-lightGray peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Your Email
                  </label>
                </div>
                <div class="relative w-full">
                  <input
                    type="email"
                    id="useridField"
                    className="block font-medium focus:border-lightGray text-black pb-2.5 pt-4 w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="useridField"
                    className="text-sm absolute text-lightGray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-lightGray peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Your Email
                  </label>
                </div>
              </div>
              <div className="mt-3 max-w-[350px] w-full flex justify-start">
                <button className=" bg-primary  px-5 py-2 rounded-lg text-white font-semibold">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
