import React from 'react';
import BannerTopLogo from "../HomePage/Components/BannerTopLogo.jsx";
import malayalam from "../../assets/malayalam.png";
import PicMyBusMalayalam from "./Components/PicMyBusMalayalam.jsx";
import AboutUsContent from "./Components/AboutUsContent.jsx";

const AboutUsPage = () => {
    return (
        <div className="flex-col h-screen">
            <BannerTopLogo/>

            <div className="flex h-full bg-green-600">

                {/* Left half with Bus Image */}
                <div className="h-full w-1/2 bg-green-600">
                    {/* Bus Image comes here */}
                </div>


                {/* Right half with Logo and Content */}
                <div className="flex flex-col h-full w-1/2 bg-green-600 items-center">

                    <PicMyBusMalayalam />
                    <AboutUsContent />

                </div>


            </div>


        </div>
    );
};

export default AboutUsPage;