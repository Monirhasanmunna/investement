import {useEffect, useState} from "react";
import {convertToLocalDateTime, setPaginationFromSessionStorage} from "@/helpers/helper.js";
import {router, usePage} from "@inertiajs/react";
import LengthDropdown from "@/Components/Utils/Pagination/LengthDropdown.jsx";
import SearchBox from "@/Components/Utils/Pagination/SearchBox.jsx";
import {STATUS_DELETED} from "@/helpers/const.js";
import Summary from "@/Components/Utils/Pagination/Summary.jsx";
import Navigation from "@/Components/Utils/Pagination/Navigation.jsx";
import {FaPencil} from "react-icons/fa6";
import {FaTrash} from "react-icons/fa";
import Main from "@/Layouts/Client/Dashboard/Main.jsx";


export default function Page({data: purchaseListData}){
    const [pagination, setPagination] = useState({page: purchaseListData.page, length: purchaseListData.length})
    const [searchText, setSearchText] = useState('')
    const [go, setGo] = useState(false)

    console.log(purchaseListData)
    useEffect(() => {
        setPaginationFromSessionStorage(setPagination, 'client_purchase_pagination', {
            page: purchaseListData?.page, length: purchaseListData?.length, status: purchaseListData.status, searchText: ""
        }, )
    }, []);

    useEffect(() => {
        if (pagination.searchText !== searchText) {
            setSearchText(pagination.searchText)
        }
    }, [pagination]);

    useEffect(() => {
        if (pagination?.page && pagination?.length && go) {
            setGo(false)
            const queryParams = {
                page: pagination.page,
                length: pagination.length,
            };

            if (pagination.status) queryParams.status = pagination.status;
            if (pagination.searchText) queryParams.search = pagination.searchText;

            router.get(route('client.purchase.list', queryParams))

            sessionStorage.setItem('client_purchase_pagination', JSON.stringify(pagination))
        }
    }, [go]);


    const pursePurchaseInfo = (purchaseInfo) => {
        return JSON.parse(purchaseInfo)
    }


    return (
        <Main>
            <div className="w-full p-5">
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 my-4 text-[.75rem]">
                    <div className="flex items-center gap-x-6">
                        <h2 className="font-medium text-xl leading-6 text-neutral-700 dark:text-neutral-300">Purchase</h2>
                    </div>
                    <LengthDropdown
                        callback={(value) => {
                            setPagination(prevState => ({...prevState, page: 1, length: value}))
                            setGo(true)
                        }}
                        placeholder={pagination.length}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-neutral-300 dark:border-neutral-400 border-collapse text-sm">
                        <thead className="bg-gray-100 dark:bg-neutral-700">
                        <tr>
                            <th className="w-[15%] px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Package Name
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Interest Type
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Interest
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Price
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Purchase At
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Duration
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Status
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            purchaseListData.purchases.map((purchase) => (
                                <tr key={purchase.id} className={`hover:bg-gray-100 dark:hover:bg-neutral-600`}>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {pursePurchaseInfo(purchase.package_info)?.name}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400 capitalize">
                                        {pursePurchaseInfo(purchase.package_info)?.interest_type}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {pursePurchaseInfo(purchase.package_info)?.interest}%
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        TK.{purchase.amount}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {convertToLocalDateTime(purchase.created_at)}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {pursePurchaseInfo(purchase.package_info)?.duration_day + ' Day'}
                                    </td>
                                    <td className="px-4 py-2 capitalize font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {purchase.status}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>

                    <div className="py-3 sm:px-6">
                        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                            <Summary
                                page={purchaseListData.page}
                                length={purchaseListData.length}
                                count={purchaseListData.count}
                            />
                            <Navigation
                                page={pagination.page}
                                length={purchaseListData.length}
                                count={purchaseListData.count}
                                callback={cp => {
                                    setPagination(state => ({...state, page: cp}))
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
