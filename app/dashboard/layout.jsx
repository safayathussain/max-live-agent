'use client'
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getAuth, useAuth } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const {auth, refetchAuth} = useAuth()
    if (!auth || auth.role !== 'AG') return router.push('/login')
        useEffect(() => {
          refetchAuth()
        }, [])
        
    return (
        <div className='min-h-screen'>
            <div className='flex items-center bg-primary'>
                <Sidebar open={open} setOpen={setOpen} />
                <Navbar />
            </div>
            <div className={`w-full h-full bg-black fixed z-50 top-0 left-0 opacity-45 ${open ? 'block' : 'hidden'}`} onClick={() => setOpen(false)}>
            </div>
            <div className={`w-full relative h-full lg:ml-[255px] lg:max-w-[calc(100vw-255px)] px-7 py-7 lg:px-14 lg:py-10 `} onClick={() => setOpen(false)}>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
