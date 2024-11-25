import React, {useState} from 'react';
import {Select} from "antd";

const InputSearchGeneric = ({props, placeholder, searchList, icon, onItemSelect}) => {
    const [value, setValue] = useState();

    const handleChange = (newValue) => {
        setValue(newValue);
        onItemSelect(newValue);
    };

    return (
        <Select
            showSearch
            className={props}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            options={searchList}
            suffixIcon={<img src={icon} alt="icon" />}
        />
    );
};

export default InputSearchGeneric;