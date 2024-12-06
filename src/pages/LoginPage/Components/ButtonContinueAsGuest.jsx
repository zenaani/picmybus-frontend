import React from 'react';

const ButtonContinueAsGuest = ({ onClick }) => {
    return (
        <button
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white py-2 px-4 transition duration-500 rounded-xl"
            onClick={onClick}
        >
            Continue as Guest
        </button>
    );
};

export default ButtonContinueAsGuest;