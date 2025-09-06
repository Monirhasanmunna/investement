import {useEffect, useState} from "react";
import {copyText, setPaginationFromSessionStorage} from "@/helpers/helper.js";
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


export default function Page({data: userListData}){
    const [pagination, setPagination] = useState({page: userListData.page, length: userListData.length})
    const [searchText, setSearchText] = useState('')
    const [go, setGo] = useState(false)

    useEffect(() => {
        setPaginationFromSessionStorage(setPagination, 'user_pagination', {
            page: userListData?.page, length: userListData?.length, status: userListData.status, searchText: ""
        }, )
    }, []);

    useEffect(() => {
        if (pagination.searchText !== searchText) {
            setSearchText(pagination.searchText)
        }
    }, [pagination]);


    useEffect(() => {
        if (pagination?.page && pagination?.length && go) {
            console.log('search')
            setGo(false)
            const queryParams = {
                page: pagination.page,
                length: pagination.length,
            };

            if (pagination.status) queryParams.status = pagination.status;
            if (pagination.searchText) queryParams.search = pagination.searchText;

            router.get(route('admin.user.list', queryParams))

            sessionStorage.setItem('user_pagination', JSON.stringify(pagination))
        }
    }, [go]);


    return (
        <Main>
            <div className="flex items-center justify-between border-b border-gray-300 p-5">
                <div className="flex items-center gap-x-6">
                    <h2 className="font-medium text-xl leading-6 text-neutral-700 dark:text-neutral-300">User</h2>
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
                    <div className="flex justify-start gap-3 flex-wrap">
                        <SearchBox
                            searchText={searchText}
                            onInputChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                            onSearch={() => {
                                setPagination((state) => ({ ...state, page: 1, searchText }));
                                setGo(true);
                            }}
                            onSearchCancel={() => {
                                setSearchText("");
                                setPagination((state) => ({ ...state, page: 1, searchText: "" }));
                                setGo(true);
                            }}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-neutral-300 dark:border-neutral-400 border-collapse text-sm">
                        <thead className="bg-gray-100 dark:bg-neutral-700">
                        <tr>
                            <th className="w-[15%] px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Name
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Phone
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Withdraw Info
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            userListData.users.map((user) => (
                                <tr key={user.id} className={`hover:bg-gray-100 dark:hover:bg-neutral-600`}>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {user.name}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {user.phone}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {
                                            user.withdraw_info && (
                                                <div className="w-full">
                                                    <h6>Number : {JSON.parse(user.withdraw_info)?.account_number} <button onClick={() => copyText(JSON.parse(user.withdraw_info)?.account_number ?? 'N/A')}><FaRegCopy className={`size-4`} /></button></h6>
                                                    <h6 className={`capitalize`}>Method : {JSON.parse(user.withdraw_info)?.method}</h6>
                                                </div>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>

                    <div className="py-3 sm:px-6">
                        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                            <Summary
                                page={userListData.page}
                                length={userListData.length}
                                count={userListData.count}
                            />
                            <Navigation
                                page={pagination.page}
                                length={userListData.length}
                                count={userListData.count}
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
