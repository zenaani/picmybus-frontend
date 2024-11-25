import React, {useState} from 'react';
import InputFieldPhoneNumber from "./Components/InputFieldPhoneNumber.jsx";
import logoPicmybus from "../../assets/logo_picmybus.svg";
import ButtonSendOtp from "./Components/ButtonSendOtp.jsx";
import DividerOr from "./Components/DividerOr.jsx";
import ButtonGoogleLogin from "./Components/ButtonGoogleLogin.jsx";
import TextTnC from "./Components/TextTnC.jsx";
import TextSendOtp from "./Components/TextSendOtp.jsx";
import { signInWithGooglePopup } from "../../services/firebase.js";
import { useNavigate } from "react-router-dom";
import InstallNow from "../HomePage/Components/InstallNow.jsx";


function LoginPage() {

    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState('');

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
        const user = response.user;
        console.log("User: ", user);
        navigate("/home");
    };

    // const handleSubmit = () => {
    //     console.log('Phone Number:', phoneNumber);
    // }

    return (
        <div className="flex h-screen">

            {/* Left half with green background */}
            <div className="w-1/2 bg-green-600">
                {/* Bus Image comes here */}
            </div>


            {/* Right half with green background */}
            <div className="w-1/2 bg-white flex items-center justify-center">

                {/* Login Form */}
                <div className="w-1/2 flex flex-col items-center justify-center gap-6">
                    <img src={logoPicmybus} className="mb-10 scale-110"/>
                    <InputFieldPhoneNumber phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>
                    <ButtonSendOtp/>
                    <TextSendOtp />
                    <DividerOr/>
                    <ButtonGoogleLogin onClick={logGoogleUser}/>
                    <TextTnC />
                </div>

            </div>

            <InstallNow />
        </div>
    );
}

export default LoginPage;