import React from 'react'
import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa6'

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 py-10">
            <div className="container grid grid-cols-1 md:grid-cols-4  lg:grid-cols-5 gap-6 text-sm">
                {/* Left Section - Company Info */}
                <div className="space-y-3">
                    <img src="/assets/images/logo2.png" alt="Flight Logo" className="h-15" />
                    <p>Nikaton,Gulshan-01,Dhaka ,Bangladesh</p>
                    <div className="flex space-x-4 text-2xl text-blue-900">
                        <FaFacebookF />
                        <FaInstagram />
                        <FaXTwitter />
                        <FaLinkedinIn />
                        <FaPinterestP />
                    </div>
                </div>

                {/* About Section */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">About</h3>
                    <ul className="space-y-1">
                        <li>About Flight Expert</li>
                        <li>Best Price Guarantee</li>
                        <li>Terms and Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Cookie Policy</li>
                        <li>Blog</li>
                    </ul>
                </div>

                {/* Help Section */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Help</h3>
                    <ul className="space-y-1">
                        <li>FAQS</li>
                        <li>Easy EMI</li>
                        <li>Payment Methods</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Have Questions?</h3>
                    <p className="text-blue-800 font-semibold">+8801622-812783</p>
                    <p className="text-blue-600">snaptreker@gmail.com</p>
                    <h4 className="font-semibold">Dedicated Customer Support</h4>
                    <p>Sat-Thurs: 9AM-9PM</p>
                    <p>Friday/Govt. Holidays: 10AM-6PM</p>
                </div>
                <div className="">
                    <h3 className="font-semibold text-lg mb-3">Accepted Payments</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        <img src={`/assets/images/payment.webp`} alt="payment method" className="h-20" />
                    </div>
                </div>
            </div>

            {/* Payment Section */}

            {/* Copyright Section */}
            <div className="text-center mt-6 border-t pt-4 text-sm">
                Copyright @2025 FEBD Ltd. All rights reserved by Flight Expert
            </div>
        </footer>
    )
}

export default Footer
