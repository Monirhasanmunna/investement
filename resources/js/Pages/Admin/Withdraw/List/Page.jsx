import {useEffect, useState} from "react";
import {convertToLocalDateTime, copyText, setPaginationFromSessionStorage} from "@/helpers/helper.js";
import Main from "@/Layouts/Dashboard/Main.jsx";
import {router, usePage} from "@inertiajs/react";
import LengthDropdown from "@/Components/Utils/Pagination/LengthDropdown.jsx";
import SearchBox from "@/Components/Utils/Pagination/SearchBox.jsx";
import StatusFilter from "@/Components/Utils/Pagination/StatusFilter.jsx";
import {STATUS_DELETED} from "@/helpers/const.js";
import Summary from "@/Components/Utils/Pagination/Summary.jsx";
import Navigation from "@/Components/Utils/Pagination/Navigation.jsx";
import Alert from "@/Components/Utils/Alert/Alert.jsx";
import {FaPencil} from "react-icons/fa6";
import {FaRegCopy, FaTrash} from "react-icons/fa";
import {HSOverlay} from "preline";
import SliderForm from "@/Components/Segment/Slider/SliderFrom.jsx";
import FaqForm from "@/Components/Segment/Faq/FaqFrom.jsx";


export default function Page({data: withdrawListData}){
    const [pagination, setPagination] = useState({page: withdrawListData.page, length: withdrawListData.length})
    const [searchText, setSearchText] = useState('')
    const [go, setGo] = useState(false)
    const [alertData, setAlertData] = useState({route : '', color : '', method : '', text : ''});


    useEffect(() => {
        setPaginationFromSessionStorage(setPagination, 'withdraw_pagination', {
            page: withdrawListData?.page, length: withdrawListData?.length, status: withdrawListData.status, searchText: ""
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

            router.get(route('admin.withdraw.list', queryParams))

            sessionStorage.setItem('withdraw_pagination', JSON.stringify(pagination))
        }
    }, [go]);


    return (
        <Main>
            <div className="flex items-center justify-between border-b border-gray-300 p-5">
                <div className="flex items-center gap-x-6">
                    <h2 className="font-medium text-xl leading-6 text-neutral-700 dark:text-neutral-300">Withdraw</h2>
                </div>
            </div>

            <div className="w-full p-5">
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 my-4 text-[.75rem]">
                    <LengthDropdown
                        callback={(value) => {
                            setPagination(prevState => ({...prevState, page: 1, length: value}))
                            setGo(true)
                        }}
                        placeholder={pagination.length}
                    />
                    <div className="flex items-center justify-start gap-3 flex-wrap">
                        <StatusFilter status={withdrawListData.withdrawStatus} pagination={pagination} setPagination={setPagination} setGo={setGo} segment="Status" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-neutral-300 dark:border-neutral-400 border-collapse text-sm">
                        <thead className="bg-gray-100 dark:bg-neutral-700">
                        <tr>
                            <th className="w-[15%] px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                User Name
                            </th>
                            <th className="w-[15%] px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Phone
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Date
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Withdraw Info
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Status
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            withdrawListData.withdraws.map((withdraw) => (
                                <tr key={withdraw.id} className={`hover:bg-gray-100 dark:hover:bg-neutral-600`}>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {withdraw.user?.name}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        Tk.{withdraw.amount}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {convertToLocalDateTime(withdraw.created_at)}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {
                                            withdraw.user?.withdraw_info && (
                                                <div className="w-full">
                                                    <h6>Number : {JSON.parse(withdraw.user.withdraw_info)?.account_number} <button onClick={() => copyText(JSON.parse(withdraw.user.withdraw_info)?.account_number ?? 'N/A')}><FaRegCopy className={`size-4`} /></button></h6>
                                                    <h6 className={`capitalize`}>Method : {JSON.parse(withdraw.user.withdraw_info)?.method}</h6>
                                                </div>
                                            )
                                        }
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        <select
                                            className={`py-1 px-2 border w-auto min-w-[150px] text-[14px] outline-none focus:ring-0 text-neutral-700 dark:text-neutral-600 border-neutral-300 dark:border-neutral-400`}
                                            value={withdraw.status}
                                            onChange={(e) => {
                                                router.post(route('admin.withdraw.change_status'), {
                                                    id: withdraw.id, status: e.target.value
                                                })
                                            }}
                                        >
                                            {Object.keys(withdrawListData.withdrawStatus).filter(key => key !== STATUS_DELETED).map((key) => {
                                                const statusText = withdrawListData.withdrawStatus[key];
                                                return <option key={key} value={key}>{statusText}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>

                    <div className="py-3 sm:px-6">
                        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                            <Summary
                                page={withdrawListData.page}
                                length={withdrawListData.length}
                                count={withdrawListData.count}
                            />
                            <Navigation
                                page={pagination.page}
                                length={withdrawListData.length}
                                count={withdrawListData.count}
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
