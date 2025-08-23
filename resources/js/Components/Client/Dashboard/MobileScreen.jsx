import {useState} from "react";
import {FaMoneyCheck, FaWallet} from "react-icons/fa";
import {SiMoneygram} from "react-icons/si";
import {router} from "@inertiajs/react";

export default function MobileScreen(){
    const [balance] = useState(4000);
    return (
        <div className="max-w-xl min-h-screen md:min-h-[600px] mx-auto bg-white flex flex-col md:border border-gray-400 md:shadow-2xl shadow-gray-200 md:rounded md:mt-10">
            {/* Reminders */}
            {/*<section className="p-4 grid grid-cols-2 gap-4 md:grid-cols-2">*/}
            {/*    <div className="bg-orange-300 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center">*/}
            {/*        <span className="font-semibold text-gray-700">RECHARGE</span>*/}
            {/*        <button className="text-lg mt-2">➡</button>*/}
            {/*    </div>*/}
            {/*    <div className="bg-green-300 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center">*/}
            {/*        <span className="font-semibold text-gray-700">WITHDRAW</span>*/}
            {/*        <button className="text-lg mt-2">➡</button>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* Service Section */}
            <section className="px-4 mt-6">
                {/*<h2 className="text-gray-800 font-semibold mb-2">SERVICE</h2>*/}
                <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
                    <div className="rounded-xl p-4 flex flex-col items-center shadow-md border border-gray-300 bg-[#F6F7E9]">
                        <FaWallet className={`size-8 text-sky-400`} />
                        <span className="text-sm mt-2">MA Wallet</span>
                    </div>
                    <div className="rounded-xl p-4 flex flex-col items-center shadow-md border border-gray-300 bg-[#F6F7E9]">
                        <FaMoneyCheck className={`size-8 text-sky-400`} />
                        <span className="text-sm mt-2">Packages</span>
                    </div>
                    <div className="rounded-xl p-4 flex flex-col items-center shadow-md border border-gray-300 bg-[#F6F7E9]">
                        <SiMoneygram className={`size-8 text-sky-400`} />
                        <span className="text-sm mt-2">Withdraw</span>
                    </div>
                </div>
            </section>

            {/* Bottom Navigation */}
            <footer className="mt-auto border-t border-gray-300 flex justify-around py-2 bg-slate-800">
                <button className="text-gray-100 cursor-pointer">Home</button>
                <button className="text-gray-100 cursor-pointer">Transections</button>
                <button className="text-gray-100 cursor-pointer">Wallet</button>
                <button onClick={() => router.post(route('logout'))} className="text-gray-100 cursor-pointer">Logout</button>
            </footer>
        </div>
    )
}
