import React from 'react';

const ButtonSearch = ({ onClick }) => {
    return (
        <button
            className="h-10 bg-green-800 hover:bg-green-900 text-white py-2 px-5 transition duration-500 rounded-lg md:w-auto w-full"
            onClick={onClick}
        >
            Search
        </button>
    );
};

export default ButtonSearch;