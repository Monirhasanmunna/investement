import React from 'react'
import Main from "@/Layouts/Client/Main.jsx";
import SliderComponent from "@/Components/Client/SliderComponent.jsx";
import PackageComponent from "@/Components/Client/PackageComponent.jsx";
import FAQComponent from "@/Components/Client/Home/FAQComponent.jsx";


const Page = ({data}) => {
    return (
        <Main>
            <div className={`container mx-auto px-4`}>
                <SliderComponent sliders={data.sliders} />
                <PackageComponent packages={data.packages} />
                <FAQComponent faqs={data.faqs} />
            </div>
        </Main>
    )
}

export default Page
