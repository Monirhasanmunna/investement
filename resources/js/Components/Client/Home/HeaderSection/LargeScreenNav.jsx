import {Link} from "@inertiajs/react";

export default function LargeScreenNav() {
    return (
        <header className="w-full fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200 z-50">
            <div className="container mx-auto flex items-center justify-between py-4">
                <div className="flex items-center gap-x-6">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/assets/images/logo2.png"
                            alt="Company Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </Link>
                </div>
                <div>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
                        Get Started
                    </button>
                </div>
            </div>
        </header>

    )
}
