
import Main from "@/Layouts/Client/Dashboard/Main.jsx";
import {FaMoneyCheck, FaWallet} from "react-icons/fa";
import {SiMoneygram} from "react-icons/si";
import {Link} from "@inertiajs/react";

export default function Dashboard() {
    return (
        <Main>
            {/* Service Section */}
            <section className="px-4 mt-6">
                <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
                    <div className="rounded-xl p-4 flex flex-col items-center shadow-md border border-gray-300 bg-[#F6F7E9]">
                        <FaWallet className={`size-8 text-sky-400`} />
                        <span className="text-sm mt-2">MA Wallet</span>
                    </div>
                    <div className="rounded-xl p-4 flex flex-col items-center shadow-md border border-gray-300 bg-[#F6F7E9]">
                        <FaMoneyCheck className={`size-8 text-sky-400`} />
                        <span className="text-sm mt-2">Packages</span>
                    </div>
                    <Link href={route('client.withdraw.list')} className="rounded-xl p-4 flex flex-col items-center shadow-md border border-gray-300 bg-[#F6F7E9]">
                        <SiMoneygram className={`size-8 text-sky-400`} />
                        <span className="text-sm mt-2">Withdraw</span>
                    </Link>
                </div>
            </section>
        </Main>
    )
}
