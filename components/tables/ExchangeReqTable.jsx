"use client";

import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Modal from "@/components/Modal";

export default function HostTable() {
    const dummyProducts = [
        {
            sl: 1,
            id: 1,
            fullName: "Safayat Hussain",
            email: "safayat@gmail.com",
            date: "12 May, 2023",
            beans: 1203,
        },
        {
            sl: 2,
            id: 1,
            fullName: "Safayat Hussain",
            email: "safayat@gmail.com",
            date: "12 May, 2023",
            beans: 1203,
        },
        {
            sl: 3,
            id: 1,
            fullName: "Safayat Hussain",
            email: "safayat@gmail.com",
            date: "12 May, 2023",
            beans: 1203,
        },
        {
            sl: 4,
            id: 1,
            fullName: "Safayat dsa Hussain",
            email: "safayat@gmail.com",
            date: "12 May, 2023",
            beans: 1203,
        },
        {
            sl: 5,
            id: 1,
            fullName: "Safayat dsa Hussain",
            email: "safayat@gmail.com",
            date: "12 May, 2023",
            beans: 1203,
        },
        {
            sl: 6,
            id: 1,
            fullName: "Safayat dsa Hussain",
            email: "safayat@gmail.com",
            date: "12 May, 2023",
            beans: 1203,
        },

    ];

    const [products, setProducts] = useState(dummyProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [showMenu, setShowMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const [actionModalOpen, setActionModalOpen] = useState(false)

    const ref = useRef(null);
    useClickOutside(ref, () => {
        setOpen(false);
        setActionModalOpen(false)
    });

    // Function to handle search input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

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

    let filteredProducts = products.filter((product) =>
        product.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy) {
        filteredProducts = filteredProducts.sort((a, b) => {
            const compareA = a[sortBy];
            const compareB = b[sortBy];
            if (compareA < compareB) {
                return sortOrder === "asc" ? -1 : 1;
            }
            if (compareA > compareB) {
                return sortOrder === "asc" ? 1 : -1;
            }
            return 0;
        });
    }

    const showingText = `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${currentPage * itemsPerPage
        } of ${filteredProducts.length}`;
    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const data = filteredProducts;
    const dataPerPage = itemsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className=" overflow-hidden mx-8">
            <div className="flex flex-col md:flex-row items-center justify-between  pb-4">
                <div className="w-full md:w-1/2 py-1">
                    <form className="flex items-center">
                        <div className="relative w-full">
                            <input
                                type="email"
                                id="emailField"
                                className="block font-medium focus:border-lightGray text-black px-2.5 pb-2 pt-3 w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 peer"
                                placeholder=" "
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <label
                                htmlFor="emailField"
                                className="text-sm absolute text-lightGray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-lightGray peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                Search By Name
                            </label>
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
                                        Sl
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
                                onClick={() => handleSort("date")}
                            >
                                <span className=" flex items-center font-medium">
                                    Date
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
                            >
                                <span className=" flex items-center font-medium">
                                    Action

                                </span>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((data) => (
                            <tr key={data.id} className="border-b whitespace-nowrap">
                                <td className="px-4 py-4">{data.sl}</td>
                                <td onClick={() => setOpen(true)} className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer">
                                    {data.fullName}
                                </td>
                                <td className="px-4 py-4">{data.email}</td>
                                <td className="px-4 py-4">{data.date}</td>
                                <td className="px-4 py-4">{data.beans}</td>
                                <td className="px-4 py-4 font-extrabold text-xl cursor-pointer" onClick={() => setActionModalOpen(true)}>...</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* page footer */}
            <div className="flex flex-col gap-3 md:flex-row justify-between my-10 md:px-5">
                {/* page number */}
                <div className="flex justify-start items-center font-semibold">
                    {showingText}
                </div>
                {/* Pagination */}
                <div className="flex justify-start md:justify-end items-center">
              <nav aria-label="Pagination">
                <ul className="inline-flex border rounded-sm shadow-md">
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
                      currentPage !== Math.ceil(data.length / dataPerPage) &&
                      <button
                        disabled={
                          currentPage === Math.ceil(data.length / dataPerPage)
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
                      {Math.ceil(data.length / dataPerPage)}
                    </button>
                    <button
                      className="py-2 px-4 text-gray-700 bg-gray-100 text-xs sm:text-sm focus:outline-none"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage === Math.ceil(data.length / dataPerPage)
                      }
                    >
                      &#x2192;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            </div>
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
                <form ref={ref} className=''>
                    <div className="px-7 py-9 bg-white rounded-md  max-w-[400px] w-full  border-4 border-primary">
                        <div className="">
                            <p className="text-xl font-bold text-[#5C2D95] mb-5">Host</p>
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    id="coinField"
                                    className="block font-medium focus:border-lightGray text-black px-2.5 pb-2 pt-3 w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="coinField"
                                    className="text-sm absolute text-lightGray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-lightGray peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                >
                                    Coin Exchange
                                </label>
                            </div>
                            <div className="relative w-full mt-3">
                                <input
                                    type="number"
                                    id="beanField"
                                    className="block font-medium focus:border-lightGray text-black px-2.5 pb-2 pt-3 w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="beanField"
                                    className="text-sm absolute text-lightGray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-lightGray peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                >
                                    Bean Exchange
                                </label>
                            </div>
                            <button className=" bg-primary mt-2 w-full py-2 rounded-lg text-white font-semibold">
                                Send
                            </button>
                            <div className="flex items-center gap-2">
                                <button className=" bg-lightPink mt-2 w-full py-2 rounded-lg text-white font-semibold">
                                    Block
                                </button>
                                <button className=" bg-error mt-2 w-full py-2 rounded-lg text-white font-semibold">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </Modal>
        </div >

    );
}
