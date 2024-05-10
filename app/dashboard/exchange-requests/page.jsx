"use client";
import Table from "@/components/Table";
import { FaBell } from "react-icons/fa";
import Modal from "@/components/Modal";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";

const page = () => {
  const [open, setopen] = useState(false);
  const openModal = () => {
    setopen(true);
  };
  const ref = useRef(null);
  useClickOutside(ref, () => {
    setopen(false);
  });
  const data = Array.from({ length: 4 }, (_, index) => ({
    id: 564653148 + index,
    name: "Safayat",
  }));

  return (
    <div>
      <div className="bg-white rounded-lg w-full pt-8  mt-6 ">
        <div className="flex items-center justify-between">
          <p className="text-xl px-10 pb-7 font-bold text-[#5C2D95]">
            Exchange Requests
          </p>
          <button
            onClick={openModal}
            className="border border-[#5C2D95] text-[#5C2D95] rounded-full px-2 mr-4 sm:mr-10 whitespace-nowrap mb-4 flex items-center gap-2"
          >
            <FaBell /> Request
          </button>
        </div>
        <Table />
        <Modal open={open} setOpen={setopen}>
          <form ref={ref} className="">
            <div className="bg-white p-4 mt-6 rounded-lg">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex p-1 bg-[#EEF0F6] rounded-md border-[#5C2D95] border border-opacity-50 items-center justify-between mb-2"
                >
                  <div className="flex items-center">
                    <div>
                      <Image src={logo} className="size-14" />
                    </div>
                    <div className="ml-2 text-[#5C2D95]">
                      <p className="text-xs">
                        Reseller Portal BD Agency Name: {item.name}
                      </p>
                      <p className="text-[9px]">ID: {item.id}</p>
                    </div>
                  </div>
                  <div>
                    <Link
                      href={`/dashboard/exchange-requests/request/[id]`}
                      as={`/dashboard/exchange-requests/request/${item.id}`}
                      className="text-[#5C2D95] font-bold text-xs mx-2 underline"
                    >
                      {item.id}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default page;
