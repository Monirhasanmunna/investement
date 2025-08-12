import React from 'react'
import Main from "@/Layouts/Client/Main.jsx";
import SliderComponent from "@/Components/Client/SliderComponent.jsx";
import PackageComponent from "@/Components/Client/PackageComponent.jsx";
import FAQComponent from "@/Components/Client/Home/FAQComponent.jsx";


const Page = () => {
    return (
        <Main>
            <div className={`container mx-auto px-4`}>
                <SliderComponent />
                <PackageComponent />
                <FAQComponent />
            </div>
        </Main>
    )
}

export default Page
