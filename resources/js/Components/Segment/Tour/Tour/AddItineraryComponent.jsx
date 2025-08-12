import TextEditor from "@/Components/Utils/TextEditor/TextEditor.jsx";
import {RxCross2, RxCrossCircled} from "react-icons/rx";
import {useRef} from "react";
import AddItineraryItemComponent from "@/Components/Segment/Tour/Tour/AddItineraryItemComponent.jsx";
import Button from "@/Components/Utils/Button/Button.jsx";
import {CiCirclePlus} from "react-icons/ci";
import {FaPlusCircle} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import {HiMinusCircle} from "react-icons/hi";
import {generateUniqueNumericId} from "@/helpers/helper.js";

export default function AddItineraryComponent({data, setData}){

    const handleItineraryInput = (e) => {
        const {id, name, value} = e.target

        setData(prevState => ({
            ...prevState,
            itineraries: prevState.itineraries.map(itinerary =>
                itinerary.id.toString() === id
                    ? { ...itinerary, [name]: value }
                    : itinerary
            )
        }))
    }


    const addItinerary = () => {
        setData(prev => ({
            ...prev,
            itineraries: [
                ...prev.itineraries,
                {
                    id: generateUniqueNumericId(),
                    name: '',
                    items: [
                        {
                            id: generateUniqueNumericId(),
                            title: '',
                            time: '',
                            description: '',
                            location: '',
                            scheduled_time: '',
                            image: ''
                        },
                    ]
                },
            ]
        }))
    }


    const removeItinerary = (id) => {
        setData(prev => ({
            ...prev,
            itineraries: prev.itineraries.filter((itinerary) => itinerary.id.toString() !== id.toString())
        }))
    }

    return (
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
            {data.itineraries.map((itinerary, i) => (
                <div key={itinerary.id} className="w-full h-full border border-gray-300 dark:border-gray-200 shadow">
                    <div className="w-full px-5 py-3 flex justify-between items-center border-b border-gray-300 dark:border-gray-200">
                        <h2 className="text-lg text-gray-600 font-semibold dark:text-gray-400">Itinerary : {i + 1}</h2>
                        <div className={`flex gap-x-4 items-center`}>
                            {
                                data.itineraries.length - 1 === i && (
                                    <Button
                                        type="button"
                                        callback={() => addItinerary()}
                                        className="bg-blue-400 text-white max-w-[35px] max-h-[30px] justify-center gap-x-0 pl-1.5"
                                        icon={<FaPlusCircle className="size-4" />}
                                    />
                                )
                            }

                            {
                                data.itineraries.length > 1 && (
                                    <Button
                                        type="button"
                                        callback={() => removeItinerary(itinerary.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white max-w-[35px] max-h-[30px] justify-center gap-x-0 pl-1.5"
                                        icon={<HiMinusCircle className="size-5" />}
                                    />
                                )
                            }
                        </div>
                    </div>

                    <div className="form-control px-5 py-3">
                        <label htmlFor="name" className="label">Name</label>
                        <input
                            type="text"
                            id={itinerary.id}
                            name="name"
                            placeholder="Enter Name"
                            className="input"
                            value={itinerary.name}
                            onChange={handleItineraryInput}
                        />
                    </div>

                    <div className="w-full max-h-[600px] overflow-y-auto p-5">
                        <AddItineraryItemComponent
                            items={itinerary.items}
                            itineraryId={itinerary.id}
                            setData={setData}
                        />
                    </div>
                </div>
            ))}
        </div>

    )
}
