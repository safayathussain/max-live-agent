"use client";
import Table from "@/components/Table";
import { FaBell } from "react-icons/fa";
import Modal from "@/components/Modal";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";

const page = () => {
    const [open, setopen] = useState(false)
    const openModal = () => {
        setopen(true)
    }
    const ref = useRef(null)
    useClickOutside(ref, () => {
        setopen(false);
    });
    return (
        <div>


            <div className="bg-white rounded-lg w-full pt-8  mt-6 ">
               <div className="flex items-center justify-between">
               <p className="text-xl px-10 pb-7 font-bold text-[#5C2D95]">Host list</p>
                <button
            onClick={openModal}
            className="border border-[#5C2D95] text-[#5C2D95] rounded-full px-2 mr-4 sm:mr-10 whitespace-nowrap mb-4 flex items-center gap-2"
          >
            <FaBell /> Request
          </button>
               </div>
                <Table actionFunc={openModal} />
                <Modal open={open} setOpen={setopen} >
                    <form ref={ref} className=''>
                        <div className="px-7 py-9 bg-white rounded-md  max-w-[400px] w-full  border-4 border-primary">
                            <div className="">

                                <p className="text-xl font-bold text-[#5C2D95]">Host Details</p>
                                <div className='grid grid-cols-2 w-full mt-5 gap-4'>
                                    <div className='p-4 bg-silver w-full rounded-md text-secondary'>
                                        <p className='text-sm'>Daily earnings</p>
                                        <p className='text-xl font-bold'>31,321</p>
                                    </div>
                                    <div className='p-4 bg-silver w-full rounded-md text-secondary'>
                                        <p className='text-sm'>Daily earnings</p>
                                        <p className='text-xl font-bold'>31,321</p>
                                    </div>
                                    <div className='p-4 bg-silver w-full rounded-md text-secondary'>
                                        <p className='text-sm'>Daily earnings</p>
                                        <p className='text-xl font-bold'>31,321</p>
                                    </div>
                                    <div className='p-4 bg-lightPink w-full rounded-md text-white'>
                                        <p className='text-sm'>Current earnings</p>
                                        <p className='text-xl font-bold'>31,321</p>
                                    </div>

                                </div>
                                <div className='bg-silver border border-primary p-4 mt-4'>
                                    <p className="text-xl font-bold text-[#5C2D95]">Host Details</p>

                                    <div className='mt-2 flex flex-col gap-1 text-sm'>
                                        <p>Agancy ID: Safayat Hussain</p>
                                        <p>Agency Name :: Safayat Hussain</p>
                                        <p>Total Host Salary : 12231</p>
                                        <p>Agancy ID: Safayat Hussain</p>
                                        <p>Agancy ID: Safayat Hussain</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>

                </Modal>
            </div>
        </div>
    );
};

export default page;