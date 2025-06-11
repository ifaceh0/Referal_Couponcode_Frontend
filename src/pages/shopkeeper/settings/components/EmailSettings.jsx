// import React, { useState } from "react";

// const EmailSettings = () => {
//     const [selectedTemplate, setSelectedTemplate] = useState("Welcome Email");
//     const [templates] = useState([
//         "Welcome Email",
//         "Referral Invitation",
//         "Thank You Email",
//         "Discount Offer Email",
//     ]);

//     const handleTemplateChange = (e) => {
//         setSelectedTemplate(e.target.value);
//     };

//     const handleSave = () => {
//         alert(`Email settings saved with template: ${selectedTemplate}`);
//         // Simulate API call here.
//     };

//     return (
//         <div>
//             <h2 className="text-xl font-bold mb-4">Email Settings</h2>
//             <div className="mb-4">
//                 <label className="block mb-1">Select Email Template</label>
//                 <select
//                     value={selectedTemplate}
//                     onChange={handleTemplateChange}
//                     className="w-full border p-2"
//                 >
//                     {templates.map((template, index) => (
//                         <option key={index} value={template}>
//                             {template}
//                         </option>
//                     ))}
//                 </select>
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

// export default EmailSettings;


// import React, { useState } from "react";
// import { companyDetails, emailTemplates } from "../../../../utils/demoData";

// const EmailSettings = () => {
//     const [selectedTemplate, setSelectedTemplate] = useState("Welcome Email");
//     const [templates] = useState(Object.keys(emailTemplates));
//     const [companyData] = useState(companyDetails);

//     const handleTemplateChange = (e) => {
//         setSelectedTemplate(e.target.value);
//     };

//     const renderTemplatePreview = () => {
//         const template = emailTemplates[selectedTemplate];
//         return template
//             .replace("{companyName}", companyData.name)
//             .replace("{logo}", companyData.logo)
//             .replace("{primaryColor}", companyData.primaryColor)
//             .replace("{offerDetails}", "20%");
//     };

//     const handleSave = () => {
//         alert(`Email settings saved with template: ${selectedTemplate}`);
//         // Simulate API call to save selected template
//     };

//     return (
//         <div className="p-6 bg-gray-100 rounded-lg">
//             <h2 className="text-2xl font-bold mb-6">Email Settings</h2>
//             <div className="mb-6">
//                 <label className="block mb-2 text-lg font-medium">Select Email Template</label>
//                 <select
//                     value={selectedTemplate}
//                     onChange={handleTemplateChange}
//                     className="w-full border p-3 rounded"
//                 >
//                     {templates.map((template, index) => (
//                         <option key={index} value={template}>
//                             {template}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className="mb-6">
//                 <h3 className="text-xl font-semibold mb-3">Template Preview</h3>
//                 <div
//                     className="border p-4 rounded bg-white shadow-sm"
//                     dangerouslySetInnerHTML={{ __html: renderTemplatePreview() }}
//                 ></div>
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

// export default EmailSettings;


import React, { useState, useEffect } from "react";
// import { companyDetails, emailTemplates, referralData, shopkeeperDemoData1 } from "../../../../utils/demoData";
import { companyDetails as staticCompanyDetails, emailTemplates, referralData, shopkeeperDemoData1 } from "../../../../utils/demoData";
import { getProfileAction } from "../../../../api/settingPageApi";
import { getCurrentUser } from "../../../../api/signin";

