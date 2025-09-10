import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Grid, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import {router, usePage} from "@inertiajs/react";
export default function PackageComponent({packages}){
    const {auth} = usePage().props
    const handlePurchase = (packageId) => {
        if(auth.user && auth.user?.user_type === 'investor'){
            router.get(route('purchase', {packageId: packageId}))
        }
        else{
            router.get(route('user.login_page', {package_id: packageId}))
        }
    }
    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-10">Our Investment Packages</h2>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
                {packages.map((pkg, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                            <p className="text-2xl font-bold text-green-600 mb-1">{pkg.price.toFixed(2)}</p>
                            <p className="text-gray-600 mb-1 capitalize">
                                Interest: {pkg.interest.toFixed(2)}%
                            </p>
                            <p className="text-gray-600 mb-1 capitalize">
                                Profit: TK.{(( pkg.interest/100) * pkg.price).toFixed(2)} <span className={`capitalize`}>{pkg.interest_type}</span>
                            </p>
                            <p className="text-gray-600 mb-4">Duration: {pkg.duration_day + ' Day'}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => handlePurchase(pkg.id)}
                            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 mt-auto"
                        >
                            Purchase Now
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}
