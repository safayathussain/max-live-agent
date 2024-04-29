import Table from "@/components/Table";

const page = () => {
    return (
        <div>
            <div className="bg-white rounded-lg w-full pt-8  mt-6 ">
                <p className="text-xl px-10 pb-7 font-bold text-[#5C2D95]">Exchange Requests</p>
                <Table/>
            </div>
        </div>
    );
};

export default page;