import React, {useState} from 'react';
import logoPicmybus from "../../../assets/logo_picmybus.svg";
import icHamburger from "../../../assets/ic_hamburger.svg";
import icDisplayPicture from "../../../assets/ic_display_picture.svg";
import {useNavigate} from "react-router-dom";

const BannerTopLogo = () => {
    const navigate = useNavigate();

    //Handling Hamburger Menu
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    //Navigate to About Us
    const handleAboutUsNav = () => {
        setIsMenuVisible(false);
        navigate('/aboutus');
    }

    //Navigate to Home
    const handleHomeNav = () => {
        setIsMenuVisible(false);
        navigate('/');
    }

    //Navigate to Contact
    const handleContactNav = () => {
        setIsMenuVisible(false);
        navigate('/feedback');
    }

    return (
        <div className="flex h-20 bg-white md:px-20 px-8 items-center justify-between">
            <img src={icHamburger} onClick={toggleMenu} className="md:hidden"/>

            <img src={logoPicmybus} className="h-full py-5 cursor-pointer" onClick={handleHomeNav}/>
            <div className="hidden md:flex gap-8">
                <img src={icDisplayPicture} />
                <img src={icHamburger} onClick={toggleMenu} className="cursor-pointer"/>
            </div>
            <img src={icDisplayPicture} className="md:hidden"/>

            {isMenuVisible && (
                <div className="absolute top-20 left-8 mt-2 w-36 p-4 bg-white rounded-xl shadow-lg md:right-16 md:left-auto">
                    <div className="flex flex-col md:items-end items-start">
                        <div onClick={handleAboutUsNav} className="cursor-pointer">About Us</div>
                        <div className="cursor-pointer" onClick={handleContactNav}>Feedback</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BannerTopLogo;