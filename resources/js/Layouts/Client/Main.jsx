import Header from "@/Layouts/Client/Header.jsx";
import Footer from "@/Layouts/Client/Footer.jsx";
import '@/../css/client.css';
import Notifier from "@/Components/Utils/Notification/Notifier.jsx";
import {ImWhatsapp} from "react-icons/im";

const Main = ({children}) => {
    setTimeout(() => window.HSStaticMethods.autoInit(), 100)

    return (
        <>
            <Notifier/>
            <div className="overflow-hidden bg-[#EBF0F4] relative">
                <div>
                    <Header />
                </div>
                <div className="mt-[74px]">
                    {children}
                </div>
                <div>
                    <Footer />
                </div>

                {/* Floating WhatsApp Button */}
                <a
                    href="https://wa.me/+8801948960391"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition duration-300"
                >
                    <ImWhatsapp className={`size-5 md:size-7`} />
                </a>
            </div>
        </>
    )
}

export default Main
