'use client'
import TextInput from '@/components/TextInput';
import { useState, useEffect } from 'react';


const page = () => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue("Initial value");
  }, []);

  
  return (
    <div>
      <div className="bg-white w-full min-h-[calc(100vh-200px)] flex items-center justify-center rounded-lg ">
        <div className='flex justify-center px-8 py-4'>
          <div className='flex flex-col items-center gap-3'>
            <div className='relative w-max '>
            </div>
            <div>
              <div className="flex flex-col  sm:min-w-[350px] w-full mt-4 gap-4">

                <div className="relative w-full">
                <TextInput label={'Initial value'} name={'value'} id={'value'}/>
                </div>
                <div className="relative w-full">
                <TextInput label={'Initial value'} name={'value'} id={'value'}/>
                </div>
              </div>
              <div className="mt-3 max-w-[350px] w-full flex justify-start gap-2">
                <button className=" bg-red-600 w-[50%] px-5 py-2 rounded-lg text-white font-semibold">
                  Decline
                </button>
                <button className=" bg-green-600 w-[50%] px-5 py-2 rounded-lg text-white font-semibold">
                  Accept
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