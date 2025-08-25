import TransectionListComponent from "@/Components/Client/TransectionListComponent.jsx";
import Main from "@/Layouts/Client/Dashboard/Main.jsx";

export default function Page({data: transectionListData}){

    return (
        <Main>
            <TransectionListComponent transectionListData={transectionListData} />
        </Main>
    )
}
