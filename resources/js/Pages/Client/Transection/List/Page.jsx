import {useEffect, useState} from "react";
import {convertToLocalDateTime, setPaginationFromSessionStorage} from "@/helpers/helper.js";
import {router} from "@inertiajs/react";
import LengthDropdown from "@/Components/Utils/Pagination/LengthDropdown.jsx";
import StatusFilter from "@/Components/Utils/Pagination/StatusFilter.jsx";
import Summary from "@/Components/Utils/Pagination/Summary.jsx";
import Navigation from "@/Components/Utils/Pagination/Navigation.jsx";
import Main from "@/Layouts/Client/Dashboard/Main.jsx";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";


export default function Page({data: transectionListData}){
    const [pagination, setPagination] = useState({page: transectionListData.page, length: transectionListData.length})
    const [go, setGo] = useState(false)


    useEffect(() => {
        setPaginationFromSessionStorage(setPagination, 'client_transection_pagination', {
            page: transectionListData?.page, length: transectionListData?.length, type: transectionListData.type, searchText: ""
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
            if (pagination.searchText) queryParams.search = pagination.searchText;

            router.get(route('client.transection.list', queryParams))

            sessionStorage.setItem('client.transection.list', JSON.stringify(pagination))
        }
    }, [go]);

    console.log(transectionListData)

    return (
        <Main>
            <div className="w-full p-5">
                <div className="flex justify-between  items-center my-4 text-[.75rem]">
                    <div className="flex items-center gap-x-6">
                        <h2 className="font-medium text-xl leading-6 text-neutral-700 dark:text-neutral-300">Transections</h2>
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
                            {transectionListData.transections.map((transection) => (
                                <tr
                                    key={transection.id}
                                    className="hover:bg-gray-100 dark:hover:bg-neutral-600"
                                >
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400 whitespace-nowrap">
                                        {convertToLocalDateTime(transection.created_at)}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400 whitespace-nowrap">
                                        <div className="w-full flex gap-1 items-center">
                                            {
                                                transection.type === 'investment' ? (
                                                    <span><FaArrowUp className={`size-3 text-green-500`} /></span>
                                                ) : (
                                                    <span><FaArrowDown  className={`size-3 text-red-600`} /></span>
                                                )
                                            }
                                            <span>{transection.amount}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 capitalize font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400 whitespace-nowrap">
                                        {transection.type}
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
                                page={transectionListData.page}
                                length={transectionListData.length}
                                count={transectionListData.count}
                            />
                            <Navigation
                                page={pagination.page}
                                length={transectionListData.length}
                                count={transectionListData.count}
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
