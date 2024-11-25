import React from 'react';

const Footer = () => {
    return (
        <div className="bg-green-600 text-white py-4 mt-8">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Flex container to align items */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                    {/* Left side: copyright */}
                    <div>
                        <span>&copy; 2024 PicMyBus. All rights reserved.</span>
                    </div>

                    {/* Right side: links */}
                    <div className="flex space-x-4">
                        <a href="/terms" className="text-white hover:text-green-300">Terms of Service</a>
                        <a href="/privacy" className="text-white hover:text-green-300">Privacy Policy</a>
                        <a href="/contact" className="text-white hover:text-green-300">Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
