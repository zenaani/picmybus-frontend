import React, {useState} from 'react';
import logoPicmybus from "../../../assets/logo_picmybus.svg";
import icDownload from "../../../assets/ic_download.svg";

const InstallNow = () => {

    return (
        <div className="flex w-full h-20 px-8 justify-between items-center md:hidden">
            <img src={logoPicmybus} className="h-full py-5"/>
            <div className="flex items-center p-2 gap-2">
                <div>Install Now</div>
                <img src={icDownload} className="h-6"/>
            </div>
        </div>
    );
};

export default InstallNow;