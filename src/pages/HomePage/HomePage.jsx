import React, {useState} from 'react';
import BannerTopLogo from "./Components/BannerTopLogo.jsx";
import BannerGreenTop from "./Components/BannerTopGreen.jsx";
import InputSearchPlace from "./Components/InputSearchPlace.jsx";
import InputSearchGeneric from "./Components/InputSearchGeneric.jsx";
import {timeFrameList} from "../../utils/timeFrameList.js";
import {DatePicker, message, Spin} from "antd";
import {busTypeList} from "../../utils/busTypeList.js";
import icSwap from "../../assets/ic_swap.svg";
import icTime from "../../assets/ic_time.svg";
import icBus from "../../assets/ic_bus.svg";
import ButtonSearch from "./Components/ButtonSearch.jsx";
import api from "../../services/api.js";
import TripItem from "./Components/TripItem.jsx";
import Footer from "./Components/Footer.jsx";
import FavouriteRoute from "./Components/FavouriteRoute.jsx";
import logoPicmybus from "../../assets/logo_picmybus.svg";
import icDownload from "../../assets/ic_download.svg";
import InstallNow from "./Components/InstallNow.jsx";

const HomePage = () => {

    //Handle Origin and Destination Selection
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);

    const handleOriginSelect = (placeId) => {
        setOrigin(placeId);
    };

    const handleDestinationSelect = (placeId) => {
        setDestination(placeId);
    };

    //Handle Time frame Selection
    const [time, setTime] = useState("");

    const handleTimeSelect = (time) => {
        setTime(time);
    };

    //Handle Bus Type Selection
    const [busType, setBusType] = useState("");

    const handleBusTypeSelect = (busType) => {
        setBusType(busType);
    };

    //To Handle Loading State
    const [isFetching, setIsFetching] = useState(false);

    //Data for TripItems
    const [tripData, setTripData] = useState({
        schedules: [],
        totalResults: 0
    });

    //To track number of results
    const [hasSearched, setHasSearched] = useState(false);

    //Need to refactor
    //Favourite Routes
    const favouriteRoute = {
        tripId: 12345,
        origin: {id: 521, name: "Palakkad"},
        destination: {id: 1090, name: "Thrissur"},
        departureTime: "08:00:00",
        arrivalTime: "12:00:00",
        busType: {name: "KSRTC"},
        busSubType: {description: "Fast Passenger"}
    };

    //Fill fields wit fav route
    const fillSearchFieldsFromFavourite = async (favouriteRoute) => {

        //API call for fav route
        try {
            console.log(origin, destination);
            const response = await api.get(
                // `http://localhost:8080/schedules/${origin}/${destination}`
                `/schedules/filter?origin=521&destination=1090&startTime=00:00:00&endTime=23:59:59&busSubTypeId=2`
                // `http://localhost:8080/schedulesByFilter?origin=37&destination=38&startTime=05:00:00&endTime=09:00:00&busSubTypeId=2`
            );
            setTripData(response.data);
            console.log(response.data);
            setHasSearched(true);
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setIsFetching(false);
        }
    };


    //Search Trips From Backend
    const handleSearch = async () => {

        //Set Time Filter
        let startTime = "";
        let endTime = "";
        switch (time) {
            case "1":
                startTime = "06:00:00";
                endTime = "13:00:00";
                break;
            case "2":
                startTime = "13:00:00";
                endTime = "18:00:00";
                break;
            case "3":
                startTime = "18:00:00";
                endTime = "23:59:59";
                break;
            default:
                startTime = "00:00:00";
                endTime = "23:59:59";
                //url here
                break;
        }

        //Set Bus Type
        let subTypeId = 0;
        switch (busType) {
            case "Private":
                subTypeId = 1;
                break;
            case "KSRTC":
                subTypeId = 2;
                break;
            default:
                //url here
                subTypeId = 0;
                break;
        }

        setIsFetching(true);

        //API Call For TripItems
        // try {
        //     console.log(origin, destination);
        //     if(origin === null || destination === null) {
        //         message.error('Enter Origin and Destination');
        //         return;
        //     }
        //
        //     const response = await api.get(
        //         `/schedules/filter?origin=${origin}&destination=${destination}&startTime=${startTime}&endTime=${endTime}&busSubTypeId=${busType}`
        //     );
        //     setTripData(response.data);
        //     console.log(response.data);
        //     setHasSearched(true);
        // } catch (error) {
        //     console.error("Error fetching trips:", error);
        // } finally {
        //     setIsFetching(false);
        // }

        try {
            if (origin === null || destination === null) {
                message.error('Enter Origin and Destination');
                return;
            }

            // Logic to determine which API to call based on the selected parameters
            let response;

            if (origin && destination && time && busType) {
                // Origin, Destination, Time, and Bus Type are provided
                response = await api.get(
                    `/schedules/filter?origin=${origin}&destination=${destination}&startTime=${startTime}&endTime=${endTime}&busSubTypeId=${busType}`
                );
            }
            // else if(origin && destination && busType) {
            //     // Origin, Destination, and Bus Type are provided
            //     response = await api.get(
            //         `/schedules/byOriginDestinationBusType?origin=${origin}&destination=${destination}&busSubTypeId=${busType}`
            //     );
            // }
            // else if (origin && destination && time) {
            //     // Origin, Destination, and Time are provided
            //     response = await api.get(
            //         `/schedules/filter?origin=${origin}&destination=${destination}&startTime=${startTime}&endTime=${endTime}`
            //     );
            // }
            else if (origin && destination) {
                // Only Origin and Destination are provided
                response = await api.get(
                    `/schedules/${origin}/${destination}`
                );
            } else {
                message.error('Please enter all required fields (Origin, Destination, etc.)');
                return;
            }

            setTripData(response.data);
            setHasSearched(true);
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setIsFetching(false);
        }
    };


    return (
        <div className="flex flex-col min-h-screen">
            <BannerTopLogo/>
            <BannerGreenTop/>

            <div className="flex flex-col md:flex-row mx-10 gap-4 -mt-4">
                <InputSearchPlace props="w-full h-10" onPlaceSelect={handleOriginSelect} placeholder="Origin"/>
                <InputSearchPlace props="w-full h-10" onPlaceSelect={handleDestinationSelect}
                                  placeholder="Destination"/>
                <InputSearchGeneric props="w-full h-10" searchList={timeFrameList} onItemSelect={handleTimeSelect}
                                    placeholder="Time" icon={icTime}/>
                <DatePicker className="w-full h-10" placeholder="Date" format="D MMM YYYY"/>
                <InputSearchGeneric props="w-full h-10" searchList={busTypeList} onItemSelect={handleBusTypeSelect}
                                    placeholder="Bus Type" icon={icBus}/>
                <ButtonSearch onClick={handleSearch}/>
            </div>

            {/* Display My Favourite Roots before Search */}
            <div className="flex-grow py-8 px-10 md:px-20">
                {!hasSearched && (
                    <div className="text-center py-8 text-xl text-gray-700">
                        <div className="text-2xl font-bold text-black">My Favourite Routes</div>
                        <FavouriteRoute key={favouriteRoute.tripId} item={favouriteRoute}
                                        onFavouriteRouteClick={fillSearchFieldsFromFavourite}/>
                    </div>
                )}

                {/* Display loader */}
                {isFetching ? (
                    <div className="flex justify-center items-center">
                        <Spin size="large"/>
                    </div>
                ) : hasSearched && (
                    <>
                        <div className="font-bold text-green-600">{tripData.totalResults} results found</div>
                        {tripData.totalResults > 0 && (
                            tripData.schedules.map(item => (
                                <TripItem key={item.tripId} item={item}/>
                            ))
                        )}
                    </>
                )}
            </div>

            <Footer/>
            <InstallNow />
        </div>
    );
};

export default HomePage;