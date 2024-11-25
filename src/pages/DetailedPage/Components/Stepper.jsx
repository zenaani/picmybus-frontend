import React from 'react';


const Stepper = () => {
    return (
        <div className="absolute w-4 h-[400px] rounded-full bg-gray-300  left-1/2 my-8">
            <div className="w-4 h-[266px] rounded-full bg-green-600"></div>

            <div className="absolute w-4 h-4 rounded-full bg-green-800 top-0">
                <div className="absolute right-10 translate-y-[-6px]"> 6:00_PM</div>
                <div className="absolute left-10 translate-y-[-6px]">SIPCOT</div>
            </div>

            <div className="absolute w-4 h-4 rounded-full bg-green-800 top-[100px]">
                <div className="absolute right-10 translate-y-[-6px]"> 7:25_PM</div>
                <div className="absolute left-10 translate-y-[-6px]">Navalur</div>
            </div>

            <div className="absolute w-4 h-4 rounded-full bg-green-800 top-[200px]">
                <div className="absolute right-10 translate-y-[-6px]"> 8:35_PM</div>
                <div className="absolute left-10 translate-y-[-6px]">
                    Sholinganallur
                </div>
            </div>

            <div className="absolute w-4 h-4 rounded-full bg-green-800 top-[300px]">
                <div className="absolute right-10 translate-y-[-6px]"> 9:10_PM</div>
                <div className="absolute left-10 translate-y-[-6px]">University</div>
            </div>

            <div className="absolute w-4 h-4 rounded-full bg-green-800 top-[400px] translate-y-[-16px]">
                <div className="absolute right-10 translate-y-[-6px]"> 10:35_PM</div>
                <div className="absolute left-10 translate-y-[-6px]">Destination</div>
            </div>
        </div>
    )
};

export default Stepper;