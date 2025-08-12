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
import DestinationForm from "@/Components/Segment/Tour/Destination/DestinationFrom.jsx";
import Alert from "@/Components/Utils/Alert/Alert.jsx";
import {FaPencil} from "react-icons/fa6";
import {FaTrash, FaTrashRestore} from "react-icons/fa";
import {HSOverlay} from "preline";


export default function Page({data: destinationListData}){
    const {fileBase} = usePage().props
    const [pagination, setPagination] = useState({page: destinationListData.page, length: destinationListData.length})
    const [searchText, setSearchText] = useState('')
    const [go, setGo] = useState(false)
    const [destination, setDestination] = useState(null)
    const [alertData, setAlertData] = useState({route : '', color : '', method : '', text : ''});


    useEffect(() => {
        setPaginationFromSessionStorage(setPagination, 'tour_destination_pagination', {
            page: destinationListData?.page, length: destinationListData?.length, status: destinationListData.status, searchText: ""
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

            router.get(route('admin.tour.destination.list', queryParams))

            sessionStorage.setItem('tour_destination_pagination', JSON.stringify(pagination))
        }
    }, [go]);


    const editDestination = (destination, imagePath=null) => {
        setDestination({
            ...destination,
            imagePath
        })
        HSOverlay.open('#destination-form')
    }


    const alert = (id, type) => {
        if(type === 'delete'){
            setAlertData({
                ...alertData,
                route : `/tour/destination/delete/${id}`,
                color : 'red',
                method : 'delete',
                text : 'Are you sure you want to delete this ?'
            })
        }else if(type === 'post'){
            setAlertData({
                ...alertData,
                route : `/tour/destination/restore/${id}`,
                color : 'blue',
                method : 'post',
                text : 'Are you sure you want to restore this ?'
            })
        }

        HSOverlay.open('#alert-modal')
    }

    return (
        <Main>
            <div className="flex items-center justify-between border-b border-gray-300 p-5">
                <div className="flex items-center gap-x-6">
                    <h2 className="font-medium text-xl leading-6 text-neutral-700 dark:text-neutral-300">Destination</h2>
                </div>
                <button onClick={() => setDestination(null)} type="button"
                        className="py-1.5 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded bg-yellow-400 text-black hover:bg-yellow-500"
                        aria-haspopup="dialog" aria-expanded="false" aria-controls="destination-form"
                        data-hs-overlay="#destination-form">
                    Add New
                </button>
            </div>

            <div className="w-full p-5">
                <div className="flex justify-between  items-center my-4 text-[.75rem]">
                    <LengthDropdown
                        callback={(value) => {
                            setPagination(prevState => ({...prevState, page: 1, length: value}))
                            setGo(true)
                        }}
                        placeholder={pagination.length}
                    />
                    <div className="flex items-center justify-end gap-3 flex-wrap">
                        <StatusFilter status={destinationListData.destinationStatus} pagination={pagination} setPagination={setPagination} setGo={setGo} segment="Destination" />

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
                                Image
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                Name
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
                            destinationListData.destinations.map((destination) => (
                                <tr key={destination.id} className={`hover:bg-gray-100 dark:hover:bg-neutral-600 ${destination.status === STATUS_DELETED ? 'bg-red-300 hover:bg-red-300 dark:hover:bg-red-300' : ''}`}>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        <div className="w-[90px] h-[50px] border border-gray-300">
                                            <img src={fileBase + '/' + destination.image} className={`w-full h-full object-cover`} alt="destination"/>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {destination.name}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        {
                                            destination.status === STATUS_DELETED ? (<span className={`capitalize`}>{destination.status}</span>) : (
                                                <select
                                                    className={`py-1 px-2 border w-auto min-w-[150px] text-[14px] outline-none focus:ring-0 text-neutral-700 dark:text-neutral-600 border-neutral-300 dark:border-neutral-400`}
                                                    value={destination.status}
                                                    onChange={(e) => {
                                                        router.post(route('admin.tour.destination.change_status'), {
                                                            id: destination.id, status: e.target.value
                                                        })
                                                    }}
                                                >
                                                    {Object.keys(destinationListData.destinationStatus).filter(key => key !== STATUS_DELETED).map((key) => {
                                                        const statusText = destinationListData.destinationStatus[key];
                                                        return <option key={key} value={key}>{statusText}</option>
                                                    })}
                                                </select>
                                            )
                                        }
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-400">
                                        <div className="w-full flex gap-x-6">
                                            {
                                                destination.status !== STATUS_DELETED ? <>
                                                    <button className="cursor-pointer text-white border-green-500"
                                                            onClick={() => editDestination(destination, fileBase + '/' + destination.image)}>
                                                        <FaPencil className={`text-blue-400 text-lg`}/>
                                                    </button>
                                                    <button className=" cursor-pointer text-white border-green-500"
                                                            onClick={() => alert(destination.id, 'delete')}>
                                                        <FaTrash className={`text-red-400 text-lg`}/>
                                                    </button>
                                                </> : <>
                                                    <button type="button" className="cursor-pointer text-white border-green-500"
                                                            onClick={() => alert(destination.id, 'post')}>
                                                        <FaTrashRestore className={`text-blue-400 text-lg`} />
                                                    </button>
                                                </>
                                            }
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
                                page={destinationListData.page}
                                length={destinationListData.length}
                                count={destinationListData.count}
                            />
                            <Navigation
                                page={pagination.page}
                                length={destinationListData.length}
                                count={destinationListData.count}
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
            <DestinationForm destination={destination} setDestination={setDestination} />
        </Main>
)
}
