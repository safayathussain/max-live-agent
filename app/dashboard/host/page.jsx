"use client";
import { FaBell } from "react-icons/fa";
import Modal from "@/components/Modal";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";
import HostTable from "@/components/tables/HostTable.jsx";

const page = () => {
    const [openReqModal, setOpenReqModal] = useState(false)
    const ref = useRef(null)
    useClickOutside(ref, () => {
        setOpenReqModal(false)
    });
    const data = Array.from({ length: 4 }, (_, index) => ({
        id: 564653148 + index,
        email: 'safayat@gmail.com',
        name: "Safayat",
      }));
    return (
        <div>
            <div className="bg-white rounded-lg w-full pt-8  mt-6 ">
                <div className="flex items-center justify-between">
                    <p className="text-xl px-10 pb-7 font-bold text-[#5C2D95]">Host list</p>
                    <button
                        onClick={() => setOpenReqModal(true)}
                        className="border border-[#5C2D95] text-[#5C2D95] rounded-md px-3 py-1.5 mr-4 sm:mr-10 whitespace-nowrap mb-4 flex items-center gap-2"
                    >
                        <FaBell /> Requests (1)
                    </button>
                </div>
                <HostTable />
                
                <Modal open={openReqModal} setOpen={setOpenReqModal}>
                    <form ref={ref} className="">
                        <div className="bg-white p-4 mt-6 rounded-lg">
                            {data.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex p-2 gap-5 bg-[#EEF0F6] rounded-md border-[#5C2D95] border border-opacity-50 items-center justify-between mb-2"
                                >
                                    <div className="flex items-center">
                                        <div>
                                            <Image src={logo} className="size-14" />
                                        </div>
                                        <div className="ml-2 text-[#5C2D95]">
                                            <p className="text-sm font-medium">
                                                Name: {item.name}
                                            </p>
                                            <p className="text-xs text-grayColor">Email: {item.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                    <p className="text-[9px] text-lightGray text-end -mt-5">10 hours ago</p>
                                        <Link
                                            href={`/dashboard/host/request/${item.id}`}
                                            // as={`/dashboard/exchange-requests/request/${item.id}`}
                                            className="text-[#5C2D95] font-bold text-xs mx-2 mt-5 underline"
                                        >
                                            {item.id}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </form>
                </Modal>
               
            </div>
        </div>
    );
};

export default page;