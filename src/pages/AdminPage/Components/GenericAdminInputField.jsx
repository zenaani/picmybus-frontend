import React, {useState} from "react";

const GenericAdminInputField = ({icon, value, onChange, placeholder, searchList, props}) => {
    const [searchData, setSearchData] = useState([]);

    const handleSearch = (e) => {
        if (e.target.value === "") {
            setSearchData([]);
            return;
        }
        setSearchData(
            searchList.filter((item) => item.includes(e.target.value)).slice(0, 8)
        );
    };

    return (
        <div className={props}>
            <img src={icon} className="w-4 h-4 m-3"/>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e); // Call the parent's onChange handler
                    handleSearch(e);
                }}
                placeholder={placeholder}
                className="outline-none w-full"
            />

            {searchData.length > 0 && (
                <div className="absolute  top-16 h-auto w-full right-0 bg-white border rounded-xl z-30">
                    {searchData.map((item) => (
                        <div
                            key={item}
                            className="cursor-pointer bg-white hover:bg-gray-50 p-3 rounded-xl transition-all duration-300"
                            onClick={() => {
                                onChange({target: {value: item}}); // Update parent state
                                setSearchData([]);
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenericAdminInputField;
