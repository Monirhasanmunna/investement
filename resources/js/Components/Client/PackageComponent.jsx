import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Grid, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
export default function PackageComponent(){
    const packages = [
        { name: 'Starter Plan', price: 'Tk4900', interest: '3.2% Daily', btn: 'Book Now' },
        { name: 'Platinum Plan', price: 'TK9900', interest: '3.4% Daily', btn: 'Book Now' },
        { name: 'Pro Plan', price: 'Tk14900', interest: '3.6% Daily', btn: 'Book Now' },
        { name: 'Elite Plan', price: 'TK19900', interest: '3.8% Daily', btn: 'Book Now' },
        { name: 'VIP Plan', price: 'TK30000', interest: '4% Daily', btn: 'Book Now' },
        { name: 'Diamond Plan', price: 'TK50000', interest: '4.8% Daily', btn: 'Book Now' },
    ];

    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-10">Our Investment Packages</h2>
            <Swiper
                modules={[Pagination, Navigation, Grid]}
                pagination={{ clickable: true }}
                navigation
                spaceBetween={20}
                autoplay={{ delay: 4000 }}
                loop
                slidesPerView={1}
                grid={{ rows: 2, fill: 'row' }}
                breakpoints={{
                    640: { slidesPerView: 2, grid: { rows: 2, fill: 'row' } },
                    1024: { slidesPerView: 3, grid: { rows: 2, fill: 'row' } }
                }}
            >
                {packages.map((pkg, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                                <p className="text-2xl font-bold text-green-600 mb-1">{pkg.price}</p>
                                <p className="text-gray-600 mb-4">Interest: {pkg.interest}</p>
                            </div>
                            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 mt-auto">{pkg.btn}</button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
