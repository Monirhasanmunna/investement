import Main from "@/Layouts/Dashboard/Main.jsx";
import {useForm} from "@inertiajs/react";
import Button from "@/Components/Utils/Button/Button.jsx";
import {useEffect} from "react";
import {deepUpdate} from "@/helpers/helper.js";
export default function Page({data: settingData}){
    const {settings} = settingData

    const {data, setData, post, processing, errors} = useForm({
        payment_info: {
            bkash_number_1 : '',
            bkash_number_2 : '',
            nagad_number_1: '',
            nagad_number_2: '',
        }
    });


    useEffect(() => {
        setData((prev) => {
            const safeParse = (key) => {
                const setting = settings.find((s) => s.key === key);
                return setting?.value ? JSON.parse(setting.value) : null;
            };

            let updated = {...prev};

            Object.keys(prev).forEach((key) => {
                const value = safeParse(key);
                if (value) {
                    updated[key] = deepUpdate(prev[key], value);
                }
            });

            return updated;
        });
    }, []);

    const handleFormInput = (e) => {
        const {id, name, value} = e.target

        setData(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                [id]: value
            }
        }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        post(route('admin.setting.update'))
    }

    return (
        <Main>
            <div className="flex items-center justify-between border-b border-gray-300 p-5">
                <div className="flex items-center gap-x-6">
                    <h2 className="font-medium text-xl leading-6 text-neutral-700 dark:text-neutral-300">App Setting</h2>
                </div>
            </div>

            <div className="w-full">
                <div className="w-4/12 p-3">
                    <form onSubmit={handleFormSubmit} className={`w-full space-y-3`}>
                        <div className="form-control">
                            <label htmlFor="bkash" className={`label`}>Bkash Number 1 (Personal)</label>
                            <input type="text" className={`input`} id='bkash_number_1' name='payment_info' placeholder='Enter Bkash Number 1' value={data.payment_info.bkash_number_1} onChange={handleFormInput} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="bkash" className={`label`}>Bkash Number 2</label>
                            <input type="text" className={`input`} id='bkash_number_2' name='payment_info' placeholder='Enter Bkash Number 2' value={data.payment_info.bkash_number_2} onChange={handleFormInput} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="nagad" className={`label`}>Nagad Number 1 (Personal)</label>
                            <input type="text" className={`input`} id='nagad_number_1' name='payment_info' placeholder='Enter Nagad Number 1' value={data.payment_info.nagad_number_1} onChange={handleFormInput} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="nagad" className={`label`}>Nagad Number 2</label>
                            <input type="text" className={`input`} id='nagad_number_2' name='payment_info' placeholder='Enter Nagad Number 2' value={data.payment_info.nagad_number_2} onChange={handleFormInput} />
                        </div>
                        <div className="form-control">
                            <Button type={'submit'} buttonText={'Update'} isLoading={processing} />
                        </div>
                    </form>
                </div>
            </div>
        </Main>
)
}
