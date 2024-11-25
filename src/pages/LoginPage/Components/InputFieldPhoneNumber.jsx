import React from 'react';

const InputFieldPhoneNumber = ({phoneNumber, setPhoneNumber}) => {
    return (
        <div className="w-full h-12 flex items-center border border-gray-400 rounded-xl">
            <div className="px-3">+91</div>
            <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your number"
                className="outline-none"
            />
        </div>
    );
};

export default InputFieldPhoneNumber;