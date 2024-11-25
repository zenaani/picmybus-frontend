import React from 'react';
import icGoogle from "../../../assets/ic_google.svg";

const ButtonGoogleLogin = ({ onClick }) => {
    return (
        <button
            className="w-full h-12 flex justify-center items-center bg-white text-black py-2 px-4 border border-grey-600 rounded-xl"
            onClick={onClick}
        >
            <img src={icGoogle} className="w-4 h-4 mr-3"/>
            <div>Continue with Google</div>
        </button>
    );
};

export default ButtonGoogleLogin;