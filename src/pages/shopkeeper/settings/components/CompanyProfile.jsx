import React, { useState } from "react";

const CompanyProfile = () => {
    const [companyData, setCompanyData] = useState({
        logo: null,
        name: "Demo Company",
        address: "123 Business Road, City, Country",
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCompanyData({ ...companyData, logo: file });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
    };

    const handleSave = () => {
        alert("Company profile saved!");
        // Simulate API call here.
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Company Profile</h2>
            <div className="mb-4">
                <label className="block mb-1">Company Logo</label>
                <input type="file" onChange={handleFileChange} className="w-full border p-2" />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Company Name</label>
                <input
                    type="text"
                    name="name"
                    value={companyData.name}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Address</label>
                <textarea
                    name="address"
                    value={companyData.address}
                    onChange={handleInputChange}
                    className="w-full border p-2"
                ></textarea>
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

export default CompanyProfile;
