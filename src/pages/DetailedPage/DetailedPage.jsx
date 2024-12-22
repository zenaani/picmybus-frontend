import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import BannerTopLogo from "../HomePage/Components/BannerTopLogo.jsx";
import BannerGreenTop from "../HomePage/Components/BannerTopGreen.jsx";
import TripItem from "../HomePage/Components/TripItem.jsx";
import {APIProvider, Marker, Map} from "@vis.gl/react-google-maps";
import Stepper from "./Components/Stepper.jsx";
import {Button, Modal, Steps, Switch} from "antd";
import api from "../../services/api.js";
import Footer from "../HomePage/Components/Footer.jsx";
import InstallNow from "../HomePage/Components/InstallNow.jsx";
import {formatTime, haversineDistance} from "../../utils/utilFunctions.js";
import imgBus from "../../assets/img_banner_bus_w_shadow.png"
import * as url from "node:url";

const DetailedPage = () => {

    //navigation
    const navigate = useNavigate();

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

    //Midstops list
    const [midStops, setMidStops] = useState([]);

    //API Call to fetch Trip Data and location from server
    useEffect(() => {
        api.get(`/schedules/${id}`).then((response) => {
            setData(response?.data);
            setMidStops(response?.data.midStops);

            //Set Coordinates from DB
            setMapCoords({
                lat: response?.data.latitude || 19.0760,
                lng: response?.data.longitude || 72.8777
            });

            setOriginMapCoords({
                lat: response?.data.origin.latitude || 19.0760,
                lng: response?.data.origin.longitude || 72.8777
            })

            setDestinationMapCoords({
                lat: response?.data.destination.latitude || 19.0760,
                lng: response?.data.destination.longitude || 72.8777
            })

        });
    }, []);

    useEffect(() => {
        console.log(midStops);
    }, [midStops]);

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

    const [originMapCoords, setOriginMapCoords] = useState({
        lat: data?.origin?.latitude || 19.0760,
        lng: data?.destination?.longitude || 72.8777
    })

    const [destinationMapCoords, setDestinationMapCoords] = useState({
        lat: data?.origin?.latitude || 19.0760,
        lng: data?.destination?.longitude || 72.8777
    })

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (data) {
            const totalDistance = haversineDistance(
                originMapCoords.lat,
                originMapCoords.lng,
                destinationMapCoords.lat,
                destinationMapCoords.lng
            )

            const currentDistance = haversineDistance(
                originMapCoords.lat,
                originMapCoords.lng,
                mapCoords.lat,
                mapCoords.lng
            );

            if (currentDistance > totalDistance) {
                setProgress(100);
            } else {
                const percentageProgress = (currentDistance / totalDistance) * 100;
                setProgress(percentageProgress);
            }


        }
    }, [data]);


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
            socketRef.current = new WebSocket('wss://picmybus.com/ws');
            // socketRef.current = new WebSocket('ws://localhost:8080/ws');
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


    //Geocoding API call to get source, destination, midstops marker
    useEffect(() => {
        if (data) {
            api.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data?.origin?.name}&key=${googleMapsApiKey}`)
                .then((response) => {
                    if (response.data.results.length > 0) {
                        const location = response.data.results[0].geometry.location;

                        //Update Place Coordinates in DB
                        //Only update if coordinates are not available in DB
                        if (data?.origin?.placeId && data?.origin?.latitude == null && data?.origin?.longitude == null) {
                            api.put(`/places/${data.origin.placeId}`, {latitude: location.lat, longitude: location.lng})
                                .then(() => {
                                    console.log("Origin Coordinates updated successfully.");
                                })
                                .catch((error) => {
                                    console.error("Error updating place:", error);
                                });
                        } else {
                            console.log("Origin Coordinates already available in DB");
                        }
                        console.log("Location:", location);
                    } else {
                        console.log("No results found for Origin Address.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching geocode data:", error);
                });
        }
    }, [data])

    //Geocoding API call to get source, destination, midstops marker
    useEffect(() => {
        if (data) {
            api.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data?.destination?.name}&key=${googleMapsApiKey}`)
                .then((response) => {
                    if (response.data.results.length > 0) {
                        const location = response.data.results[0].geometry.location;

                        //Update Place Coordinates in DB
                        //Only update if coordinates are not available in DB
                        if (data?.destination?.placeId && data?.destination?.latitude == null && data?.destination?.longitude == null) {
                            api.put(`/places/${data.destination.placeId}`, {
                                latitude: location.lat,
                                longitude: location.lng
                            })
                                .then(() => {
                                    console.log("Destination Coordinates updated successfully.");
                                })
                                .catch((error) => {
                                    console.error("Error updating place:", error);
                                });
                        } else {
                            console.log("Destination Coordinates already available in DB");
                        }
                        console.log("Location:", location);
                    } else {
                        console.log("No results found for Destination Address.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching geocode data:", error);
                });
        }

    }, [data])

    //Feedback Popup
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleRateUsClick = () => {
        navigate("/feedback");
    };

    useEffect(() => {
        // Show popup after 60 seconds
        const timer = setTimeout(() => {
            setIsPopupVisible(true);
        }, 90000);  // 10000 ms = 10 seconds

        // Cleanup the timer when the component unmounts or when the effect is re-run
        return () => clearTimeout(timer);
    }, []);


    if (!data) return <div>Loading...</div>;

    return (
        <div className="flex-col">

            <Modal
                title="Feedback"
                open={isPopupVisible}
                onCancel={() => setIsPopupVisible(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={handleRateUsClick}>
                        Rate Us
                    </Button>
                ]}
            >
                <p>Kindly share your feedback</p>
            </Modal>
            <BannerTopLogo/>
            <BannerGreenTop/>
            <div className="mx-10 -mt-10">
                <TripItem item={data} isDetailedPage={true}/>
            </div>

            <div className="flex md:mx-28 mx-16 mb-8 gap-4 justify-center md:justify-start">
                <div className="font-bold">Are you in this bus?</div>
                <Switch checked={loggingEnabled} onChange={handleSwitchChange}></Switch>
            </div>

            <div className="flex flex-col h-full md:hidden">
                <div className="relative flex mt-10 mb-10">

                    {/* Times */}
                    <div className="ml-[90px] flex flex-col gap-[100px] text-right">
                        <div>{formatTime(data.departureTime)}</div>
                        {midStops.map((midStop, index) => (
                            <div key={index}>{formatTime(midStop.stopTime)}</div>
                        ))}
                        <div>{formatTime(data.arrivalTime)}</div>
                    </div>

                    {/* Grey background line */}
                    <div className="absolute left-48 top-0 h-full w-6 rounded-3xl bg-gray-300"></div>

                    {/* Green progress line */}
                    <div
                        className="absolute left-48 top-0 h-3/4 w-6 rounded-3xl bg-green-600"
                        style={{height: `${progress}%`}}
                    ></div>

                    {/* Green dot */}
                    <div className="absolute flex left-48 flex-col gap-[100px]">
                        <div className="h-6 w-6 bg-green-800 rounded-3xl"></div>
                        {midStops.map((midStop, index) => (
                            <div key={index} className="h-6 w-6 bg-green-800 rounded-3xl"></div>
                        ))}
                        <div className="h-6 w-6 bg-green-800 rounded-3xl"></div>
                    </div>

                    {/* Place */}
                    <div className="absolute flex left-60 flex-col gap-[100px]">
                        <div>{data?.origin?.name}</div>
                        {midStops.map((midStop, index) => (
                            <div key={index}>{midStop?.stopPlace?.name}</div>
                        ))}
                        <div>{data?.destination?.name}</div>
                    </div>


                </div>

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
                    <Map defaultZoom={13} defaultCenter={mapCoords} className="w-full h-full rounded-3xl overflow-auto">
                        <Marker
                            position={mapCoords}
                            icon={{
                                url: imgBus,
                                scaledSize: {width: 80, height: 50}
                            }}
                        />
                        <Marker
                            position={originMapCoords}
                            label={{
                                text: "Origin", // Label text
                                color: "black", // Label color
                                fontSize: "12px", // Label font size
                                fontWeight: "bold", // Label font weight
                            }}
                        />
                        <Marker
                            position={destinationMapCoords}
                            label={{
                                text: "Destination", // Label text
                                color: "black", // Label color
                                fontSize: "12px", // Label font size
                                fontWeight: "bold", // Label font weight
                            }}
                        />
                    </Map>
                </APIProvider>

                {/* Stepper and its white container */}
                <div
                    className="absolute top-0 right-0 mx-36 my-10 w-96 h-[620px] bg-white bg-opacity-85 rounded-3xl z-10 shadow-lg backdrop-blur-sm hidden md:block overflow-y-auto">
                    <div className="relative flex mt-10 mb-10">

                        {/* Times */}
                        <div className="ml-[90px] flex flex-col gap-[100px] text-right">
                            <div>{formatTime(data.departureTime)}</div>
                            {midStops.map((midStop, index) => (
                                <div key={index}>{formatTime(midStop.stopTime)}</div>
                            ))}
                            <div>{formatTime(data.arrivalTime)}</div>
                        </div>

                        {/* Grey background line */}
                        <div className="absolute left-48 top-0 h-full w-6 rounded-3xl bg-gray-300"></div>

                        {/* Green progress line */}
                        <div
                            className="absolute left-48 top-0 h-3/4 w-6 rounded-3xl bg-green-600"
                            style={{height: `${progress}%`}}
                        ></div>

                        {/* Green dot */}
                        <div className="absolute flex left-48 flex-col gap-[100px]">
                            <div className="h-6 w-6 bg-green-800 rounded-3xl"></div>
                            {midStops.map((midStop, index) => (
                                <div key={index} className="h-6 w-6 bg-green-800 rounded-3xl"></div>
                            ))}
                            <div className="h-6 w-6 bg-green-800 rounded-3xl"></div>
                        </div>

                        {/* Place */}
                        <div className="absolute flex left-60 flex-col gap-[100px]">
                            <div>{data?.origin?.name}</div>
                            {midStops.map((midStop, index) => (
                                <div key={index}>{midStop?.stopPlace?.name}</div>
                            ))}
                            <div>{data?.destination?.name}</div>
                        </div>
                    </div>
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


                    {/*{midStops.map((midStop, index) => (*/}
                    {/*    <div key={index}>{midStop?.stopPlace?.name}</div>*/}
                    {/*))}*/}
                </div>

            </div>
            <div className="text-xs mx-10 my-2">Disclaimer: The routes and locations shown are estimates and may vary from actual
                conditions.
            </div>

            <Footer/>


        </div>
    )
        ;
};

export default DetailedPage;