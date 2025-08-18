import Main from "@/Layouts/Client/Main.jsx";

export default function Page({data:packageData}) {

    console.log(packageData)
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
                        <p>📱 বিকাশ নাম্বার: <span className="font-bold">017XXXXXXXX</span></p>
                        <p>📱 নগদ নাম্বার: <span className="font-bold">018XXXXXXXX</span></p>
                        <p>🏦 ব্যাংক একাউন্ট নাম্বার: <span className="font-bold">1234567890</span></p>
                    </div>

                    <form action="#" method="POST" className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">ট্রানজ্যাকশন আইডি</label>
                            <input type="text" name="trx_id" placeholder="ট্রানজ্যাকশন আইডি লিখুন"
                                   className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"/>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">রেফারেন্স নাম</label>
                            <input type="text" name="reference_name" placeholder="রেফারেন্স নাম লিখুন"
                                   className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"/>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">যে নাম্বার থেকে টাকা পাঠিয়েছেন</label>
                            <input type="text" name="sender_number" placeholder="মোবাইল নাম্বার লিখুন"
                                   className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"/>
                        </div>

                        <button type="submit"
                                className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition">
                            সাবমিট করুন
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-6 text-center">আপনার প্রদত্ত তথ্য যাচাই করার পর আপনার
                        ইনভেস্টমেন্ট প্যাকেজ সক্রিয় করা হবে।</p>
                </div>
            </div>
        </Main>
    )
}
