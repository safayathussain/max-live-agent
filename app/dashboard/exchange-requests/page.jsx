"use client";
import Table from "@/components/Table";
import { FaBell } from "react-icons/fa";
import Modal from "@/components/Modal";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";
import ExchangeReqTable from "@/components/tables/ExchangeReqTable";

const page = () => {
  const [open, setopen] = useState(false);
  const openModal = () => {
    setopen(true);
  };
  const ref = useRef(null);
  useClickOutside(ref, () => {
    setopen(false);
  });


  return (
    <div>
      <div className="bg-white rounded-lg w-full pt-8  mt-6 ">
        <div className="flex items-center justify-between">
          <p className="text-xl px-10 pb-7 font-bold text-[#5C2D95]">
            Exchange Requests
          </p>
          
        </div>
        <ExchangeReqTable />
        
      </div>
    </div>
  );
};

export default page;
