import Table from '@/components/Table'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="bg-white rounded-lg w-full pt-8  mt-6 ">
                <p className="text-xl px-10 pb-7 font-bold text-[#5C2D95]">Salary Hub</p>
                <div className='pl-10 flex flex-col gap-1'>
                    <p>Agency Id:</p>
                    <p>Agency Name:</p>
                    <p>Total Host Salary:</p>
                    <p>Total Host Reward:</p>
                    <p>Net Payable:</p>
                </div>
                <div className='mt-5'>
                    <p className='pl-10'>Agancy Member Salary:</p>
                    <div className='mt-5'>
                       <Table></Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page