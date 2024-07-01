'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FileUpload } from 'primereact/fileupload';
import SettingCard from '@/components/SettingCard';
import TextInput from '@/components/TextInput';
const page = () => {
  
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries');
      const data = await response.json();
      console.log(data);
      setCountries(data.data);
    };
    fetchData();
  }, []);

  const data = [
    {
      title: 'Total Video HOST',
      value: '26750',
    },
    {
      title: 'Monthly earnings => Video',
      value: '81',
    },
    {
      title: 'Weekly earning => Video',
      value: '$23,321',
    },
    {
      title: 'Daily Earnings => Video',
      value: '$23,432',
    },
    {
      title: 'Total Video HOST',
      value: '43242354',
    },
    {
      title: 'Monthly earnings => Video',
      value: '43',
    },
    {
      title: 'Weekly earning => Video',
      value: '$43,423',
    },
    {
      title: 'Daily Earnings => Video',
      value: '$23,432',
    },
  ]

  return (
    <div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
        {/*  */}
        {
          data.map((item, i) => <div key={i} className="bg-white flex px-8 py-4 rounded-xl  w-full">
            <div>
              <p className="font-medium whitespace-nowrap text-[#5C2D95]">
                {item.title}
              </p>
              <p className="text-3xl font-semibold text-[#5C2D95]">{item.value}</p>
            </div>
          </div>)
        }
      </div>
      <p className="text-xl text-[#5C2D95] font-bold my-8">
        Settings
      </p>
      <SettingCard/>
    </div>
  )
}

export default page