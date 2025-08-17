import Header from "@/Layouts/Client/Header.jsx";
import Footer from "@/Layouts/Client/Footer.jsx";
import '@/../css/client.css';
import Notifier from "@/Components/Utils/Notification/Notifier.jsx";

const Main = ({children}) => {
    setTimeout(() => window.HSStaticMethods.autoInit(), 100)

    return (
        <>
            <Notifier/>
            <div className="overflow-hidden bg-[#EBF0F4]">
                <div>
                    <Header />
                </div>
                <div className="mt-[74px]">
                    {children}
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Main
