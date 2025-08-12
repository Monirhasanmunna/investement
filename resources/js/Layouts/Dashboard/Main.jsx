import Header from "@/Layouts/Dashboard/Header.jsx";
import Sidebar from "@/Layouts/Dashboard/Sidebar.jsx";
import Notifier from "@/Components/Utils/Notification/Notifier.jsx";

export default function Main({children}){
    setTimeout(() => window.HSStaticMethods.autoInit(), 100)

    return (
        <>
            <Header/>
            <Sidebar />
            <Notifier/>
            <div className="w-full lg:ps-64 overflow-x-hidden">
                <div className="h-[calc(100vh-59px)] p-4 sm:p-6 space-y-4 sm:space-y-6 dark:bg-neutral-700">
                    <div className="w-full h-full border border-neutral-300 dark:border-neutral-500 rounded shadow-md dark:shadow-neutral-600 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
