import Main from "@/Layouts/Client/Main.jsx";
import {useForm} from "@inertiajs/react";
import Button from "@/Components/Utils/Button/Button.jsx";
import InputError from "@/Components/InputError.jsx";
import {useMemo} from "react";

export default function Page({data:packageData}) {
    const {data, setData, post, processing, errors} = useForm({
        package_id: packageData.package?.id,
        trx_id: '',
        reference_name: '',
        reference_phone: ''
    });

    const payment_setting = useMemo(() => {
        if (packageData.appSetting?.payment_info?.value) {
            return JSON.parse(packageData.appSetting.payment_info.value);
        }
        return {};
    }, [packageData.appSetting?.payment_info?.value]);


    const handleFormInput = (e) => {
        const {id, value} = e.target

        setData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        post(route('purchase.store'))
    }

    return (
        <Main>
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
                <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-6 md:p-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">প্যাকেজ ক্রয়</h1>

                    <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">প্যাকেজ: {packageData.package.name}</h2>
                        <p className="text-gray-700">মূল্য: <span className="font-bold">৳{packageData.package.price}</span></p>
                        <p className="text-gray-700 capitalize">ইন্টারেস্ট: <span className="font-bold">{packageData.package.interest}%</span> {packageData.package.interest_type}</p>
                    </div>

                    <div className="mb-6 text-gray-700 space-y-2">
                        <p className="text-lg font-semibold">পেমেন্ট তথ্য:</p>
                        <p>📱 বিকাশ নাম্বার: <span className="font-bold">{payment_setting.bkash_number}</span></p>
                        <p>📱 নগদ নাম্বার: <span className="font-bold">{payment_setting.nagad_number}</span></p>
                        <p>🏦 ব্যাংক একাউন্ট নাম্বার: <span className="font-bold">{payment_setting.bank_account}</span></p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">ট্রানজ্যাকশন আইডি</label>
                            <input type="text" name="trx_id" id="trx_id" value={data.trx_id} onChange={handleFormInput} placeholder="ট্রানজ্যাকশন আইডি লিখুন" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"/>
                            <InputError message={errors.trx_id} className="mt-2" />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">রেফারেন্স নাম</label>
                            <input type="text" name="reference_name" id="reference_name" value={data.reference_name} onChange={handleFormInput} placeholder="রেফারেন্স নাম লিখুন" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"/>
                            <InputError message={errors.reference_name} className="mt-2" />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">যে নাম্বার থেকে টাকা পাঠিয়েছেন</label>
                            <input type="text" name="reference_phone" id="reference_phone" value={data.reference_phone} onChange={handleFormInput} placeholder="মোবাইল নাম্বার লিখুন" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"/>
                            <InputError message={errors.reference_phone} className="mt-2" />
                        </div>

                        <Button
                            className={`w-full bg-indigo-600 text-white font-semibold py-5 rounded-lg hover:bg-indigo-700 transition`}
                            isLoading={processing}
                            buttonText={`সাবমিট করুন`}
                        />
                    </form>

                    <p className="text-sm text-gray-500 mt-6 text-center">আপনার প্রদত্ত তথ্য যাচাই করার পর আপনার
                        ইনভেস্টমেন্ট প্যাকেজ সক্রিয় করা হবে।</p>
                </div>
            </div>
        </Main>
    )
}
