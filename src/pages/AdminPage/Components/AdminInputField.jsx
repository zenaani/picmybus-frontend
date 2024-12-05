import React from 'react';

const AdminInputField = ({icon, value, onChange, placeholder, props}) => {
    return (
        <div className={props}>
            <img src={icon} className="w-4 h-4 m-3"/>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e);
                }}
                placeholder={placeholder}
                className="outline-none w-full"
            />
        </div>
    );
};

export default AdminInputField;