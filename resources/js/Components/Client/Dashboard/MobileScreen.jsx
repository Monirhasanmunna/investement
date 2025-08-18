import {useState} from "react";

export default function MobileScreen(){
    const [balance] = useState(4000);
    return (
        <div className="w-full min-h-screen bg-white flex flex-col md:hidden">
            {/* Reminders */}
            <section className="p-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="bg-orange-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center">
                    <span className="font-semibold text-gray-700">RECHARGE</span>
                    <button className="text-lg mt-2">➡</button>
                </div>
                <div className="bg-green-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center">
                    <span className="font-semibold text-gray-700">WITHDRAW</span>
                    <button className="text-lg mt-2">➡</button>
                </div>
            </section>

            {/* Service Section */}
            <section className="px-4 mt-6">
                <h2 className="text-gray-800 font-semibold mb-2">SERVICE</h2>
                <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
                    <div className="rounded-xl p-4 flex flex-col items-center shadow-sm border">
                        <span className="text-green-600 text-lg">📈</span>
                        <span className="text-sm mt-2">MA Wallet</span>
                    </div>
                    <div className="rounded-xl p-4 flex flex-col items-center shadow-sm border">
                        <span className="text-green-600 text-lg">✅</span>
                        <span className="text-sm mt-2">CHECK IN</span>
                    </div>
                    <div className="rounded-xl p-4 flex flex-col items-center shadow-sm border">
                        <span className="text-green-600 text-lg">📄</span>
                        <span className="text-sm mt-2">ABOUT</span>
                    </div>
                </div>
            </section>

            {/* Bottom Navigation */}
            <footer className="mt-auto border-t flex justify-around py-2 bg-white">
                <button className="text-green-600">front page</button>
                <button className="text-gray-500">invest</button>
                <button className="text-gray-500">team</button>
                <button className="text-gray-500">mine</button>
            </footer>
        </div>
    )
}
