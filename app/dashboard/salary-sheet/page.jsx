import SalaryTable from '@/components/tables/SalaryTable.jsx'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="bg-white rounded-lg w-full pt-8  mt-6 ">
                <p className="text-xl px-10 pb-7 font-bold text-[#5C2D95]">Salary Hub</p>
                <div className='pl-10 text-sm md:text-base flex flex-col gap-1'>
                    <p>Agency Id:</p>
                    <p>Agency Name:</p>
                    <p>Total Host Salary:</p>
                    <p>Total Host Reward:</p>
                    <p>Net Payable:</p>
                </div>
                <div className='mt-5'>
                    <p className='pl-10'>Agancy Member Salary:</p>
                    <div className='mt-5'>
                       <SalaryTable></SalaryTable>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page