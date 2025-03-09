import React, { useState } from "react";
import { saveGeneralSettings, getGeneralSettings } from "../../../../utils/demoData";

const GeneralSettings = () => {
    const [timezone, setTimezone] = useState(getGeneralSettings().timezone || "UTC");
    const [dateFormat, setDateFormat] = useState(getGeneralSettings().dateFormat || "YYYY-MM-DD");
    const [useCredits, setUseCredits] = useState(getGeneralSettings().useCredits || false);

    const handleSave = () => {
        const settings = { timezone, dateFormat, useCredits };
        saveGeneralSettings(settings);
        alert("General settings saved successfully.");
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">General Settings</h2>
            {/* Timezone Setting */}
            <div className="mb-4">
                <label className="block mb-1">Timezone</label>
                <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full border p-2"
                >
                    <option value="UTC">UTC</option>
                    <option value="PST">PST</option>
                    <option value="EST">EST</option>
                </select>
            </div>

            {/* Date Format Setting */}
            <div className="mb-4">
                <label className="block mb-1">Date Format</label>
                <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full border p-2"
                >
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                    <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                </select>
            </div>

            {/* Use Credits Setting */}
            <div className="mb-4">
                <label className="block mb-1">Use Points or Credits</label>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={useCredits}
                        onChange={(e) => setUseCredits(e.target.checked)}
                        className="mr-2"
                    />
                    <span>Enable Credits (Dollars) instead of Points</span>
                </div>
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Save Changes
            </button>
        </div>
    );
};

export default GeneralSettings;
