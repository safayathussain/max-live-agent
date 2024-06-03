"use client";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
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
