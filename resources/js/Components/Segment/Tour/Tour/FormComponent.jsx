import SelectComponent from "@/Components/Utils/Select/SelectComponent.jsx";
import TextEditor from "@/Components/Utils/TextEditor/TextEditor.jsx";
import ImageUploader from "@/Components/Dashboard/Tour/ImageUploader.jsx";
import Button from "@/Components/Utils/Button/Button.jsx";

export default function FormComponent(
    {
        data,
        setData,
        handleInputValue,
        addImage,
        removeImage,
        bookingTypeOptions,
        destinationOptions,
        discountTypeOptions,
        exclusionOptions,
        inclusionOptions,
        tagOptions,
        forEdit = false
    }
){
    return (
        <>
            <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4 items-center">
                <div className="form-control">
                    <label htmlFor="title" className={`label`}>Title <span className={`text-sm text-red-600`}>*</span></label>
                    <input type="text" className={`input`} id={`title`} value={data.title} onChange={handleInputValue} placeholder={`Enter title`}/>
                </div>
                <div className="form-control">
                    <label htmlFor="location" className={`label`}>Location <span className={`text-sm text-red-600`}>*</span></label>
                    <input type="text" className={`input`} id={`location`} value={data.location} onChange={handleInputValue} placeholder={`Enter location`}/>
                </div>
                <div className="form-control">
                    <label htmlFor="min_person" className={`label`}>Min. Person <span className={`text-sm text-red-600`}>*</span></label>
                    <input type="number" className={`input`} id={`min_person`} value={data.min_person} onChange={handleInputValue} placeholder={`Enter Min. person`}/>
                </div>
                <div className="form-control">
                    <label htmlFor="max_person" className={`label`}>Max. Person <span className={`text-sm text-red-600`}>*</span></label>
                    <input type="number" className={`input`} id={`max_person`} value={data.max_person} onChange={handleInputValue} placeholder={`Enter Max. person`}/>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4 mt-5 items-center">
                <div className="form-control">
                    <label htmlFor="destination" className={`label`}>Destination <span className={`text-sm text-red-600`}>*</span></label>
                    <SelectComponent options={destinationOptions} defaultValue={data.destination_id} onChange={(value) => setData('destination_id', value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="tags" className={`label`}>Tags <span className={`text-sm text-red-600`}>*</span></label>
                    <SelectComponent options={tagOptions} defaultValue={data.tag_ids} onChange={(value) => setData('tag_ids', value)} multiple={true} />
                </div>
                <div className="form-control">
                    <label htmlFor="inclusions" className={`label`}>Inclusions <span className={`text-sm text-red-600`}>*</span></label>
                    <SelectComponent options={inclusionOptions} defaultValue={data.inclusion_ids} onChange={(value) => setData('inclusion_ids', value)} multiple={true} />
                </div>
                <div className="form-control">
                    <label htmlFor="exclusions" className={`label`}>Exclusions <span className={`text-sm text-red-600`}>*</span></label>
                    <SelectComponent options={exclusionOptions} defaultValue={data.exclusion_ids} onChange={(value) => setData('exclusion_ids', value)} multiple={true} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4 mt-5 items-center">
                <div className="form-control">
                    <label htmlFor="price_per_person" className={`label`}>Price Per Person <span className={`text-sm text-red-600`}>*</span></label>
                    <input type="number" className={`input`} id={`price_per_person`} value={data.price_per_person} onChange={handleInputValue} placeholder={`Enter price per person`}/>
                </div>
                <div className="form-control">
                    <label htmlFor="booking_type" className={`label`}>Booking Type <span className={`text-sm text-red-600`}>*</span></label>
                    <SelectComponent options={bookingTypeOptions} defaultValue={data.booking_type} onChange={(value) => setData('booking_type', value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="discount_type" className={`label`}>Discount Type <span className={`text-sm text-red-600`}>*</span></label>
                    <SelectComponent options={discountTypeOptions} defaultValue={data.discount_type} onChange={(value) => setData('discount_type', value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="discount" className={`label`}>Discount <span className={`text-sm text-red-600`}>*</span></label>
                    <input type="number" className={`input`} id={`discount`} value={data.discount} onChange={handleInputValue} placeholder={`Enter discount`}/>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4 mt-5 items-center">
                <div className="form-control">
                    <label htmlFor="start_date" className={`label`}>Start Date <span className={`text-sm text-red-600`}>*</span></label>
                    <input type="date" className={`input`} id={`start_date`} value={data.start_date} onChange={handleInputValue}/>
                </div>
                <div className="form-control">
                    <label htmlFor="end_date" className={`label`}>End Date <span className={`text-sm text-red-600`}>*</span></label>
                    <input type="date" className={`input`} id={`end_date`} value={data.end_date} onChange={handleInputValue}/>
                </div>
                <div className="form-control">
                    <label htmlFor="pickup_time" className={`label`}>Pickup Time <span className={`text-sm text-red-600`}>*</span></label>
                    <input type="time" className={`input`} id={`pickup_time`} value={data.pickup_time} onChange={handleInputValue}/>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4 mt-5 items-center">
                <div className="form-control max-w-full md:max-w-2/4 ">
                    <label htmlFor="description" className={`label`}>Description <span className={`text-sm text-red-600`}>*</span></label>
                    <TextEditor value={data.description} setValue={(value) => setData('description', value)} />
                </div>
                <div className="form-control max-w-full md:max-w-2/4">
                    <label htmlFor="policy" className={`label`}>Policy <span className={`text-sm text-red-600`}>*</span></label>
                    <TextEditor value={data.policy} setValue={(value) => setData('policy', value)} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4 mt-5 items-center">
                <div className="form-control max-w-full md:max-w-2/4">
                    <label htmlFor="additionalInfo" className={`label`}>Additional Info. <span className={`text-sm text-red-600`}>*</span></label>
                    <TextEditor value={data.additional_info} setValue={(value) => setData('additional_info', value)} />
                </div>
                <div className="form-control max-w-full md:max-w-2/4">
                    <label htmlFor="travelTips" className={`label`}>Travel Tips <span className={`text-sm text-red-600`}>*</span></label>
                    <TextEditor value={data.travel_tips} setValue={(value) => setData('travel_tips', value)} />
                </div>
            </div>
            <div className="w-full flex flex-wrap items-center gap-4 mt-5">
                {
                    data.images.map((image, i) => (
                        <div key={image.id} className={`w-[130px] h-[150px] relative shrink-0`}>
                            <ImageUploader
                                id={image.id}
                                setData={setData}
                                images={data.images}
                                removeImage={removeImage}
                                previewImage={forEdit ? image.path : null}
                                isEdit={forEdit}
                            />
                            { i === data.images.length - 1 && (
                                <button type='button'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addImage();
                                        }}
                                        className={`h-[30px] w-[30px] flex items-center justify-center bg-blue-500 text-white absolute bottom-[-33px] right-[0px] md:bottom-[0px] md:right-[-33px] text-[25px] cursor-pointer`}
                                >
                                    +
                                </button>
                            )}
                        </div>
                    ))
                }
            </div>
        </>
    )
}
