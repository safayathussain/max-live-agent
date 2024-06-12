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

const page = () => {

    return (
        <div>
            <div className="bg-white rounded-lg w-full pt-8  mt-6 ">
                <div className="flex items-center justify-between">
                    <p className="text-xl px-10 pb-7 font-bold text-[#5C2D95]">Host list</p>
                </div>
                <HostTable type={'hosts'} />
            </div>
        </div>
    );
};

export default page;