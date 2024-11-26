import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import BannerTopLogo from "../HomePage/Components/BannerTopLogo.jsx";
import BannerGreenTop from "../HomePage/Components/BannerTopGreen.jsx";
import TripItem from "../HomePage/Components/TripItem.jsx";
import {APIProvider, Marker, Map} from "@vis.gl/react-google-maps";
import Stepper from "./Components/Stepper.jsx";
import {Steps, Switch} from "antd";
import api from "../../services/api.js";
import Footer from "../HomePage/Components/Footer.jsx";
import InstallNow from "../HomePage/Components/InstallNow.jsx";

const DetailedPage = () => {


    //Are we sharing location to the server?
    const [loggingEnabled, setLoggingEnabled] = useState(false);
    // Switch change handler
    const handleSwitchChange = (checked) => {
        setLoggingEnabled(checked);

    };
    //WebSocket tracking state

    const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);

    //Get TripId From params
    const {id} = useParams()

    const [data, setData] = useState();

    //API Call to fetch Trip Data and location from server
    useEffect(() => {
        api.get(`/schedules/${id}`).then((response) => {
            setData(response?.data);

            //Set Coordinates from DB
            setMapCoords({
                lat: response?.data.latitude || 19.0760,
                lng: response?.data.longitude || 72.8777,
            });

        });
    }, []);

    //Get Device Location and log it
    const [deviceLocation, setDeviceLocation] = useState(null);

    //Google Maps API Key
    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    //Map Coordinates
    //Update this coords to update the map
    const [mapCoords, setMapCoords] = useState({
        lat: data?.latitude || 19.0760,
        lng: data?.longitude || 72.8777
    });

    useEffect(() => {
        if (data) {
            setMapCoords({
                lat: data?.latitude || 19.0760,
                lng: data?.longitude || 72.8777
            });
        }
    }, [data]);

    //Logging location
    const logLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {
                        latitude,
                        longitude,
                        accuracy,
                        altitude,
                        altitudeAccuracy,
                        heading,
                        speed
                    } = position.coords;
                    //Logging location
                    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    // console.log(`Accuracy: ${accuracy} meters`);
                    // console.log(`Altitude: ${altitude}, Altitude Accuracy: ${altitudeAccuracy}`);
                    // console.log(`Heading: ${heading}, Speed: ${speed}`);
                    setDeviceLocation({latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed});
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.log(error.message);
                            console.error("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.error("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            console.error("The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            console.error("An unknown error occurred.");
                            break;
                        default:
                            console.error(`Error: ${error.message}`);
                            break;
                    }
                },
                {
                    enableHighAccuracy: true, // Use high accuracy mode
                    timeout: 5000,           // Specify a timeout for getting the location
                    maximumAge: 0            // Do not use a cached location
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        let intervalId;
        if (loggingEnabled) {
            intervalId = setInterval(logLocation, 3000);
        } else if (intervalId) {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [loggingEnabled]);

    // WebSocket reference
    const socketRef = useRef(null);

    // WebSocket connection
    useEffect(() => {
        if (loggingEnabled) {
            socketRef.current = new WebSocket('ws://localhost:8080/ws');
            // socketRef.current = new WebSocket('ws://localhost:8080/ws');

            socketRef.current.onopen = () => {
                console.log('WebSocket connection established');
                socketRef.current.send('Zenaani Suresh');
                setIsWebSocketOpen(true);
            };

            socketRef.current.onmessage = (event) => {
                console.log('WebSocket message received:', event.data);
                // You can integrate received data into your application state
            };

            socketRef.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            socketRef.current.onclose = () => {
                console.log('WebSocket connection closed');
                setIsWebSocketOpen(false);

            };
        }

        // Cleanup function to close the WebSocket when the component unmounts
        return () => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
            }
        };
    }, [loggingEnabled]);

    // Log device location and send to WebSocket when it changes
    useEffect(() => {
        if (loggingEnabled && deviceLocation) {
            const messagePayload = {
                scheduleId: data.tripId,
                latitude: deviceLocation.latitude,
                longitude: deviceLocation.longitude
            };
            console.log('Message: ', messagePayload);
            if (isWebSocketOpen) {
                socketRef.current.send(JSON.stringify(messagePayload));
            }
        } else {
            console.log('Device location is not available yet');
        }
    }, [deviceLocation, loggingEnabled]);


    return (
        <div className="flex-col">
            <BannerTopLogo/>
            <BannerGreenTop/>
            <div className="mx-10 -mt-10">
                <TripItem item={data}/>
            </div>

            <div className="flex md:mx-28 mx-16 mb-8 gap-4 justify-center md:justify-start">
                <div className="font-bold">Are you in this bus?</div>
                <Switch checked={loggingEnabled} onChange={handleSwitchChange}></Switch>
            </div>


            <div className="flex flex-col h-[500px] md:hidden">
                <Stepper />
            </div>


            {/* Dev Purpose */}
            {/*{deviceLocation && (*/}
            {/*    <div>*/}
            {/*        <p>Location Details</p>*/}
            {/*        <p>Latitude: {deviceLocation.latitude}</p>*/}
            {/*        <p>Longitude: {deviceLocation.longitude}</p>*/}
            {/*        <p>Accuracy: {deviceLocation.accuracy} meters</p>*/}
            {/*        {deviceLocation.heading && <p>Heading: {deviceLocation.heading}</p>}*/}
            {/*        {deviceLocation.speed && <p>Speed: {deviceLocation.speed} meters/second</p>}*/}
            {/*    </div>*/}
            {/*)}*/}

            {/* Google Map Container */}
            <div className="flex relative h-[700px] px-10">

                {/* Google Map */}
                <APIProvider
                    apiKey={googleMapsApiKey}
                    onLoad={() => console.log("Maps API has loaded.")}
                >
                    <Map defaultZoom={13} center={mapCoords} className="w-full h-full rounded-3xl overflow-auto">
                        <Marker position={mapCoords}/>
                    </Map>
                </APIProvider>

                {/* Stepper and its white container */}
                <div
                    className="absolute top-0 right-0 mx-36 my-10 w-96 h-[620px] bg-white bg-opacity-85 rounded-3xl z-10 shadow-lg backdrop-blur-sm hidden md:block">
                    <Stepper/>
                </div>

                {/* Currently we are setting the data from client. Need to get the data from server and set it */}
                {/* Bus Location and details and its White Container */}
                <div
                    className="absolute flex flex-col bottom-0 left-0 mx-20 my-10 px-5 py-5 md:w-96 bg-white bg-opacity-85 rounded-3xl z-10 shadow-lg backdrop-blur-sm ">
                    <div>Latitude: {deviceLocation?.latitude || 'N/A'}</div>
                    <div>Longitude: {deviceLocation?.longitude || 'N/A'}</div>
                    <div className={deviceLocation?.accuracy > 100 ? 'text-red-500' : ''}>
                        Accuracy: {deviceLocation?.accuracy != null ? `${deviceLocation.accuracy} meters` : 'N/A'}
                    </div>
                    <div>Speed: {deviceLocation?.speed != null ? `${deviceLocation.speed} km/h` : 'N/A'}</div>
                    <div>Direction: {deviceLocation?.direction || 'N/A'}</div>
                </div>

            </div>

            <Footer />
            <InstallNow />


        </div>
    );
};

export default DetailedPage;