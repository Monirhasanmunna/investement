import {Link, router, usePage} from "@inertiajs/react";
import Notifier from "@/Components/Utils/Notification/Notifier.jsx";
import {FaUserCircle} from "react-icons/fa";
import {TbWorld} from "react-icons/tb";

export default function Main({children}){
    setTimeout(() => window.HSStaticMethods.autoInit(), 100)
    const {auth} = usePage().props

    return (
        <>
            <Notifier/>
            <div className="max-w-xl min-h-[100vh] mx-auto bg-white flex flex-col md:border border-gray-400 md:shadow-2xl shadow-gray-200 md:rounded md:mt-10">
                <header className="flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-slate-800 text-gray-100 rounded-t md:rounded-t sticky top-0">
                    <h1 className="text-lg font-semibold">Hi! {auth.user.name}</h1>
                    <div className="flex items-center gap-4">
                        <Link className={`px-3 py-1.5 bg-white text-gray-800 rounded`} href={route('home')}>Buy Package</Link>
                        <Link href={route('user.profile')}><FaUserCircle className={`size-6`} /></Link>
                    </div>
                </header>

                <div className="flex-1 w-full">{children}</div>

                <footer className="border-t border-gray-300 flex justify-around py-3 bg-slate-800 rounded-b sticky bottom-0">
                    <Link href={route('user.dashboard.dashboard')} className="text-gray-100 cursor-pointer">Home</Link>
                    <Link href={route('client.transection.list')} className="text-gray-100 cursor-pointer">Transections</Link>
                    <Link href={route('client.wallet.list')} className="text-gray-100 cursor-pointer">Wallet</Link>
                    <button onClick={() => router.post(route('logout'))} className="text-gray-100 cursor-pointer">Logout</button>
                </footer>
            </div>
        </>
    )
}
