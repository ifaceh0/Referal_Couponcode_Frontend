import React, { useState } from "react";
import CompanyProfile from "./components/CompanyProfile";
import PersonalProfile from "./components/PersonalProfile";
import EmailSettings from "./components/EmailSettings";
import SMSSettings from "./components/SMSSettings";
import ReferralCodeSettings from "./components/ReferralCodeSettings";
import GeneralSettings from "./components/GeneralSettings";

const tabs = [
    { id: "companyProfile", label: "Company Profile" },
    { id: "personalProfile", label: "Personal Profile" },
    { id: "emailSettings", label: "Email" },
    // { id: "smsSettings", label: "SMS" },
    { id: "referralCodeSettings", label: "Promotion" },
    { id: "generalSettings", label: "General" },
];

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState("companyProfile");

    const renderTabContent = () => {
        switch (activeTab) {
            case "companyProfile":
                return <CompanyProfile />;
            case "personalProfile":
                return <PersonalProfile />;
            case "emailSettings":
                return <EmailSettings />;
            // case "smsSettings":
            //     return <SMSSettings />;
            case "referralCodeSettings":
                return <ReferralCodeSettings />;
            case "generalSettings":
                return <GeneralSettings />;
            default:
                return <div>Select a tab to view settings.</div>;
        }
    };

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            {/* Tabs */}
            <div className="flex space-x-4 border-b-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-4 ${
                            activeTab === tab.id
                                ? "border-b-4 border-blue-500 text-blue-600"
                                : "text-gray-600"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {/* Tab Content */}
            <div>{renderTabContent()}</div>
        </div>
    );
};

export default SettingsPage;
