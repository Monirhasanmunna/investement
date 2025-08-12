import Header from "@/Layouts/Client/Header.jsx";
import Footer from "@/Layouts/Client/Footer.jsx";
import '@/../css/client.css';

const Main = ({children}) => {
    setTimeout(() => window.HSStaticMethods.autoInit(), 100)
    return (
        <div className="overflow-hidden bg-[#EBF0F4]">
            <div>
                <Header />
            </div>
            <div className="mt-[77px]">
                {children}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Main
