'use client'
import Image from 'next/image'
import { FileUpload } from 'primereact/fileupload'
import React, { useState } from 'react'
import logo from '@/public/logo.svg'
import '@/app/dashboard/prime-react.css'
import TextInput from '@/components/TextInput';
import SelectInput from './SelectInput'

const SettingCard = () => {
    const [showUploadField, setShowUploadField] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log({
            agency: formData.get('agency'),
            country: formData.get('country'),
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='bg-white flex px-8 py-8 rounded-xl gap-3 flex-col w-max min-w-[350px] '>
                <div className='relative w-max'>
                    <Image src={logo} alt='' className='rounded-full'></Image>
                    <button className='bg-error rounded-full flex justify-center items-center size-7 absolute right-2 top-[70%]' onClick={() => setShowUploadField(!showUploadField)}>
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2336 10.6827C13.2336 10.9866 13.1128 11.278 12.898 11.4929C12.6831 11.7078 12.3916 11.8285 12.0877 11.8285H1.77912C1.47523 11.8285 1.18379 11.7078 0.968904 11.4929C0.754021 11.278 0.633301 10.9866 0.633301 10.6827V4.38183C0.6337 4.0782 0.754596 3.78715 0.969436 3.57259C1.18428 3.35803 1.47549 3.23752 1.77912 3.23752H4.07001L5.21507 1.51917H8.65178L9.7976 3.23752H12.0885C12.392 3.23772 12.683 3.35832 12.8977 3.57285C13.1124 3.78739 13.2332 4.07833 13.2336 4.38183V10.6827Z" fill="#EE6093" stroke="white" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.22435 7.24624C9.22435 7.69933 9.09 8.14225 8.83827 8.51899C8.58654 8.89572 8.22876 9.18935 7.81015 9.36274C7.39155 9.53613 6.93092 9.5815 6.48654 9.49311C6.04215 9.40471 5.63395 9.18653 5.31356 8.86614C4.99318 8.54575 4.77499 8.13756 4.6866 7.69317C4.5982 7.24878 4.64357 6.78816 4.81696 6.36955C4.99035 5.95095 5.28398 5.59316 5.66072 5.34144C6.03745 5.08971 6.48037 4.95535 6.93347 4.95535C7.54105 4.95535 8.12374 5.19671 8.55337 5.62634C8.98299 6.05596 9.22435 6.63866 9.22435 7.24624Z" fill="#EE6093" stroke="white" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="card">
                        {
                            showUploadField && <FileUpload mode='basic' name="demo[]" url={'/api/upload'} accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                        }
                    </div>
                </div>
                <div className="relative w-full">
                    <TextInput label={'Agency Name'} name={'Search'} id={'idSearch'} />
                </div>
                <div className="relative w-full">
                    <SelectInput options={[
                        {
                            name: 'Bangladesh',
                            value: 'BD'
                        },
                        {
                            name: 'India',
                            value: 'IND'
                        },
                        {
                            name: 'Pakistan',
                            value: 'PAK'
                        },
                    ]} label={'Country Name'} name={'Search'} id={'idSearch'} />
                </div>
                <button type="submit" className='px-4 py-1 rounded-md bg-[#F5AAE9] text-base font-medium text-white w-max'>
                    Save
                </button>
            </div>
        </form>
    )
}

export default SettingCard
