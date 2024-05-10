'use client'
import { useState , useEffect } from 'react';


const page = () => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue("Initial value");
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
    return (
        <div>
            <div className="bg-white w-full min-h-[calc(100vh-200px)] flex items-center justify-center rounded-lg ">
        <div className='flex justify-center px-8 py-4 text-center'>
          <div className='flex flex-col items-center gap-3'>
            <div className='relative w-max '>
                </div>
            <div>
              <div className="flex flex-col  sm:min-w-[350px] w-full mt-4 gap-4">
                
                <div className="relative w-full">
                  <input
                    type="email"
                    value={inputValue} onChange={handleChange}
                    id="useridField"
                    className="block font-medium focus:border-lightGray text-black pb-2.5 pt-4 w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    disabled
                  />
                  <label
                    for="useridField"
                    className="text-sm absolute text-lightGray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-lightGray peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Email
                  </label>
                </div>
                <div className="relative w-full">
                  <input
                    type="email"
                    value={inputValue} onChange={handleChange}
                    id="useridField"
                    className="block font-medium focus:border-lightGray text-black pb-2.5 pt-4 w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    disabled
                  />
                  <label
                    for="useridField"
                    className="text-sm absolute text-lightGray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-lightGray peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Name
                  </label>
                </div>
              </div>
              <div className="mt-3 max-w-[350px] w-full flex justify-start gap-2">
                <button className=" bg-green-600 w-[50%] px-5 py-2 rounded-lg text-white font-semibold">
                  Accept
                </button>
                <button className=" bg-red-600 w-[50%] px-5 py-2 rounded-lg text-white font-semibold">
                  Decline
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