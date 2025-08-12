import {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SliderComponent(){
    const heroSlides = [
        { title: 'Grow Your Wealth', subtitle: 'Invest smart, live better', img: 'https://via.placeholder.com/1200x500?text=Grow+Your+Wealth' },
        { title: 'Secure Future', subtitle: 'High returns, low risk', img: 'https://via.placeholder.com/1200x500?text=Secure+Future' },
        { title: 'Global Opportunities', subtitle: 'Invest beyond borders', img: 'https://via.placeholder.com/1200x500?text=Global+Opportunities' }
    ];


    return (
        <section className="w-full relative overflow-hidden">
            <div className="w-full">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop
                    className="h-[400px] sm:h-[500px]"
                >
                    {heroSlides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="w-full h-full flex items-center justify-center text-center text-white"
                                style={{
                                    backgroundImage: `url(${slide.img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="bg-black bg-opacity-40 w-full h-full flex flex-col justify-center items-center p-4">
                                    <h1 className="text-3xl sm:text-5xl font-bold mb-2">{slide.title}</h1>
                                    <p className="text-lg sm:text-xl">{slide.subtitle}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
