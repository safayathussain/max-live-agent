"use client";

import { useEffect, useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Modal from "@/components/Modal";
import ConfirmModal from "../ConfirmModal";
import { FetchApi } from "@/utils/FetchApi";
import TextInput from '@/components/TextInput';
import { getAuth, getUserLevel, loadLevelData, useAuth } from "@/utils/functions";
import SelectInput from "../SelectInput";
import AcceptHostModal from "../AcceptHostModal";
import { SortIcon } from "../combinedComponents";
import { CgEye } from "react-icons/cg";
import toast from "react-hot-toast";
export default function HostTable({ type }) {

    // confirm modal
    const [confModalOpen, setconfModalOpen] = useState(false)
    const [confModalTitle, setConfModalTitle] = useState('')
    const [confNextFunc, setConfNextFunc] = useState(() => { })
    // 
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [actionModalOpen, setActionModalOpen] = useState(false)
    const [selectedUser, setselectedUser] = useState({})
    const [refetch, setrefetch] = useState(0)
    const {auth, token} = useAuth()
    const loadData = async () => {
        await loadLevelData()
        if (type === 'hosts') {
            const { data } = await FetchApi({ url: `/agency/hosts?agencyId=${auth.agencyId}` })
            setUsers(data?.hosts|| [])
        } else if (type === 'requests') {
            const d = await FetchApi({ url: '/agency/getAllPendingHostHandler', method: 'put', data: { role: 'AG' }})
            console.log(d)
            if(Array.isArray(d.data)){
                setUsers(d?.data?.filter(obj => obj.agencyId === auth.agencyId))
            }else{
                setUsers([])
            }
        }
    }
    useEffect(() => {
        loadData()
    }, [refetch])
    let searchedUsers = users?.filter((user) =>
        user.maxId.includes(searchTerm)
    );
    const ref = useRef(null);
    useClickOutside(ref, () => {
        setOpen(false);
        if (!confModalOpen) {
            setActionModalOpen(false)
        }
    });

    // Function to handle sorting
    const handleSort = (key) => {
        if (key === sortBy) {
            // Toggle sorting order if clicking on the same key
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Set new sorting key
            setSortBy(key);
            setSortOrder("asc");
        }
    };

    if (sortBy) {
        searchedUsers = searchedUsers?.sort((a, b) => {
            const compareA = a[sortBy];
            const compareB = b[sortBy];
            if (compareA < compareB) {
                return sortOrder === "asc" ? -1 : 1;
            }
            if (compareA > compareB) {
                return sortOrder === "asc" ? 1 : -1;
            }
            return 0;
        })
    }

    // Pagination
    const showingText = `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${((currentPage - 1) * itemsPerPage) < Math.ceil(searchedUsers?.length / itemsPerPage) ? (currentPage * itemsPerPage) : searchedUsers.length} of ${searchedUsers.length}`;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = searchedUsers?.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handleActions = (nextFunc, title) => {
        setConfNextFunc(() => nextFunc)
        setConfModalTitle(`Are you sure to ${title}`);
        setconfModalOpen(true)
    }
    //  handle functions
    const handleSendAssets = async (e) => {
        e.preventDefault()
        const {amount, CAmount} = e.target;
        if(amount.value !== CAmount.value) return toast.error("Amount and the Confirmed amount don't match")
        await FetchApi({
            url: 'bean/send-beans-to-host', method: 'patch', isToast: true, data: {
                agencyId: auth._id,
                hostId: selectedUser.maxId,
                amount: Number(amount.value),
                assetType: 'beans'
            },
            callback: () => {
                setrefetch(Math.random())
                setActionModalOpen(false)
            }
        },
        )
    }
    const handleBlockHost = async () => {
        await FetchApi({
            url: 'agency/declined', method: 'post', isToast: true, data: {
                adminId: auth.userId,
                hostId: selectedUser._id
            },
            callback: () => {
                setrefetch(Math.random())
                setActionModalOpen(false)
            }
        },
        )
    }
    const handleUnblockHost = async () => {
        await FetchApi({
            url: 'agency/unblock-host', method: 'put', isToast: true, data: {
                adminId: auth.userId,
                hostId: selectedUser._id
            },
            callback: () => {
                setrefetch(Math.random())
                setActionModalOpen(false)
            }
        },
        )

    }
    const handleDeleteHost = async () => {
        await FetchApi({
            url: `host/${selectedUser._id}`, method: 'delete', isToast: true,
            callback: () => {
                setrefetch(Math.random())
                setActionModalOpen(false)
            }
        },
        )

    }
    return (
        <div className=" overflow-hidden mx-8">
            <div className="flex flex-col md:flex-row items-center justify-between  pb-4">
                <div className="w-full md:w-1/2 py-1">
                    <form className="flex items-center">
                        <div className="relative w-full">
                            <TextInput onChange={(e) => setSearchTerm(e.target.value)} placeholder={'Search By Id'} name={'Search'} id={'idSearch'} />
                        </div>
                    </form>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 whitespace-nowrap ">
                    <thead className="text-xs text-lightGray uppercase  bg-white">
                        <tr>
                            {/* <th className="pl-4 py-3 cursor-pointer">
                    <input type="checkbox" name="" id="" />
                  </th> */}
                            <th
                                className="px-4 py-3 cursor-pointer "
                                onClick={() => handleSort("hostId")}
                            >
                                <div>
                                    <span className=" flex items-center font-medium">
                                        host id
                                        <SortIcon />
                                    </span>
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer "
                                onClick={() => handleSort("fullName")}
                            >
                                <div>
                                    <span className=" flex items-center font-medium">
                                        Full Name
                                        <SortIcon />
                                    </span>
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer "
                                onClick={() => handleSort("_id")}
                            >
                                <div>
                                    <span className=" flex items-center font-medium">
                                        user id
                                        <SortIcon />
                                    </span>
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer "
                                onClick={() => handleSort("email")}
                            >
                                <div>
                                    <span className=" flex items-center font-medium">
                                        Email
                                        <SortIcon />
                                    </span>
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("hostType")}
                            >
                                <span className=" flex items-center font-medium">
                                    Host type
                                    <SortIcon />
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("beans")}
                            >
                                <span className=" flex items-center font-medium">
                                    Beans
                                    <SortIcon />
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("diamonds")}
                            >
                                <span className=" flex items-center font-medium">
                                    Diamonds
                                    <SortIcon />
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("coins")}
                            >
                                <span className=" flex items-center font-medium">
                                    Coins
                                    <SortIcon />
                                </span>
                            </th>
                            
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("stars")}
                            >
                                <span className=" flex items-center font-medium">
                                    Stars
                                    <SortIcon />
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("diamonds")}
                            >
                                <span className=" flex items-center font-medium">
                                    Level
                                    <SortIcon />
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("isBlock")}
                            >
                                <span className=" flex items-center font-medium">
                                    Block
                                    <SortIcon />
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("isVerified")}
                            >
                                <span className=" flex items-center font-medium">
                                    Verified
                                    <SortIcon />
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("vipStatus")}
                            >
                                <span className=" flex items-center font-medium">
                                    Vip status
                                    <SortIcon />
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("vipLevel")}
                            >
                                <span className=" flex items-center font-medium">
                                    Vip level
                                    <SortIcon />
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                            >
                                <span className=" flex items-center text-center font-medium">
                                    Action
                                </span>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, i) => (
                            <tr key={user._id} className="border-b whitespace-nowrap" onClick={() => setselectedUser(user)}>
                                <td className="px-4 py-4">{user.hostId}</td>

                                <td onClick={() => setOpen(true)} className="px-4 py-4 flex items-center gap-2 font-medium text-gray-900 whitespace-nowrap cursor-pointer">
                                    {user.firstName + ' ' + user.lastName} 
                                    {/* <CgEye size={18} color="#D5ADF6"/>  */}
                                </td>
                                <td className="px-4 py-4 font-medium text-black">{user.maxId}</td>
                                <td className="px-4 py-4">{user.email}</td>
                                <td className="px-4 py-4">{user.hostType}</td>

                                <td className="px-4 py-4">{user.beans || 0}</td>
                                <td className="px-4 py-4">{user.diamonds || 0}</td>
                                <td className="px-4 py-4">{user.coins || 0}</td>
                                <td className="px-4 py-4">{user.stars || 0}</td>
                                <td className="px-4 py-4">{getUserLevel(user.diamonds).levelName}</td>
                                <td className="px-4 py-4">{user.isBlock ? (
                                    <span className="text-gray-100 bg-error px-2 py-1 rounded-full">Yes</span>
                                ) : (
                                    <span className="text-gray-100 bg-success px-2 py-1 rounded-full">No</span>
                                )}</td>
                                <td className="px-4 py-4">{user.isVerified ? (
                                    <span className="text-gray-100 bg-success px-2 py-1 rounded-full">Yes</span>
                                ) : (
                                    <span className="text-gray-100 bg-error px-2 py-1 rounded-full">No</span>
                                )}</td>
                                <td className="px-4 py-4">{user.vipStatus ? (
                                    <span className="text-gray-100 bg-success px-2 py-1 rounded-full">Yes</span>
                                ) : (
                                    <span className="text-gray-100 bg-error px-2 py-1 rounded-full">No</span>
                                )}</td>
                                <td className="px-4 py-4">{user.vipLevel || 0}</td>

                                <td className="px-4 py-4 font-extrabold text-xl cursor-pointer" onClick={() => setActionModalOpen(true)}>...</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    currentUsers.length === 0 && <div className="w-full my-12 text-lightGray flex items-center justify-center">
                        <p className="text-xl font-medium text-center">No Data Found</p>
                    </div>
                }
            </div>
            {/* page footer */}
            {
                currentUsers.length !== 0 &&
                <div className="flex flex-col gap-3 md:flex-row justify-between my-10 md:px-5">
                    {/* page number */}

                    <div className="flex justify-start items-center font-semibold">
                        {showingText}
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-start md:justify-end items-center">
                        <nav aria-label="Pagination">
                            <ul className="inline-flex border rounded-sm">
                                <li>
                                    <button
                                        className="py-2 px-4 text-gray-700 bg-gray-100 text-xs sm:text-sm focus:outline-none"
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        &#x2190;
                                    </button>
                                </li>
                                <li>
                                    {
                                        currentPage !== 1 &&
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`py-2 px-4  bg-white text-gray-700 text-xs sm:text-sm hover:!bg-gray-50 focus:outline-none `}
                                        >
                                            {currentPage - 1}
                                        </button>
                                    }
                                    <button
                                        className={`py-2 px-4 text-gray-700 bg-gray-100 text-xs sm:text-sm focus:outline-none`}
                                    >
                                        {currentPage}
                                    </button>
                                    {
                                        currentPage !== Math.ceil(searchedUsers.length / itemsPerPage) &&
                                        <button
                                            disabled={
                                                currentPage === Math.ceil(searchedUsers.length / itemsPerPage)
                                            }
                                            onClick={() => paginate(currentPage + 1)}
                                            className={`py-2 px-4  bg-white text-gray-700 text-xs sm:text-sm hover:!bg-gray-50 focus:outline-none `}
                                        >
                                            {currentPage + 1}
                                        </button>
                                    }
                                    <span
                                        className={`py-2 px-4  bg-white text-gray-700 text-xs sm:text-sm hover:bg-gray-100 focus:outline-none cursor-not-allowed`}

                                    >
                                        ...
                                    </span>
                                    <button
                                        className={`py-2 px-4  bg-white text-gray-700 text-xs sm:text-sm hover:bg-gray-100 focus:outline-none `}
                                    >
                                        {Math.ceil(searchedUsers.length / itemsPerPage)}
                                    </button>
                                    <button
                                        className="py-2 px-4 text-gray-700 bg-gray-100 text-xs sm:text-sm focus:outline-none"
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={
                                            currentPage === Math.ceil(searchedUsers.length / itemsPerPage)
                                        }
                                    >
                                        &#x2192;
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>


                </div>
            }
            <Modal open={open} >
                <form ref={ref} className=''>
                    <div className="px-7 py-9 bg-white rounded-md  max-w-[400px] w-full  border-4 border-primary">
                        <div className="">
                            <p className="text-xl font-bold text-[#5C2D95]">Host Details</p>
                            <div className='grid grid-cols-2 w-full mt-5 gap-4'>
                                <div className='p-4 bg-silver hover:bg-lightPink duration-200 hover:text-white cursor-pointer w-full rounded-md text-secondary'>
                                    <p className='text-sm'>Daily earnings</p>
                                    <p className='text-xl font-bold'>31,321</p>
                                </div>
                                <div className='p-4 bg-silver hover:bg-lightPink duration-200 hover:text-white cursor-pointer w-full rounded-md text-secondary'>
                                    <p className='text-sm'>Daily earnings</p>
                                    <p className='text-xl font-bold'>31,321</p>
                                </div>
                                <div className='p-4 bg-silver hover:bg-lightPink duration-200 hover:text-white cursor-pointer w-full rounded-md text-secondary'>
                                    <p className='text-sm'>Daily earnings</p>
                                    <p className='text-xl font-bold'>31,321</p>
                                </div>
                                <div className='p-4 bg-silver hover:bg-lightPink duration-200 hover:text-white cursor-pointer w-full rounded-md  text-secondary'>
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
            <Modal open={actionModalOpen} >
                <div ref={ref} className=''>
                    <div className="px-7 py-9 bg-white rounded-md  max-w-[400px] w-full  border-4 border-primary">
                        {
                            type === 'hosts' ?
                                <div className="">
                                    <p className="text-xl font-bold text-[#5C2D95] mb-5">Host</p>
                                    <form onSubmit={handleSendAssets}>
                                        <div className="relative w-full mt-3">
                                            <TextInput type="number" name={'amount'} placeholder={'Beans Amount'} />
                                            <TextInput type="number" name={'CAmount'} placeholder={'Confirm Beans Amount'} className={'mt-2'} />
                                        </div>
                                        
                                        <button className=" bg-primary mt-2 w-full py-2 rounded-lg text-white font-semibold">
                                            Send
                                        </button>
                                    </form>
                                 
                                </div> : type === 'requests' && <AcceptHostModal setActionModalOpen={setActionModalOpen} refetch={() => setrefetch(Math.random())} handleBlockHost={handleBlockHost}  host={selectedUser} handleActions={handleActions} />
                        }

                    </div>

                </div>
            </Modal>
            <ConfirmModal open={confModalOpen} setOpen={setconfModalOpen} title={confModalTitle} nextFunc={confNextFunc} />

        </div >

    );
}
