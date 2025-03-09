import React, { useState } from "react";

const PersonalProfile = () => {
    const [personalData, setPersonalData] = useState({
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalData({ ...personalData, [name]: value });
    };

    const handleSave = () => {
        alert("Personal profile saved!");
        // Simulate API call here.
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Personal Profile</h2>
            <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={personalData.name}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={personalData.email}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={personalData.phone}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                />
            </div>
            <button
                onClick={handleSave}
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Save Changes
            </button>
        </div>
    );
};

export default PersonalProfile;
