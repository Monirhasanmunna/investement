import {useEffect, useState} from "react";

export default function SliderComponent(){
    const heroSlides = [
        { title: 'Grow Your Wealth', subtitle: 'Invest smart, live better', img: 'https://via.placeholder.com/1200x500?text=Grow+Your+Wealth' },
        { title: 'Secure Future', subtitle: 'High returns, low risk', img: 'https://via.placeholder.com/1200x500?text=Secure+Future' },
        { title: 'Global Opportunities', subtitle: 'Invest beyond borders', img: 'https://via.placeholder.com/1200x500?text=Global+Opportunities' }
    ];


    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="relative h-[400px] sm:h-[500px]">
                    {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ backgroundImage: `url(${slide.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                        <div className="bg-black bg-opacity-40 w-full h-full flex flex-col justify-center items-center text-center text-white p-4">
                        <h1 className="text-3xl sm:text-5xl font-bold mb-2">{slide.title}</h1>
                        <p className="text-lg sm:text-xl">{slide.subtitle}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
