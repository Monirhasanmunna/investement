import {useState} from "react";
import MobileScreen from "@/Components/Client/Dashboard/MobileScreen.jsx";
import LargeScreen from "@/Components/Client/Dashboard/LargeScreen.jsx";

export default function Dashboard() {
    return (
        <>
            <LargeScreen />
            <MobileScreen />
        </>
    )
}
