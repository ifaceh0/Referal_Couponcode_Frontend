// import React, { useState } from "react";

// const PersonalProfile = () => {
//     const [personalData, setPersonalData] = useState({
//         name: "John Doe",
//         email: "john@example.com",
//         phone: "1234567890",
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setPersonalData({ ...personalData, [name]: value });
//     };

//     const handleSave = () => {
//         alert("Personal profile saved!");
//         // Simulate API call here.
//     };

//     return (
//         <div>
//             <h2 className="text-xl font-bold mb-4">Personal Profile</h2>
//             <div className="mb-4">
//                 <label className="block mb-1">Name</label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={personalData.name}
//                     onChange={handleInputChange}
//                     className="w-full border p-2"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block mb-1">Email</label>
//                 <input
//                     type="email"
//                     name="email"
//                     value={personalData.email}
//                     onChange={handleInputChange}
//                     className="w-full border p-2"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block mb-1">Phone</label>
//                 <input
//                     type="tel"
//                     name="phone"
//                     value={personalData.phone}
//                     onChange={handleInputChange}
//                     className="w-full border p-2"
//                 />
//             </div>
//             <button
//                 onClick={handleSave}
//                 className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//                 Save Changes
//             </button>
//         </div>
//     );
// };

// export default PersonalProfile;


import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaSave } from "react-icons/fa";
import { getProfileAction, updatePersonalProfileAction } from "../../../../api/settingPageApi";
import { getCurrentUser } from "../../../../api/signin";

const PersonalProfile = ({shopkeeperId}) => {
    const [personalData, setPersonalData] = useState({
        shopkeeperId,
        name: "",
        email: "",
        phone: "",
    });

    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchPersonalProfile = async () => {
            try {
                setLoading(true);
                const user = await getCurrentUser();
                setUserDetails(user);

                if (user?.id) {
                    const response = await getProfileAction(user?.id);
                    console.log("Personal profile data:", response);
                    if (response) {
                        setPersonalData({
                            shopkeeperId,
                            name: response.name || "",
                            email: response.email || "",
                            phone: response.phone || "",
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                toast.error(error.message || "Failed to load personal profile");
            } finally {
                setLoading(false);
            }
        };
        fetchPersonalProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalData((prev) => ({ ...prev, [name]: value }));
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            // setLoading(true);
            const setProfile = {
                shopkeeperId: userDetails?.id,
                name: personalData.name,
                email: personalData.email,
                phone: personalData.phone,
            };
            await updatePersonalProfileAction(setProfile);
            toast.success("Personal profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error(error.message || "Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Loading personal profile...</div>;
    }

    return (
        <>
            <ToastContainer />
            <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Personal Profile</h2>
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

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={personalData.name}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                    ) : (
                        <p>{personalData.name || "Not set"}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={personalData.email}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                    ) : (
                        <p>{personalData.email || "Not set"}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Phone</label>
                    {isEditing ? (
                        <input
                            type="tel"
                            name="phone"
                            value={personalData.phone}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                    ) : (
                        <p>{personalData.phone || "Not set"}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default PersonalProfile;