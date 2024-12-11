import React, {useState} from "react";
import icBus from "../../../assets/ic_bus.svg"
import AdminInputField from "./AdminInputField.jsx";
import {TimePicker} from "antd";
import InputSearchPlace from "../../HomePage/Components/InputSearchPlace.jsx";
import InputSearchGeneric from "../../HomePage/Components/InputSearchGeneric.jsx";
import {busTypeList} from "../../../utils/busTypeList.js";
import {busSubTypeList} from "../../../utils/busSubTypeList.js";
import axios from "axios";
import api from "../../../services/api.js";


const AddBusRoute = () => {
    //Bus Schedule fields
    const [busNumber, setBusNumber] = useState("");
    const [name, setName] = useState("");
    const [origin, setOrigin] = useState("");
    const [originTime, setOriginTime] = useState("");
    const [destination, setDestination] = useState("");
    const [destinationTime, setDestinationTime] = useState("");
    const [mainBusType, setMainBusType] = useState("");
    const [subBusType, setSubBusType] = useState("");

    const [midStops, setMidStops] = useState([{stopPlaceId: "", stopTime: ""}]);

    //Handle Origin and Destination Selection
    const handleOriginChange = (placeId) => {
        setOrigin(placeId);
    }

    const handleDestinationChange = (placeId) => {
        setDestination(placeId);
    }

    //Set Departure and Arrival time
    const handleOriginTimeChange = (time, timeString) => {
        setOriginTime(timeString + ":00");
    };

    const handleDestinationTimeChange = (time, timeString) => {
        setDestinationTime(timeString + ":00");
    };

    //Set Bus type and Bus Sub Type Selection
    const handleBusTypeChange = (busType) => {
        setMainBusType(busType);
    }

    const handleBusSubTypeChange = (subBusType) => {
        setSubBusType(subBusType);
    }

    //Send POST method to backend
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            busNumber: busNumber,
            origin: origin,
            departureTime: originTime,
            destination: destination,
            arrivalTime: destinationTime,
            busTypeId: mainBusType,
            busSubTypeId: subBusType,
            midStops: midStops,
        };

        console.log("Payload being sent:", data);
        try {
          let response = await api.post(
            "/schedules",
            data
          );
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    //Clear all Fields
    const clearValues = () => {
        setName("");
        setOrigin("");
        setOriginTime("");
        setDestination("");
        setDestinationTime("");
        setMainBusType("");
        setSubBusType("");

        setMidStops([{stopPlaceId: "", stopTime: ""}]);

    };

    //Handle Midstops
    const addMidStop = () => {
        setMidStops([...midStops, {stopPlaceId: "", stopTime: ""}]);
    };

    const removeLastMidStop = () => {
        setMidStops(midStops.slice(0, -1));
    };

    const handleMidStopChange = (index, field, value) => {
        const newMidStops = midStops.map((midStop, i) =>
            i === index ? {...midStop, [field]: value} : midStop
        );
        setMidStops(newMidStops);
    };


    return (
        <div className="flex flex-col gap-7 p-10">
            <div className="text-3xl font-bold text-blue-600">Add New Bus Route</div>

            {/* Bus Nummber and Bus Name */}
            <div className="flex gap-4">
                <AdminInputField
                    placeholder={"Bus Number"}
                    icon={icBus}
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    props={
                        "relative h-12 w-96 flex items-center border border-gray-400 rounded-xl bg-white"
                    }
                />

                <AdminInputField
                    placeholder={"Bus Name"}
                    icon={icBus}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    props={
                        "relative h-12 w-96 flex items-center border border-gray-400 rounded-xl bg-white"
                    }
                />
            </div>


            {/* Origin and Departure Time */}
            <div className="flex gap-4">
                <InputSearchPlace placeholder={"Origin"}
                                  props={"relative h-12 w-96 flex items-center border border-gray-400 rounded-xl bg-white"}
                                  onPlaceSelect={handleOriginChange}/>
                <TimePicker
                    format="HH:mm"
                    onChange={handleOriginTimeChange}
                    placeholder="Departure Time"
                    className="w-96 rounded-xl border border-gray-400 bg-white"
                />
            </div>

            {midStops.map((midStop, index) => (
                <div key={index} className="flex gap-4 items-center">
                    <InputSearchPlace placeholder={"Mid-Stop"}
                                      props={"relative h-12 w-96 flex items-center border border-gray-400 rounded-xl bg-white"}
                                      onPlaceSelect={(placeId) => handleMidStopChange(index, "stopPlaceId", placeId)}/>
                    <TimePicker
                        format="HH:mm"
                        onChange={(time, timeString) =>
                            handleMidStopChange(index, "stopTime", timeString + ":00")
                        }
                        placeholder="Mid-Stop Time"
                        className="w-96 h-12 rounded-xl border border-gray-400 bg-white"
                    />

                    {index === 0 && (
                        <>
                            <div
                                onClick={addMidStop}
                                className="w-10 h-10 bg-gray-400 hover:bg-blue-500 transition-all duration-300 rounded-full flex items-center justify-center text-white"
                            >
                                +
                            </div>
                            <div
                                onClick={removeLastMidStop}
                                className="w-10 h-10 bg-gray-400 hover:bg-red-500 transition-all duration-300 rounded-full flex items-center justify-center text-white"
                            >
                                -
                            </div>
                        </>
                    )}
                </div>
            ))}

            {/* Destination and Arrival Time */}
            <div className="flex gap-4">
                <InputSearchPlace placeholder={"Destination"}
                                  props={"relative h-12 w-96 flex items-center border border-gray-400 rounded-xl bg-white"}
                                  onPlaceSelect={handleDestinationChange}/>
                <TimePicker
                    format="HH:mm"
                    onChange={handleDestinationTimeChange}
                    placeholder="Arrival Time"
                    className="w-96 rounded-xl border border-gray-400 bg-white"
                />
            </div>


            {/*Select Bus Type and Bus Sub Type */}
            <div className="flex gap-4">
                <InputSearchGeneric icon={icBus} placeholder={"Bus Type"} searchList={busTypeList}
                                    props={"relative h-12 w-96 flex items-center border border-gray-400 rounded-xl bg-white"}
                                    onItemSelect={handleBusTypeChange}/>
                <InputSearchGeneric icon={icBus} placeholder={"Bus Sub Type"} searchList={busSubTypeList}
                                    props={"relative h-12 w-96 flex items-center border border-gray-400 rounded-xl bg-white"}
                                    onItemSelect={handleBusSubTypeChange}/>
            </div>


            {/* Submit and Clear values */}
            <div className="flex gap-4">
                <button
                    className="w-96 h-12 bg-red-600 text-white hover:bg-red-700 py-2 px-4 transition duration-500 rounded-xl border border-red-600"
                    onClick={clearValues}
                >
                    Clear Values
                </button>

                <button
                    className="w-96 h-12 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 transition duration-500 rounded-xl"
                    onClick={handleSubmit}
                >
                    Add to DB
                </button>
            </div>


        </div>
    );
};

export default AddBusRoute;