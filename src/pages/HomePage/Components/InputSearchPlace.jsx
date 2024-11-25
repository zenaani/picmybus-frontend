import React, {useState, useCallback, useEffect} from 'react';
import {Select} from "antd";
import api from "../../../services/api.js";
import {debounce} from "lodash";



const InputSearchPlace = ({ props, placeholder, onPlaceSelect}) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState();

    const fetch = async (query) => {
        try {
            const response = await api.get(`/places/search?name=${query}`);
            const formattedData = response.data.map((place) => ({
                value: place.placeId,
                label: place.name,
            }));
            setData(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    //Debouncer to reduce API calls
    const debouncedFetch = useCallback(debounce((query) => fetch(query), 300), []);

    const handleSearch = (newValue) => {
        if (newValue) {
            debouncedFetch(newValue);
        } else {
            setData([]);
        }
    };

    const handleChange = (newValue) => {
        setValue(newValue);
        console.log("Selected : ", newValue);
        onPlaceSelect(newValue);
    };


    return (
        <Select
            className={props}
            showSearch
            placeholder={placeholder}
            value={value}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            options={data}
        />
    );
};

export default InputSearchPlace;