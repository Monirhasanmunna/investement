import {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {usePage} from "@inertiajs/react";

export default function SliderComponent({sliders}){
    const {fileBase} = usePage().props
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
                    {sliders.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="w-full h-full flex items-center justify-center text-center text-white"
                                style={{
                                    backgroundImage: `url(${fileBase}/${slide.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                {/*<div className=" w-full h-full flex flex-col justify-center items-center p-4">*/}
                                {/*    <h1 className="text-3xl sm:text-5xl font-bold mb-2">{slide.title}</h1>*/}
                                {/*    <p className="text-lg sm:text-xl">{slide.subtitle}</p>*/}
                                {/*</div>*/}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
