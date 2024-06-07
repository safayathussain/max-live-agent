"use client";
import { FaBell } from "react-icons/fa";
import Modal from "@/components/Modal";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";
import HostTable from "@/components/tables/HostTable.jsx";
import { useEffect } from "react";
import { FetchApi } from "@/utils/FetchApi";
import { getAuth } from "@/utils/functions";
import { store } from "@/redux/store";
import { useSelector } from "react-redux";

const page = () => {
    const [openReqModal, setOpenReqModal] = useState(false)
    const ref = useRef(null)
    const authState = useSelector(state => state.auth)
    useClickOutside(ref, () => {
        setOpenReqModal(false)
    });
    const auth = getAuth()
    const [data, setdata] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const d = await FetchApi({ url: '/agency/getAllPendingHostHandler', method: 'put', data: { role: 'AG' }, token: authState.user.sanitizedUser.accessToken })
            // setdata(d?.hosts?.filter(obj => obj.agencyId === auth.agencyId))
            console.log(d.hosts)
        }
        loadData()
    }, [])

    return (
        <div>
            <div className="bg-white rounded-lg w-full pt-8  mt-6 ">
                <div className="flex items-center justify-between">
                    <p className="text-xl px-10 pb-7 font-bold text-[#5C2D95]">Host list</p>
                    <button
                        onClick={() => setOpenReqModal(true)}
                        className="border border-[#5C2D95] text-[#5C2D95] rounded-md px-3 py-1.5 mr-4 sm:mr-10 whitespace-nowrap mb-4 flex items-center gap-2"
                    >
                        <FaBell /> Requests ({data.length})
                    </button>
                </div>
                <HostTable />

                <Modal open={openReqModal} setOpen={setOpenReqModal}>
                    <form ref={ref} className="">
                        {
                            data.length === 0 ? <p className="bg-white p-4  rounded-lg">0 Host request found</p> :
                                <div className="bg-white p-4 mt-6 rounded-lg">
                                    {data?.map((item, index) => (
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
                                                        Name: {item.firstName + ' ' + item.lastName}
                                                    </p>
                                                    <p className="text-xs text-grayColor">Email: {item.email}</p>
                                                </div>
                                            </div>
                                            <div>
                                                {/* <p className="text-[9px] text-lightGray text-end -mt-5">10 hours ago</p> */}
                                                <Link
                                                    href={`/dashboard/host/request/${item._id}`}
                                                    // as={`/dashboard/exchange-requests/request/${item.id}`}
                                                    className="text-[#5C2D95] font-bold text-xs mx-2 mt-5 underline"
                                                >
                                                    #{item.hostId}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        }

                    </form>
                </Modal>

            </div>
        </div>
    );
};

export default page;