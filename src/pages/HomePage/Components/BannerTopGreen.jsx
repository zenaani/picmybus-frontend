import React from 'react';
import malayalam from "../../../assets/malayalam.png";
import imgBannerBus from "../../../assets/img_banner_bus.png";


const BannerGreenTop = () => {
    return (
        <div className="flex justify-center items-center bg-green-600 w-full md:h-72 h-40">
            <div className="absolute flex"></div>

            <div>
                <img
                    src={malayalam}
                    className="md:w-96 w-40"
                />
                <div className="flex relative text-white md:text-9xl text-5xl font-bold translate-y-4">
                    <div className="z-10">PicMyB</div>
                    <div className="z-30">us</div>
                    {/*<img*/}
                    {/*    src={imgBannerBus}*/}
                    {/*    className="absolute z-20 md:translate-y-[-25px] translate-y-[-40px] md:translate-x-96 translate-x-[136px] md:w-80  w-52"*/}
                    {/*/>*/}
                </div>
            </div>
        </div>);
};

export default BannerGreenTop;