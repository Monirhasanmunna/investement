import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-700 py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <span className="font-bold text-xl">InvestPro</span>
                </div>

                {/* Social Icons */}
                <div className="flex space-x-5 text-gray-600 text-lg">
                    <a href="#" aria-label="Facebook" className="hover:text-green-600"><FaFacebookF /></a>
                    <a href="#" aria-label="Instagram" className="hover:text-green-600"><FaInstagram /></a>
                    <a href="#" aria-label="Twitter" className="hover:text-green-600"><FaTwitter /></a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-green-600"><FaLinkedinIn /></a>
                </div>

                {/* Copyright */}
                <div className="text-sm text-gray-500">
                    &copy; 2025 All rights reserved by Virtual Softbook
                </div>
            </div>
        </footer>
    );
};

export default Footer;
