import {FaCross} from "react-icons/fa";
import {RxCross2, RxUpload} from "react-icons/rx";
import {useEffect, useRef, useState} from "react";
import {useForm, usePage} from "@inertiajs/react";
import {HSOverlay} from "preline";
import Button from "@/Components/Utils/Button/Button.jsx";

export default function ExclusionForm({exclusion, setExclusion}){
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
    });

    useEffect(() => {
        if(exclusion){
            setData({
                ...data,
                name: exclusion.name ?? '',
                id: exclusion.id ?? ''
            })
        } else {
            setData({
                name: '',
            })
        }
    }, [exclusion])


    const handleTextInput = (e) => {
        const {id,value} = e.target

        setData(prevState => ({
            ...prevState,
            [id]: value
        }))
    }


    const handleSubmitForm = (e) => {
        e.preventDefault();

        if(!exclusion){
            post(route('admin.tour.exclusion.store'), {
                preserveState: true,
                preserveScroll: true,
                onError: () => HSOverlay.open('#exclusion-form'),
                onSuccess: () => {
                    HSOverlay.close('#exclusion-form')
                    resetData()
                    setExclusion(null)
                }
            })
        }else{
            post(route('admin.tour.exclusion.update'), {
                preserveState: true,
                preserveScroll: true,
                onError: () => HSOverlay.open('#exclusion-form'),
                onSuccess: () => {
                    HSOverlay.close('#exclusion-form')
                    resetData()
                    setExclusion(null)
                }
            })
        }
    }

    const resetData = () => {
        setData({
            name: ''
        })
    }

    return (
        <div id="exclusion-form"
             className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none"
             role="dialog" tabIndex="-1" aria-labelledby="exclusion-form-label">
            <div
                className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-56px)] flex items-center">
                <div
                    className="w-full flex flex-col bg-white border border-gray-200 shadow-2xs rounded-sm pointer-events-auto dark:bg-neutral-800 dark:border-neutral-600 dark:shadow-neutral-700/70">
                    <div
                        className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-600">
                        <h3 id="exclusion-form-label" className="font-bold text-gray-800 text-md dark:text-white">
                            {exclusion ? 'Update': 'Create'} Form
                        </h3>
                        <button type="button"
                                onClick={(e) => {
                                    resetData()
                                }}
                                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-200 dark:focus:bg-neutral-600"
                                aria-label="Close" data-hs-overlay="#exclusion-form">
                            <RxCross2 className={`size-4`} />
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        <form onSubmit={handleSubmitForm}  className={`w-full space-y-2`}>
                            <div className="form-control">
                                <label htmlFor="name" className={`label`}>Name <span className={`text-xs text-red-600`}>*</span></label>
                                <input type="text" id={`name`} value={data.name} onChange={handleTextInput} className={`input`} placeholder={`Enter name`}/>
                            </div>

                            <div className="form-control pt-4">
                                <div className="w-full flex gap-x-4">
                                    <Button buttonText={!exclusion ? 'Create' : 'Update'} isLoading={processing} />
                                    <Button
                                        buttonText={'Cancel'}
                                        type={`button`}
                                        callback={() => HSOverlay.close("#exclusion-form")}
                                        className={`bg-red-500 text-white rounded hover:bg-red-600 duration-150`}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
