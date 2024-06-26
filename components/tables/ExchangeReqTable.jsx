"use client";

import { useEffect, useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Modal from "@/components/Modal";
import { FetchApi } from "@/utils/FetchApi";
import TextInput from '@/components/TextInput';
import { useAuth } from "@/utils/functions";
export default function HostTable() {


    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [actionModalOpen, setActionModalOpen] = useState(false)
    const [refetch, setrefetch] = useState(0)
const [selectedHost, setselectedHost] = useState({})
    const ref = useRef(null);
    useClickOutside(ref, () => {
        setOpen(false);
        setActionModalOpen(false)
    });
    const {auth} = useAuth()
    const loadData = async () => {
        const { data } = await FetchApi({ url: `agency/hosts?agencyId=${auth._id}` })
        setUsers(data?.hosts.filter(host => host.exchangeRequest === true))
    }
    useEffect(() => {
        loadData()
    }, [refetch])
    let searchedUsers = users?.filter((user) =>
        user.maxId.includes(searchTerm)
    );



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
        searchedUsers = searchedUsers.sort((a, b) => {
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
    const showingText = `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${((currentPage - 1) * itemsPerPage) < Math.ceil(searchedUsers.length / itemsPerPage) ? (currentPage * itemsPerPage) : searchedUsers.length} of ${searchedUsers.length}`;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = searchedUsers.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handleAccept = async() => {
        await FetchApi({ url: `agency/acceptExchangeRequest?hostId=${selectedHost._id}`, method: 'post', isToast: true , callback: () => {
            setActionModalOpen(false)
            setrefetch(Math.random())
        }})
    }
    const handleReject = async() => {
        await FetchApi({ url: `agency/declineExchangeRequest?hostId=${selectedHost._id}`, method: 'post', isToast: true , callback: () => {
            setActionModalOpen(false)
            setrefetch(Math.random())
        }})

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
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-lightGray uppercase  bg-white">
                        <tr>
                            {/* <th className="pl-4 py-3 cursor-pointer">
                    <input type="checkbox" name="" id="" />
                  </th> */}
                            <th
                                className="px-4 py-3 cursor-pointer "
                                onClick={() => handleSort("sl")}
                            >
                                <div>
                                    <span className=" flex items-center font-medium">
                                        Max ID
                                        <svg
                                            width="15"
                                            height="10"
                                            viewBox="0 0 9 5"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-1"
                                        >
                                            <path
                                                d="M5.14727 4.15516C4.75412 4.49564 4.17057 4.49564 3.77743 4.15516L1.14728 1.87738C0.415013 1.24323 0.863505 0.0402738 1.8322 0.0402738L7.0925 0.0402743C8.06119 0.0402744 8.50968 1.24323 7.77742 1.87739L5.14727 4.15516Z"
                                                fill="#B5BFC9"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer "
                                onClick={() => handleSort("hostId")}
                            >
                                <div>
                                    <span className=" flex items-center font-medium">
                                        Host ID
                                        <svg
                                            width="15"
                                            height="10"
                                            viewBox="0 0 9 5"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-1"
                                        >
                                            <path
                                                d="M5.14727 4.15516C4.75412 4.49564 4.17057 4.49564 3.77743 4.15516L1.14728 1.87738C0.415013 1.24323 0.863505 0.0402738 1.8322 0.0402738L7.0925 0.0402743C8.06119 0.0402744 8.50968 1.24323 7.77742 1.87739L5.14727 4.15516Z"
                                                fill="#B5BFC9"
                                            />
                                        </svg>
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
                                        <svg
                                            width="15"
                                            height="10"
                                            viewBox="0 0 9 5"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-1"
                                        >
                                            <path
                                                d="M5.14727 4.15516C4.75412 4.49564 4.17057 4.49564 3.77743 4.15516L1.14728 1.87738C0.415013 1.24323 0.863505 0.0402738 1.8322 0.0402738L7.0925 0.0402743C8.06119 0.0402744 8.50968 1.24323 7.77742 1.87739L5.14727 4.15516Z"
                                                fill="#B5BFC9"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer "
                                onClick={() => handleSort("hostType")}
                            >
                                <div>
                                    <span className=" flex items-center font-medium">
                                        Host type
                                        <svg
                                            width="15"
                                            height="10"
                                            viewBox="0 0 9 5"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-1"
                                        >
                                            <path
                                                d="M5.14727 4.15516C4.75412 4.49564 4.17057 4.49564 3.77743 4.15516L1.14728 1.87738C0.415013 1.24323 0.863505 0.0402738 1.8322 0.0402738L7.0925 0.0402743C8.06119 0.0402744 8.50968 1.24323 7.77742 1.87739L5.14727 4.15516Z"
                                                fill="#B5BFC9"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("email")}
                            >
                                <span className=" flex items-center font-medium">
                                    Email Address
                                    <svg
                                        width="15"
                                        height="10"
                                        viewBox="0 0 9 5"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1"
                                    >
                                        <path
                                            d="M5.14727 4.15516C4.75412 4.49564 4.17057 4.49564 3.77743 4.15516L1.14728 1.87738C0.415013 1.24323 0.863505 0.0402738 1.8322 0.0402738L7.0925 0.0402743C8.06119 0.0402744 8.50968 1.24323 7.77742 1.87739L5.14727 4.15516Z"
                                            fill="#B5BFC9"
                                        />
                                    </svg>
                                </span>
                            </th>
                            
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("beans")}
                            >
                                <span className=" flex items-center font-medium">
                                    Beans
                                    <svg
                                        width="15"
                                        height="10"
                                        viewBox="0 0 9 5"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1"
                                    >
                                        <path
                                            d="M5.14727 4.15516C4.75412 4.49564 4.17057 4.49564 3.77743 4.15516L1.14728 1.87738C0.415013 1.24323 0.863505 0.0402738 1.8322 0.0402738L7.0925 0.0402743C8.06119 0.0402744 8.50968 1.24323 7.77742 1.87739L5.14727 4.15516Z"
                                            fill="#B5BFC9"
                                        />
                                    </svg>
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("diamonds")}
                            >
                                <span className=" flex items-center font-medium">
                                    Diamonds
                                    <svg
                                        width="15"
                                        height="10"
                                        viewBox="0 0 9 5"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1"
                                    >
                                        <path
                                            d="M5.14727 4.15516C4.75412 4.49564 4.17057 4.49564 3.77743 4.15516L1.14728 1.87738C0.415013 1.24323 0.863505 0.0402738 1.8322 0.0402738L7.0925 0.0402743C8.06119 0.0402744 8.50968 1.24323 7.77742 1.87739L5.14727 4.15516Z"
                                            fill="#B5BFC9"
                                        />
                                    </svg>
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort("exchangeRequestDiamonds")}
                            >
                                <span className=" flex items-center font-medium">
                                    Request Diamonds
                                    <svg
                                        width="15"
                                        height="10"
                                        viewBox="0 0 9 5"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1"
                                    >
                                        <path
                                            d="M5.14727 4.15516C4.75412 4.49564 4.17057 4.49564 3.77743 4.15516L1.14728 1.87738C0.415013 1.24323 0.863505 0.0402738 1.8322 0.0402738L7.0925 0.0402743C8.06119 0.0402744 8.50968 1.24323 7.77742 1.87739L5.14727 4.15516Z"
                                            fill="#B5BFC9"
                                        />
                                    </svg>
                                </span>
                            </th>
                            <th
                                className="px-4 py-3 cursor-pointer"
                            >
                                <span className=" flex items-center font-medium">
                                    Action

                                </span>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, i) => (
                            <tr key={user._id} className="border-b whitespace-nowrap">
                                <td className="px-4 py-4">{user.maxId}</td>
                                <td className="px-4 py-4">{user.hostId}</td>
                                <td onClick={() => setOpen(true)} className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer">
                                    {user.firstName + ' ' + user.lastName}
                                </td>
                                <td className="px-4 py-4">{user.hostType}</td>
                                <td className="px-4 py-4">{user.email}</td>
                                <td className="px-4 py-4">{user.beans}</td>
                                <td className="px-4 py-4">{user.diamonds}</td>
                                <td className="px-4 py-4">{user.exchangeRequestDiamonds}</td>
                                <td className="px-4 py-4 font-extrabold text-xl cursor-pointer" onClick={() => {
                                    setselectedHost(user)
                                    setActionModalOpen(true)
                                }}>...</td>

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
                        <div className="w-[200px]">
                            <p className="text-xl font-bold text-[#5C2D95] mb-5">Host</p>
                            
                            <div className="flex items-center gap-2 w-full">
                                <button onClick={handleReject} className=" bg-error mt-2 w-full py-2 rounded-lg text-white font-semibold">
                                    Reject
                                </button>
                                <button onClick={handleAccept} className=" bg-success mt-2 w-full py-2 rounded-lg text-white font-semibold">
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        </div >

    );
}
