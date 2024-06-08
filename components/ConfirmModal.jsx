'use client'
import { useState } from 'react'
import React, { useEffect, useRef } from 'react'
import Modal from './Modal'
import useClickOutside from '@/hooks/useClickOutside'


const ConfirmModal = ({ title, open, setOpen, nextFunc = () => { } }) => {
    const ref = useRef()
    useClickOutside(ref, () => {
        setOpen(false)
    })
    return (
        <div>
            <Modal open={open} className={`!items-start mt-3 `}>
                <form ref={ref} className='bg-white p-5 rounded-lg min-w-[300px]'>
                    <p className='text-lg'>{title}</p>
                    <div className='flex gap-2 mt-5'>
                        <button onClick={() => {
                            setOpen(false)
                        }} className='py-1.5 w-full rounded-lg text-white bg-error'>Cancel</button>
                        <button onClick={() => {
                            nextFunc()
                            setOpen(false)
                        }} className='py-1.5 w-full rounded-lg text-white bg-success'>Confirm</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ConfirmModal