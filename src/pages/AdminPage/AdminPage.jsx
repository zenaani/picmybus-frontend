import React from 'react';
import AddBusRoute from "./Components/AddBusRoute.jsx";

const AdminPage = () => {
    return (
        <div className="flex-col">

            {/* Blue Background */}
            <div className="flex bg-blue-600 w-screen h-52 items-end">
                <div className="flex text-5xl font-bold text-white mb-10 ml-10">Admin Panel</div>
            </div>

            <AddBusRoute />
        </div>
    );
};

export default AdminPage;