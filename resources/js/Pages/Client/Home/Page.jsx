import React from 'react'
import Main from "@/Layouts/Client/Main.jsx";
import SliderComponent from "@/Components/Client/SliderComponent.jsx";
import PackageComponent from "@/Components/Client/PackageComponent.jsx";
import FAQComponent from "@/Components/Client/Home/FAQComponent.jsx";
import {MdOutlineArrowOutward} from "react-icons/md";

const Page = ({data}) => {
    return (
        <Main>
            <div className={`container mx-auto px-4`}>
                <SliderComponent sliders={data.sliders} />
                <div className="w-full flex justify-center py-5">
                    <a target="_blank" href={`https://drive.google.com/drive/folders/1NVvJ3vusVgjYTatWA2-wkLbOy4T_hsAK`} className={`text-center px-3 py-2 bg-[#5fa29e] text-white flex items-center gap-2`}>Download App <MdOutlineArrowOutward className={`size-5 `} /></a>
                </div>
                <PackageComponent packages={data.packages} />
                <FAQComponent faqs={data.faqs} />
            </div>
        </Main>
    )
}

export default Page
