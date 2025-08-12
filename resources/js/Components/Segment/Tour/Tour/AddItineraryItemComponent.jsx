import TextEditor from "@/Components/Utils/TextEditor/TextEditor.jsx";
import {useRef, useState} from "react";
import {FaPlusCircle} from "react-icons/fa";
import Button from "@/Components/Utils/Button/Button.jsx";
import {HiMinusCircle} from "react-icons/hi";
import {generateUniqueNumericId} from "@/helpers/helper.js";

export default function AddItineraryItemComponent({items, itineraryId, setData}){
    const [isHover, setIsHover] = useState(false)

    const handleItineraryItemInput = (e) => {
        const {id, name, value} = e.target

        setData(prevState => ({
            ...prevState,
            itineraries: prevState.itineraries.map((itinerary) => {
                if(itinerary.id.toString() !== itineraryId.toString()) return itinerary;

                return {
                    ...itinerary,
                    items: itinerary.items.map((item) => (
                        item.id.toString() === id.toString() ?
                            {...item, [name] : value} :
                            item
                    ))
                }
            })
        }))
    }


    const handleItemFileInput = (e) => {
        const file = e.target.files[0];
        const rawId = e.target.id;
        const id = rawId.replace('file-', '');

        setData(prevState => ({
            ...prevState,
            itineraries: prevState.itineraries.map((itinerary) => {
                if (itinerary.id.toString() !== itineraryId.toString()) return itinerary;

                return {
                    ...itinerary,
                    items: itinerary.items.map((item) =>
                        item.id.toString() === id.toString()
                            ? {
                                ...item,
                                image: file,
                                preview: URL.createObjectURL(file),
                            }
                            : item
                    ),
                };
            }),
        }));
    }


    const addItem = () => {
        setData(prev => ({
            ...prev,
            itineraries: prev.itineraries.map((itinerary) => {
                if(itinerary.id.toString() !== itineraryId.toString()) return itinerary

                return {
                    ...itinerary,
                    items: [
                        ...itinerary.items,
                        {
                            id: generateUniqueNumericId(),
                            title: '',
                            time: '',
                            description: '',
                            location: '',
                            scheduled_time: '',
                            image: ''
                        }
                    ]
                }
            })
        }))
    }


    const removeItem = (id) => {
        setData(prev => ({
            ...prev,
            itineraries: prev.itineraries.map((itinerary) => {
                if(itinerary.id.toString() !== itineraryId.toString()) return itinerary

                return {
                    ...itinerary,
                    items: itinerary.items.filter((item) => item.id.toString() !== id.toString())
                }
            })
        }))
    }

    return (
        <div className={`w-full h-full space-y-4`}>
            {
                items.map((item, i) => (
                    <div key={item.id} className="w-full h-full overflow-y-hidden border border-gray-300 dark:border-gray-400 bg-gray-100 dark:bg-[#595959] space-y-4">
                        <div className="w-full px-3 py-2 flex justify-between items-center border-b border-gray-300 dark:border-gray-200">
                            <h2 className={`text-lg text-gray-600 font-semibold dark:text-gray-200`}>Item : {i+1}</h2>
                            <div className={`flex gap-x-4 items-center`}>
                                {
                                    items.length - 1 === i && (
                                        <Button
                                            type="button"
                                            callback={() => addItem()}
                                            className="bg-blue-400 text-white max-w-[35px] max-h-[30px] justify-center gap-x-0 pl-1.5"
                                            icon={<FaPlusCircle className="size-4" />}
                                        />
                                    )
                                }

                                {
                                    items.length > 1 && (
                                        <Button
                                            type="button"
                                            callback={() => removeItem(item.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white max-w-[35px] max-h-[30px] justify-center gap-x-0 pl-1.5"
                                            icon={<HiMinusCircle className="size-5" />}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row justify-between gap-y-4 md:gap-x-4 px-5">
                            <div className="form-control">
                                <label htmlFor="title" className={`label`}>Title</label>
                                <input type="text" placeholder={`Enter Title`} id={item.id} value={item.title} name={'title'} onChange={handleItineraryItemInput} className={`input`}/>
                            </div>
                            <div className="form-control">
                                <label htmlFor="location" className={`label`}>Location</label>
                                <input type="text" id={item.id} name={`location`} value={item.location} placeholder={`Enter Location`} onChange={handleItineraryItemInput} className={`input`}/>
                            </div>
                            <div className="form-control">
                                <label htmlFor="time" className={`label`}>Schedule Time</label>
                                <input type="time" id={item.id} name={`scheduled_time`} value={item.scheduled_time} onChange={handleItineraryItemInput} className={`input`}/>
                            </div>
                        </div>
                        <div className="w-full px-5">
                            <div className="form-control">
                                <label htmlFor="description" className={`label`}>Description</label>
                                <TextEditor
                                    value={item.description}
                                    setValue={(value) =>
                                        handleItineraryItemInput({
                                            target: {
                                                id: item.id.toString(),
                                                name: 'description',
                                                value: value,
                                            },
                                        })
                                    }
                                    />
                            </div>
                        </div>
                        <div className="mb-3 w-[170px] h-[150px] px-5">
                            <div className="form-control w-full h-full">
                                <label htmlFor={`file-${item.id}`} className="label">
                                    Image <span className="text-xs text-gray-600 dark:text-gray-200">(Optional)</span>
                                </label>

                                <label
                                    onMouseEnter={() => setIsHover(true)}
                                    onMouseLeave={() => setIsHover(false)}
                                    htmlFor={`file-${item.id}`}
                                    className={`w-full h-full border border-gray-400 rounded-[2px] flex items-center justify-center text-gray-500 dark:text-gray-400 dark:bg-[#4C5056] text-sm cursor-pointer ${isHover ? 'bg-stripes animate-stripes' : ''}`}
                                >
                                    {item.preview ? (
                                        <img src={item.preview} alt="" className="w-full h-full object-fill" />
                                    ) : (
                                        <span>Upload File</span>
                                    )}
                                </label>

                                <input
                                    type="file"
                                    className="hidden"
                                    id={`file-${item.id}`}
                                    onChange={handleItemFileInput}
                                />
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}
