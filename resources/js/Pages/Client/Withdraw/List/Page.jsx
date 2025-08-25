import {useEffect, useMemo, useState} from "react";
import {convertToLocalDateTime, setPaginationFromSessionStorage} from "@/helpers/helper.js";
import {router} from "@inertiajs/react";
import LengthDropdown from "@/Components/Utils/Pagination/LengthDropdown.jsx";
import Summary from "@/Components/Utils/Pagination/Summary.jsx";
import Navigation from "@/Components/Utils/Pagination/Navigation.jsx";
import Main from "@/Layouts/Client/Dashboard/Main.jsx";
import Button from "@/Components/Utils/Button/Button.jsx";
import WithdrawForm from "@/Components/Segment/Client/Withdraw/WithdrawFrom.jsx";


export default function Page({data: withdrawListData}){
    const [pagination, setPagination] = useState({page: withdrawListData.page, length: withdrawListData.length})
    const [go, setGo] = useState(false)


    useEffect(() => {
        setPaginationFromSessionStorage(setPagination, 'client_withdraw_pagination', {
            page: withdrawListData?.page, length: withdrawListData?.length, type: withdrawListData.type, searchText: ""
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

            router.get(route('client.withdraw.list', queryParams))

            sessionStorage.setItem('client_withdraw_pagination', JSON.stringify(pagination))
        }
    }, [go]);

    const totalAmount = useMemo(() => withdrawListData.withdraws.reduce((sum, withdraw) => sum + Number(withdraw.amount), 0), [withdrawListData.withdraws])

    return (
        <Main>
            <div className="w-full p-5">
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 my-4 text-[.75rem]">
                    <div className="flex items-center gap-x-6">
                        <h2 className="font-medium text-xl leading-6 text-neutral-700 dark:text-neutral-300">Withdraw (Tk.{totalAmount})</h2>
                    </div>
                    <div className="gap-2 flex">
                        <LengthDropdown
                            callback={(value) => {
                                setPagination(prevState => ({...prevState, page: 1, length: value}))
                                setGo(true)
                            }}
                            placeholder={pagination.length}
                        />
                        <Button className={`bg-blue-500 text-white`} buttonText={'Withdraw'} callback={() => HSOverlay.open('#withdraw-form')} />
                    </div>
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
                                    Status
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                                {withdrawListData.withdraws.map((wallet) => (
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
                                            {wallet.status}
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
                                page={withdrawListData.page}
                                length={withdrawListData.length}
                                count={withdrawListData.count}
                            />
                            <Navigation
                                page={pagination.page}
                                length={withdrawListData.length}
                                count={withdrawListData.count}
                                callback={(cp) => {
                                    setPagination((state) => ({ ...state, page: cp }))
                                    setGo(true)
                                }}
                            />
                        </div>
                    </div>
                </div>

                <WithdrawForm totalWithdrawalAmount={withdrawListData.totalWithdrawalAmount} />
            </div>
        </Main>
)
}
