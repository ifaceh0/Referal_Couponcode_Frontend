// import React, { useState } from "react";

// const CompanyProfile = () => {
//     const [companyData, setCompanyData] = useState({
//         logo: null,
//         name: "Demo Company",
//         address: "123 Business Road, City, Country",
//     });

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     setCompanyData({ ...companyData, logo: file });
    // };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCompanyData({ ...companyData, [name]: value });
//     };

//     const handleSave = () => {
//         alert("Company profile saved!");
//         // Simulate API call here.
//     };

    // return (
    //     <div>
    //         <h2 className="text-xl font-bold mb-4">Company Profile</h2>
    //         <div className="mb-4">
    //             <label className="block mb-1">Company Logo</label>
    //             <input type="file" onChange={handleFileChange} className="w-full border p-2" />
    //         </div>
    //         <div className="mb-4">
    //             <label className="block mb-1">Company Name</label>
    //             <input
    //                 type="text"
    //                 name="name"
    //                 value={companyData.name}
    //                 onChange={handleInputChange}
    //                 className="w-full border p-2"
    //             />
    //         </div>
    //         <div className="mb-4">
    //             <label className="block mb-1">Address</label>
    //             <textarea
    //                 name="address"
    //                 value={companyData.address}
    //                 onChange={handleInputChange}
    //                 className="w-full border p-2"
    //             ></textarea>
    //         </div>
    //         <button
    //             onClick={handleSave}
    //             className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
    //         >
    //             Save Changes
    //         </button>
    //     </div>
    // );
// };

// export default CompanyProfile;

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaSave } from "react-icons/fa";
import { getProfileAction, updateCompanyProfileAction } from "../../../../api/settingPageApi";
import { getCurrentUser } from "../../../../api/signin";

const CompanyProfile = ({ shopkeeperId }) => {
    const [companyData, setCompanyData] = useState({
        shopkeeperId,
        companyName: "",
        companyAddress: "",
    });

    // const [logoPreview, setLogoPreview] = useState(null);
    // const [selectedLogoFile, setSelectedLogoFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                setLoading(true);
                const user = await getCurrentUser();
                console.log("getCurrentUser result:", user);
                setUserDetails(user);

                if (user?.id) {
                    const response = await getProfileAction(user?.id);
                    console.log("Company profile data:", response);
                    if(response){
                        // const data = response
                        setCompanyData({
                            shopkeeperId,
                            companyName: response.companyName || "",
                            companyAddress: response.companyAddress || "",
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                toast.error(error.message || "Failed to load company profile");
            } finally {
                setLoading(false);
            }
        };
        fetchCompanyProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyData((prev) => ({ ...prev, [name]: value }));
        setIsEditing(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCompanyData({ ...companyData, logo: file });
    };

    const handleSave = async () => {
        try{
            const setCompany = {
                shopkeeperId: userDetails?.id,
                companyName: companyData.companyName,
                companyAddress: companyData.companyAddress,
            };
            await updateCompanyProfileAction(setCompany);   
            toast.success("Company profile updated successfully!");
            setIsEditing(false);
        }catch (error) {
            console.error("Update failed:", error);
            toast.error(error.message || "Error updating company profile");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Loading company profile...</div>;
    }
return (
    <>
        <ToastContainer />
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Company Profile</h2>
                <div className="flex space-x-2">
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            disabled={loading}
                        >
                            <FaSave className="mr-2" />
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            <FaEdit className="mr-2" />
                            Edit
                        </button>
                    )}
                </div>
            </div>

            <div className="mb-4">
                 <label className="block mb-1">Company Logo</label>
                 <input type="file" onChange={handleFileChange} className="w-full border p-2" />
            </div>

            <div className="mb-6">
                <label className="block mb-1 font-medium">Company Name</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="companyName"
                        value={companyData.companyName}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                        disabled={loading}
                    />
                ) : (
                    <p>{companyData.companyName || "Not set"}</p>
                )}
            </div>

            <div className="mb-6">
                <label className="block mb-1 font-medium">Address</label>
                {isEditing ? (
                    <textarea
                        name="companyAddress"
                        value={companyData.companyAddress}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                        disabled={loading}
                    ></textarea>
                ) : (
                    <p>{companyData.companyAddress || "Not set"}</p>
                )}
            </div>
        </div>
    </>
);

};
export default CompanyProfile;