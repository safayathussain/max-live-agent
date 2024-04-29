'use client'
import { primaryColor } from '@/constants/color'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiMenu } from 'react-icons/hi';
import logo from '@/public/logo.svg'

const Navbar = () => {

    return (
        <div className='lg:ml-[255px] lg:max-w-[calc(100vw-255px)] w-full'>
            <div className='bg-primary px-1 md:px-8  lg:px-14 py-5 w-full flex justify-between items-center'>
                <p className=' text-sm sm:text-md sm:whitespace-nowrap md:text-lg font-semibold text-white '>MAX LIVE Admin DASHBOARD</p>
                <div className='flex items-center gap-1 md:gap-3 min-w-[45vw] justify-end'>
                    <div className=' flex flex-col items-end gap-1'>
                        <p className='font-medium leading-4 text-white'>safayat</p>
                        <p className=' font-light text-xs whitespace-nowrap md:text-sm  text-white text-end leading-tight md:leading-3'>super administrator</p>
                    </div>
                    <div>
                        <Image className='rounded-full  size-10 md:size-[64px]' src={logo} width={64} height={64}></Image>
                    </div>
                    <div>
                        <button className='rounded-full hidden lg:block bg-white border border-error text-error px-2 py-1 md:px-4 md:py-2 text-xxs whitespace-nowrap md:text-sm font-medium'>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar