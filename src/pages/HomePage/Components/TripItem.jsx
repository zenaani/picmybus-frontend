// import React from 'react';
// import icRightArrow from "../../../assets/ic_right_arrow.svg";
// import {useNavigate} from "react-router-dom";
//
// const TripItem = ({item}) => {
//     const navigate = useNavigate();
//
//     //Navigate to Detailed Page
//     const navigateToDetails = (item) => {
//         console.log(item);
//         navigate(`/details/${item.tripId}`);
//     };
//
//     //Format Time
//     const formatTime = (time) => {
//         const [hours, minutes] = time.split(":").map(Number);
//         const period = hours >= 12 ? "PM" : "AM";
//         const formattedHours = hours % 12 || 12;
//         return `${String(formattedHours).padStart(2, "0")}:${String(
//             minutes
//         ).padStart(2, "0")} ${period}`;
//     };
//
//     // Formate Today's date
//     const formatDate = (date) => {
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//     };
//
//     const todayDate = formatDate(new Date());
//
//     if (!item) {
//         return null;
//     }
//     return (
//         <div
//             className="flex md:flex-row flex-col w-full md:gap-40  gap-0 my-5 p-2 bg-gray-50 items-center justify-evenly rounded-lg shadow-md hover:shadow-lg transition-all duration-500">
//             <div className="flex flex-row md:w-2/3 justify-between md:pl-8 w-full px-3 md:px-0 py-4 md:py-0">
//                 <div className="flex-col">
//                     <div className="text-sm">From</div>
//                     <div className="text-lg font-bold">{item.origin.name}</div>
//                     <div className=" text-md">ETD: {formatTime(item.departureTime)}</div>
//                 </div>
//
//                 <div className="flex-col md:text-left text-right">
//                     <div className="text-sm">To</div>
//                     <div className="text-lg font-bold">{item.destination.name}</div>
//                     <div className="text-md">ETA: {formatTime(item.arrivalTime)}</div>
//                 </div>
//             </div>
//
//             <div className="flex flex-row md:w-2/3 w-full justify-between px-3 md:px-0">
//                 <div className=" text-green-600 text-md md:text-lg font-bold">
//                     {item.busType.name + " - " + item.busSubType.description}
//                 </div>
//
//                 <div className="md:text-black text-md md:text-lg md:font-bold text-green-600">
//                     {todayDate}
//                 </div>
//             </div>
//
//             <div className="md:w-56 w-full px-2 py-4">
//                 <button
//                     className="flex h-8 md:h-24 md:w-full w-full gap-3 py-5 hover:bg-green-700 bg-green-800 justify-center items-center rounded-md transition-all duration-500"
//                     onClick={() => navigateToDetails(item)}
//                 >
//                     <div className="text-white md:hidden">View</div>
//                     <img src={icRightArrow} className="w-4 h-4"/>
//                 </button>
//             </div>
//         </div>
//
//     );
// };
//
// export default TripItem;


import React from 'react';
import icRightArrow from "../../../assets/ic_right_arrow.svg";
import { useNavigate } from "react-router-dom";

const TripItem = ({ item, isDetailedPage }) => {
    const navigate = useNavigate();

    // Navigate to Detailed Page
    const navigateToDetails = (item) => {
        if (item) {
            console.log(item);
            navigate(`/details/${item.tripId}`);
        }
    };

    // Go Back to Previous Page
    const goBack = () => {
        navigate(-1); // Navigates to the previous page
    };

    // Format Time
    const formatTime = (time) => {
        if (!time) return "N/A";
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        return `${String(formattedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
    };

    // Format Today's Date
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const todayDate = formatDate(new Date());

    // Handle missing item
    // if (!item || !item.origin || !item.destination || !item.busType || !item.busSubType) {
    //     return <div className="text-red-500">Invalid trip data</div>;
    // }

    return (
        <div
            className="flex md:flex-row flex-col w-full md:gap-40  gap-0 my-5 p-2 bg-gray-50 items-center justify-evenly rounded-lg shadow-md hover:shadow-lg transition-all duration-500">
            <div className="flex flex-row md:w-2/3 justify-between md:pl-8 w-full px-3 md:px-0 py-4 md:py-0">
                <div className="flex-col">
                    <div className="text-sm">From</div>
                    <div className="text-lg font-bold">{item.origin == null ? "Unknown" : item.origin.name}</div>
                    <div className="text-md">ETD: {formatTime(item?.departureTime)}</div>
                </div>

                <div className="flex-col md:text-left text-right">
                    <div className="text-sm">To</div>
                    <div
                        className="text-lg font-bold">{item.destination == null ? "Unknown" : item.destination.name}</div>
                    <div className="text-md">ETA: {formatTime(item?.arrivalTime)}</div>
                </div>
            </div>

            <div className="flex flex-row md:w-2/3 w-full justify-between px-3 md:px-0">
                <div className="text-green-600 text-md md:text-lg font-bold">
                    {item.busType.name || "Unknown"} - {item.busSubType.description || "Unknown"}
                </div>

                <div className="md:text-black text-md md:text-lg md:font-bold text-green-600">
                    {"No." + item.busNumber || "Unknown"}
                </div>
            </div>

            <div className="md:w-56 w-full px-2 py-4">
                <button
                    className="flex h-8 md:h-24 md:w-full w-full gap-3 py-5 hover:bg-green-700 bg-green-800 justify-center items-center rounded-md transition-all duration-500"
                    onClick={isDetailedPage ? goBack : () => navigateToDetails(item)}
                >
                    <div className="text-white md:hidden">{isDetailedPage ? "Go Back" : "View"}</div>
                    <img
                        src={icRightArrow}
                        className={`w-4 h-4 transition-transform duration-500 ${isDetailedPage ? "rotate-180" : ""}`}
                        alt="Arrow"
                    />
                </button>
            </div>
        </div>
    );
};

export default TripItem;
