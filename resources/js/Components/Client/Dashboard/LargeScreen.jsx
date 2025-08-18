import {useState} from "react";

export default function LargeScreen(){
    const [balance] = useState(4000);
    return (
        <div className="w-full hidden min-h-screen bg-gray-50 md:flex flex-col">
            {/* Top Navigation */}
            <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
                <div className="font-bold text-lg">WalletApp</div>
                <ul className="hidden md:flex space-x-8 font-medium">
                    <li><button>Home</button></li>
                    <li><button>Invest</button></li>
                    <li><button>Team</button></li>
                    <li><button>Mine</button></li>
                </ul>
                <div className="md:hidden">☰</div>
            </nav>

            {/* Content wrapper for desktop */}
            <div className="flex-1 p-4 md:p-8">
                {/* Tabular Reminders */}
                <section className="mb-8">
                    <h2 className="text-gray-800 font-semibold mb-4 text-lg">Reminders</h2>
                    <table className="w-full border-collapse border border-gray-200 text-sm md:text-base">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2 text-left">Action</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Button</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-200 px-4 py-2">Recharge</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button className="bg-orange-200 px-4 py-1 rounded">Go ➡</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-200 px-4 py-2">Withdraw</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button className="bg-green-200 px-4 py-1 rounded">Go ➡</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                {/* Popular recommendations */}
                <section className="mb-8">
                    <h2 className="text-gray-800 font-semibold mb-4 text-lg">Popular recommendations</h2>
                    <table className="w-full border-collapse border border-gray-200 text-sm md:text-base">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Amount</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Rate</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Target</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-200 px-4 py-2">Real user verification</td>
                            <td className="border border-gray-200 px-4 py-2">৳0.00</td>
                            <td className="border border-gray-200 px-4 py-2 text-red-500">0.00%</td>
                            <td className="border border-gray-200 px-4 py-2">৳{balance}.00</td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                {/* Service Section */}
                <section>
                    <h2 className="text-gray-800 font-semibold mb-4 text-lg">Service</h2>
                    <table className="w-full border-collapse border border-gray-200 text-sm md:text-base">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">Icon</th>
                            <th className="border border-gray-200 px-4 py-2">Service</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-200 px-4 py-2 text-green-600 text-lg">📈</td>
                            <td className="border border-gray-200 px-4 py-2">MA Wallet</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-200 px-4 py-2 text-green-600 text-lg">✅</td>
                            <td className="border border-gray-200 px-4 py-2">CHECK IN</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-200 px-4 py-2 text-green-600 text-lg">📄</td>
                            <td className="border border-gray-200 px-4 py-2">ABOUT</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
}
