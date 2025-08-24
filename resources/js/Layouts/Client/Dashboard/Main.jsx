import {Link, router, usePage} from "@inertiajs/react";

export default function Main({children}){
    const {auth} = usePage().props
    return (
        <div className="max-w-xl min-h-screen md:min-h-[600px] mx-auto bg-white flex flex-col md:border border-gray-400 md:shadow-2xl shadow-gray-200 md:rounded md:mt-10">
            <header className="flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-slate-800 text-gray-100 rounded-t md:rounded-t">
                <h1 className="text-lg font-semibold">Hi! {auth.user.name}</h1>
            </header>

            {children}

            <footer className="mt-auto border-t border-gray-300 flex justify-around py-2 bg-slate-800">
                <Link href={route('user.dashboard.dashboard')} className="text-gray-100 cursor-pointer">Home</Link>
                <Link href={route('client.transection.list')} className="text-gray-100 cursor-pointer">Transections</Link>
                <button className="text-gray-100 cursor-pointer">Wallet</button>
                <button onClick={() => router.post(route('logout'))} className="text-gray-100 cursor-pointer">Logout</button>
            </footer>
        </div>
    )
}
