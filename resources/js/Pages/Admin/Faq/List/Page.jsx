import {useEffect, useState} from "react";
import {setPaginationFromSessionStorage} from "@/helpers/helper.js";
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
import {FaTrash} from "react-icons/fa";
import {HSOverlay} from "preline";
import SliderForm from "@/Components/Segment/Slider/SliderFrom.jsx";
import FaqForm from "@/Components/Segment/Faq/FaqFrom.jsx";


export default function Page({data: faqListData}){
    const {fileBase} = usePage().props
    const [pagination, setPagination] = useState({page: faqListData.page, length: faqListData.length})
    const [searchText, setSearchText] = useState('')
    const [go, setGo] = useState(false)
    const [faq, setFaq] = useState(null)
    const [alertData, setAlertData] = useState({route : '', color : '', method : '', text : ''});


    useEffect(() => {
        setPaginationFromSessionStorage(setPagination, 'faq_pagination', {
            page: faqListData?.page, length: faqListData?.length, status: faqListData.status, searchText: ""
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

            router.get(route('admin.faq.list', queryParams))

            sessionStorage.setItem('faq_pagination', JSON.stringify(pagination))
        }
    }, [go]);


    const editSlider = (faq, imagePath=null) => {
        setFaq({
            ...faq,
            imagePath
        })
        HSOverlay.open('#faq-form')
    }


    const deleteData = (id) => {
        setAlertData({
            ...alertData,
            route : `/faq/delete/${id}`,
            color : 'red',
            method : 'delete',
            text : 'Are you sure you want to delete this ?'
        })

        HSOverlay.open('#alert-modal')
    }


    return (
        <Main>
            <div className="flex items-center justify-between border-b border-gray-300 p-5">
                <div className="flex items-center gap-x-6">
                    <h2 className="font-medium text-xl leading-6 text-neutral-700 dark:text-neutral-300">FAQ</h2>
                </div>
                <button onClick={() => setFaq(null)} type="button"
                        className="py-1.5 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded bg-yellow-400 text-black hover:bg-yellow-500"
                        aria-haspopup="dialog" aria-expanded="false" aria-controls="faq-form"
                        data-hs-overlay="#faq-form">
                    Add New
                </button>
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
                        <StatusFilter status={faqListData.faqStatus} pagination={pagination} setPagination={setPagination} setGo={setGo} segment="Status" />

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
                                Question
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Answer
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Status
                            </th>
                            <th className="w-[10%] px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Action
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            faqListData.faqs.map((faq) => (
                                <tr key={faq.id} className={`hover:bg-gray-100 dark:hover:bg-neutral-600`}>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {faq.question}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {faq.answer}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        <select
                                            className={`py-1 px-2 border w-auto min-w-[150px] text-[14px] outline-none focus:ring-0 text-neutral-700 dark:text-neutral-600 border-neutral-300 dark:border-neutral-400`}
                                            value={faq.status}
                                            onChange={(e) => {
                                                router.post(route('admin.faq.change_status'), {
                                                    id: faq.id, status: e.target.value
                                                })
                                            }}
                                        >
                                            {Object.keys(faqListData.faqStatus).filter(key => key !== STATUS_DELETED).map((key) => {
                                                const statusText = faqListData.faqStatus[key];
                                                return <option key={key} value={key}>{statusText}</option>
                                            })}
                                        </select>
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        <div className="w-full flex gap-x-6">
                                            <button className="cursor-pointer text-white border-green-500"
                                                    onClick={() => editSlider(faq, fileBase + '/' + faq.image)}>
                                                <FaPencil className={`text-blue-400 text-lg`}/>
                                            </button>
                                            <button className=" cursor-pointer text-white border-green-500"
                                                    onClick={() => deleteData(faq.id)}>
                                                <FaTrash className={`text-red-400 text-lg`}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>

                    <div className="py-3 sm:px-6">
                        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                            <Summary
                                page={faqListData.page}
                                length={faqListData.length}
                                count={faqListData.count}
                            />
                            <Navigation
                                page={pagination.page}
                                length={faqListData.length}
                                count={faqListData.count}
                                callback={cp => {
                                    setPagination(state => ({...state, page: cp}))
                                    setGo(true)
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <Alert alertData={alertData} />
            <FaqForm faq={faq} setFaq={setFaq} />
        </Main>
)
}
