'use client'
import TextInput from '@/components/TextInput';
import { FetchApi } from '@/utils/FetchApi';
import { capitalizeAllWords } from '@/utils/functions';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';


const page = ({ query }) => {
  const [inputValue, setInputValue] = useState('');
  const [data, setdata] = useState({})
  const { id } = useParams()
  useEffect(() => {
    const loadData = async () => {
      const d = await FetchApi({ url: `/user/getUserById/${id}` })
      setdata(d.data.user)
    }
    loadData()
  }, []);
  const [profileData, setProfileData] = useState({});
  const [nidFront, setnidFront] = useState('')
  const [nidBack, setnidBack] = useState('')
  useEffect(() => {
    setProfileData({
      name: (data.firstName + ' ' + data.lastName) || '',
      email: data.email || '',
      userId: data._id || '',
      hostId: data.hostId || '',
      country: data.country || '',
      isActive: (data.isActive ? 'Yes' : 'No') || '',
      isVerified: (data.isVerified ? 'Yes' : 'No') || '',
    })
    console.log(data)
    setnidFront('https://max.syscomatic.com/api/v1/' + (data?.nidFront || ''))
    console.log(nidFront)
    setnidBack(process.env.NEXT_PUBLIC_BASE_API + data?.nidBack || '')
  }, [data])
  const handleAcceptHost = async () => {
    const d = await FetchApi({ url: `/agency/approveHostHandler/${profileData.userId}`, method: 'post', data: { role: 'AG' }, callback: () => { toast.success('Host approved successfully') } })
  }
  return (
    <div>
      <div className="bg-white w-full min-h-[calc(100vh-200px)] flex items-center justify-center rounded-lg ">
        <div className='flex justify-center px-8 py-4'>
          <div className='flex flex-col items-center gap-3'>
            <div className='relative w-max '>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:min-w-[380px] w-full mt-4 gap-4'>
              {Object.keys(profileData).map((key) => (
                <div className="relative w-full" key={key}>
                  <TextInput
                    label={capitalizeAllWords(key.replace(/([A-Z])/g, ' $1').trim())}
                    value={profileData[key]}
                    name={key}
                    id={`id${key}`}
                    disabled
                  />
                </div>
              ))}
            </div>
            <div>
              {/* <Image src={nidFront} alt='' width={100} height={100}></Image> */}
            </div>
            <div className="mt-3  w-full flex justify-center gap-2">
              {/* <button className=" bg-red-600 w-[50%] px-5 py-2 rounded-lg text-white font-semibold">
                  Decline
                </button> */}
              <button onClick={handleAcceptHost} className=" bg-green-600 w-[50%] px-5 py-2 rounded-lg text-white font-semibold">
                Accept
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
