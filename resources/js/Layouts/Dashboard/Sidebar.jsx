import { BiHomeAlt } from "react-icons/bi";
import {FaFileInvoiceDollar, FaPowerOff, FaSignOutAlt, FaUsers} from "react-icons/fa";
import {useState} from "react";
import {Link, router, usePage} from "@inertiajs/react";
import {getQueries} from "@/helpers/helper.js";
import {TfiLayoutSlider} from "react-icons/tfi";
import {FaGear, FaQ} from "react-icons/fa6";
import {FiPackage} from "react-icons/fi";
import {PiHandWithdrawBold} from "react-icons/pi";


const menuItems = [
    {
        label: 'Dashboard',
        link: 'dashboard',
        icon: <BiHomeAlt className={`size-5`} />,
    },
    {
        label: 'Investment',
        link: 'admin.purchase.list',
        icon: <FaFileInvoiceDollar className={`size-5`} />,
    },
    {
        label: 'Package',
        link: 'admin.package.list',
        icon: <FiPackage className={`size-5`} />,
    },
    {
        label: 'Withdraw',
        link: 'admin.withdraw.list',
        icon: <PiHandWithdrawBold className={`size-5`} />,
    },
    {
        label: 'User',
        link: 'admin.user.list',
        icon: <FaUsers className={`size-5`} />,
    },
    {
        label: 'Slider',
        link: 'admin.slider.list',
        icon: <TfiLayoutSlider className={`size-5`} />,
    },
    {
        label: 'Faq',
        link: 'admin.faq.list',
        icon: <FaQ className={`size-5`} />,
    },
    {
        label: 'App Setting',
        link: 'admin.setting.list',
        icon: <FaGear className={`size-5`} />,
    },
];


export default function Sidebar() {
    const { url: currentUrl } = usePage()
    const [openIndex, setOpenIndex] = useState(null);

    const toggleDropdown = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <div
                id="hs-application-sidebar"
                className="hs-overlay  [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-65 h-full hidden fixed inset-y-0 start-0 z-60 bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700"
                role="dialog"
                tabIndex="-1"
                aria-label="Sidebar"
            >
                <div className="w-full border-b border-gray-200 dark:border-neutral-700 h-[59px] flex justify-center items-center p-3">
                    <h2 className={`text-blue-400 text-2xl`}>Dashboard</h2>
                </div>
                <div className="relative flex flex-col h-full max-h-full">
                    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        <nav className="p-4">
                            <ul className="flex flex-col gap-1">
                                {menuItems.map((item, index) => {
                                    const hasActiveChild = route().current(item.link);
                                    const isOpen = openIndex === index;
                                    const shouldShow = isOpen || hasActiveChild;

                                    return (
                                        <li key={index}>
                                            <button
                                                onClick={() => toggleDropdown( item.children ? index : router.get(route(item.link)))}
                                                className={`flex items-center justify-between w-full px-3 py-2 rounded-t-sm ${shouldShow ? 'bg-blue-100 dark:bg-neutral-700' : ''} hover:bg-blue-100 dark:hover:bg-neutral-700 focus:bg-gray-100 dark:focus:bg-neutral-700 text-gray-800 dark:text-neutral-200`}
                                                aria-expanded={shouldShow}
                                            >
                                              <span className="flex items-center gap-3">
                                                {item.icon}
                                                  <span>{item.label}</span>
                                              </span>
                                                {item.children && (
                                                    <svg
                                                        className={`w-4 h-4 transition-transform ${shouldShow ? "rotate-90" : ""}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M9 18l6-6-6-6" />
                                                    </svg>
                                                )}
                                            </button>

                                            {item.children && (
                                                <ul
                                                    className={`text-sm bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-neutral-200 space-y-2 rounded-b-sm overflow-hidden transition-all duration-300 ease-in-out ${
                                                        shouldShow
                                                            ? "max-h-60 opacity-100 translate-y-0"
                                                            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
                                                    }`}
                                                >
                                                    {item.children.map((child, cIndex) => {
                                                        const isActive = route().current(child.link);

                                                        return (
                                                            <button key={cIndex} onClick={() => {router(route(child.link))}}>
                                                            <li
                                                                className={`hover:text-yellow-500 ${isActive ? "text-yellow-500" : ""} cursor-pointer py-2 px-6`}
                                                            >
                                                                {child.label}
                                                            </li>
                                                            </button>
                                                        );
                                                    })}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                                <li>
                                    <button
                                        onClick={() => {
                                            router.post(route('logout'))
                                        }}
                                        className={`flex items-center justify-between w-full px-3 py-2 rounded-t-sm hover:bg-gray-100 dark:hover:bg-neutral-700 focus:bg-gray-100 dark:focus:bg-neutral-700 text-gray-800 dark:text-neutral-200`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <FaSignOutAlt  className={`size-5`} />
                                           <span>Logout</span>
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
