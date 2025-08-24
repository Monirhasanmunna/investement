import {useEffect, useMemo, useState} from "react";
import {convertToLocalDateTime, setPaginationFromSessionStorage} from "@/helpers/helper.js";
import {router} from "@inertiajs/react";
import LengthDropdown from "@/Components/Utils/Pagination/LengthDropdown.jsx";
import StatusFilter from "@/Components/Utils/Pagination/StatusFilter.jsx";
import Summary from "@/Components/Utils/Pagination/Summary.jsx";
import Navigation from "@/Components/Utils/Pagination/Navigation.jsx";
import Main from "@/Layouts/Client/Dashboard/Main.jsx";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";


export default function Page({data: walletListData}){
    const [pagination, setPagination] = useState({page: walletListData.page, length: walletListData.length})
    const [go, setGo] = useState(false)


    useEffect(() => {
        setPaginationFromSessionStorage(setPagination, 'client_wallet_pagination', {
            page: walletListData?.page, length: walletListData?.length, type: walletListData.type, searchText: ""
        }, )
    }, []);


    useEffect(() => {
        if (pagination?.page && pagination?.length && go) {
            setGo(false)
            const queryParams = {
                page: pagination.page,
                length: pagination.length,
            };

            if (pagination.type) queryParams.type = pagination.type;

            router.get(route('client.wallet.list', queryParams))

            sessionStorage.setItem('client_wallet_pagination', JSON.stringify(pagination))
        }
    }, [go]);

    const totalAmount = useMemo(() => walletListData.wallets.reduce((sum, wallet) => sum + Number(wallet.amount), 0), [walletListData.wallets])

    return (
        <Main>
            <div className="w-full p-5">
                <div className="flex justify-between  items-center my-4 text-[.75rem]">
                    <div className="flex items-center gap-x-6">
                        <h2 className="font-medium text-xl leading-6 text-neutral-700 dark:text-neutral-300">Wallet (Tk.{totalAmount})</h2>
                    </div>
                    <LengthDropdown
                        callback={(value) => {
                            setPagination(prevState => ({...prevState, page: 1, length: value}))
                            setGo(true)
                        }}
                        placeholder={pagination.length}
                    />
                </div>

                <div className="w-full">
                    {/* scroll only for the table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-neutral-300 dark:border-neutral-400 border-collapse text-sm">
                            <thead className="bg-gray-100 dark:bg-neutral-700">
                            <tr>
                                <th className="w-[15%] px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                    Date
                                </th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                    Amount
                                </th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                    Type
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {walletListData.wallets.map((wallet) => (
                                <tr
                                    key={wallet.id}
                                    className="hover:bg-gray-100 dark:hover:bg-neutral-600"
                                >
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400 whitespace-nowrap">
                                        {convertToLocalDateTime(wallet.created_at)}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400 whitespace-nowrap">
                                        <div className="w-full flex gap-1 items-center">
                                            <span>Tk.{wallet.amount}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 capitalize font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400 whitespace-nowrap">
                                        {wallet.type}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* keep pagination outside so it doesn't scroll */}
                    <div className="py-3 sm:px-6">
                        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                            <Summary
                                page={walletListData.page}
                                length={walletListData.length}
                                count={walletListData.count}
                            />
                            <Navigation
                                page={pagination.page}
                                length={walletListData.length}
                                count={walletListData.count}
                                callback={(cp) => {
                                    setPagination((state) => ({ ...state, page: cp }))
                                    setGo(true)
                                }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </Main>
)
}