const EmailSettings = () => {
    const [view, setView] = useState("normal"); // Tracks the current view
    const [selectedTemplate, setSelectedTemplate] = useState("Minimal Template");
    const [intro, setIntro] = useState("Welcome! We're thrilled to have you on board.");
    const [ending, setEnding] = useState(
        "Start sharing your referral code today and earn exciting rewards!"
    );

    const [companyDetails, setCompanyDetails] = useState(staticCompanyDetails); // Dynamic company details
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);

    // Fetch shopkeeper profile using getProfileAction
    useEffect(() => {
        const fetchShopkeeperProfile = async () => {
            try {
                setLoading(true);
                // Fetch the current user's details to get the shopkeeperId
                const user = await getCurrentUser();
                console.log("getCurrentUser result:", user);
                setUserDetails(user);

                if (user?.id) {
                    const response = await getProfileAction(user.id);
                    console.log("Company profile data:", response);
                    if (response) {
                        // Map backend data to companyDetails format
                        const updatedCompanyDetails = {
                            name: response.companyName || staticCompanyDetails.name,
                            logo: response.logoBase64
                                ? `data:image/png;base64,${response.logoBase64}` // Convert Base64 to data URL
                                : staticCompanyDetails.logo,
                            primaryColor: staticCompanyDetails.primaryColor, // Not provided by backend, retain default
                            address: response.companyAddress || staticCompanyDetails.address,
                            contactEmail: response.companyEmail || staticCompanyDetails.contactEmail,
                            contactNumber: response.companyPhone || staticCompanyDetails.contactNumber,
                        };
                        setCompanyDetails(updatedCompanyDetails);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                // Use static data as fallback
            } finally {
                setLoading(false);
            }
        };

        fetchShopkeeperProfile();
    }, []);





    const handleTemplateChange = (e) => {
        setSelectedTemplate(e.target.value);
    };

    const renderTemplatePreview = (isCustom = false) => {
        const template = emailTemplates[selectedTemplate];
        return template
            .replace("{username}", referralData.username)
            .replace("{password}", referralData.password)
            .replace("{referralCode}", referralData.referralCode)
            .replace("{referralLink}", referralData.referralLink)
            .replace("{intro}", isCustom ? intro : "Welcome! We're excited to have you.")
            .replace(
                "{ending}",
                isCustom
                    ? ending
                    : "Start referring your friends and earning amazing rewards."
            )
            .replace("{companyName}", companyDetails.name)
            .replace("{logo}", companyDetails.logo)
            .replace("{primaryColor}", companyDetails.primaryColor)
            .replace("{address}", companyDetails.address)
            .replace("{contactEmail}", companyDetails.contactEmail)
            .replace("{contactNumber}", companyDetails.contactNumber);
    };

    const hasCustomTemplateFeature = shopkeeperDemoData1.subscription.features.includes(
        "Custom Email Templates"
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">
                {view === "normal" ? "Email Settings" : "Custom Email Templates"}
            </h2>

            <div className="flex justify-between items-center mb-6">
                <div>
                    <label className="block mb-2 font-medium">Select Email Template</label>
                    <select
                        value={selectedTemplate}
                        onChange={handleTemplateChange}
                        className="w-full border p-3 rounded"
                    >
                        {Object.keys(emailTemplates).map((template, index) => (
                            <option key={index} value={template}>
                                {template}
                            </option>
                        ))}
                    </select>
                </div>
                {hasCustomTemplateFeature && (
                    <button
                        onClick={() => setView(view === "normal" ? "custom" : "normal")}
                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {view === "normal" ? "Custom Templates" : "Back to Settings"}
                    </button>
                )}
            </div>

            {view === "custom" && (
                <div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Introduction</label>
                        <textarea
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                            className="w-full border p-3 rounded"
                            rows={3}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Ending</label>
                        <textarea
                            value={ending}
                            onChange={(e) => setEnding(e.target.value)}
                            className="w-full border p-3 rounded"
                            rows={3}
                        />
                    </div>
                </div>
            )}

            <div>
                <h3 className="text-xl font-semibold mb-3">Template Preview</h3>
                <div
                    className="border p-4 rounded bg-white shadow-sm overflow-auto"
                    dangerouslySetInnerHTML={{
                        __html: renderTemplatePreview(view === "custom"),
                    }}
                ></div>
            </div>

            {view === "custom" && (
                <button
                    onClick={() => alert(`Custom template "${selectedTemplate}" saved!`)}
                    className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Save Custom Template
                </button>
            )}
        </div>
    );
};

export default EmailSettings;


