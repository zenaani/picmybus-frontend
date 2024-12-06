import React from 'react';
import malayalam from "../../../assets/malayalam.png";


const PicMyBusMalayalam = () => {
    return (
        <div className="mt-14">
            <img
                src={malayalam}
                className="md:w-72 w-40"
            />
            <div className="flex relative text-white md:text-7xl text-5xl font-bold translate-y-4 opacity-30">
                PicMyBus
            </div>
        </div>)
};

export default PicMyBusMalayalam;