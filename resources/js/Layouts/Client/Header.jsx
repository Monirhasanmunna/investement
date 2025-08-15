import React from 'react'
import {Link} from "@inertiajs/react";
import LargeScreenNav from "@/Components/Client/Home/HeaderSection/LargeScreenNav.jsx";
import MobileScreenNav from "@/Components/Client/Home/HeaderSection/MobileScreenNav.jsx";

const Header = () => {
    return (
        <div className="w-full">
            <LargeScreenNav/>
            {/*<MobileScreenNav/>*/}
        </div>
    )
}

export default Header
