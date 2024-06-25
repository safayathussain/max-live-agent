
import HostTable from "@/components/tables/HostTable.jsx";

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