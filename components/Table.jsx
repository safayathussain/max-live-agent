'use client'
import React from 'react'
import { BsThreeDots } from "react-icons/bs";
const Table = ({ sl = true, checkbox = true, headers = [], body = [], selectAllFunc = () => { }, selectOneFunc = () => { }, actionFunc = (() => { }) }) => {
    return (
        <div>
            <div class="relative  w-full px-5 max-w-[calc(100vw-50px)] max-h-[calc(100vh-300px)] overflow-x-scroll">
                <table class="w-full text-sm  rtl:text-right text-center whitespace-nowrap">
                    <thead class="text-xs text-[#B5BFC9]  uppercase  sticky top-0 bg-white">
                        <tr className='border-b'>
                            {
                                (sl || checkbox) &&
                                <th scope="col" class="pl-6 py-3 font-medium text-sm flex items-center gap-5 ">
                                    {
                                        checkbox &&
                                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary  focus:ring-2 " />
                                    }
                                    {sl &&
                                        <div class="flex items-center justify-center">
                                            sl
                                            <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                            </svg></a>
                                        </div>
                                    }
                                </th>
                            }
                            <th scope="col" class="px-6 py-3 font-medium text-sm ">
                                <div class="flex items-center justify-center">
                                    full name
                                    <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></a>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium text-sm">
                                <div class="flex items-center justify-center">
                                    email address
                                    <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></a>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium text-sm">
                                <div class="flex items-center justify-center">
                                    date
                                    <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></a>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium text-sm">
                                <div class="flex items-center justify-center">
                                    beans
                                    <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></a>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium text-sm">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b  text-[#68727B]">
                            {
                                (sl || checkbox) &&
                                <th scope="col" class="px-6 py-3 font-medium text-sm items-center flex gap-5 ">
                                    {
                                        checkbox &&
                                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary  focus:ring-2 " />
                                    }
                                    {sl &&
                                        1
                                    }
                                </th>
                            }
                            <td class="px-6 py-4 font-medium text-[#1B2126]">
                                Safayat hussain
                            </td>
                            <td class="px-6 py-4">
                                safayat@gmail.com
                            </td>
                            <td class="px-6 py-4">
                                12 april, 2023
                            </td>
                            <td class="px-6 py-4">
                                1232
                            </td>
                            <td class="px-6 py-4 flex justify-center">
                                <div onClick={actionFunc}>

                                <BsThreeDots size={20} />
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default Table