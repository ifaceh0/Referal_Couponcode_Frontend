import React, { useState } from "react";
import { companyDetails, smsTemplates, referralData, shopkeeperDemoData1 } from "../../../../utils/demoData";


const SMSSettings = () => {
    const [view, setView] = useState("normal"); // Tracks current view (normal/custom)
    const [selectedTemplate, setSelectedTemplate] = useState("Minimal Template");
    const [intro, setIntro] = useState("Welcome to our referral program!");
    const [ending, setEnding] = useState(
        "Share your referral code now and earn amazing rewards!"
    );

    const handleTemplateChange = (e) => {
        setSelectedTemplate(e.target.value);
    };

    const renderTemplatePreview = (isCustom = false) => {
        const template = smsTemplates[selectedTemplate];
        return template
            .replace("{username}", referralData.username)
            .replace("{referralCode}", referralData.referralCode)
            .replace("{referralLink}", referralData.referralLink)
            .replace("{companyName}", companyDetails.name)
            .replace("{intro}", isCustom ? intro : "Welcome to our referral program!")
            .replace(
                "{ending}",
                isCustom
                    ? ending
                    : "Start sharing your referral code to earn exciting rewards."
            );
    };

    const hasCustomSMSTemplateFeature = shopkeeperDemoData1.subscription.features.includes(
        "Custom SMS Templates"
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">
                {view === "normal" ? "SMS Settings" : "Custom SMS Templates"}
            </h2>

            <div className="flex justify-between items-center mb-6">
                <div>
                    <label className="block mb-2 font-medium">Select SMS Template</label>
                    <select
                        value={selectedTemplate}
                        onChange={handleTemplateChange}
                        className="w-full border p-3 rounded"
                    >
                        {Object.keys(smsTemplates).map((template, index) => (
                            <option key={index} value={template}>
                                {template}
                            </option>
                        ))}
                    </select>
                </div>
                {hasCustomSMSTemplateFeature && (
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
                            rows={2}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Ending</label>
                        <textarea
                            value={ending}
                            onChange={(e) => setEnding(e.target.value)}
                            className="w-full border p-3 rounded"
                            rows={2}
                        />
                    </div>
                </div>
            )}

            <div>
                <h3 className="text-xl font-semibold mb-3">Template Preview</h3>
                <div className="border p-4 rounded bg-white shadow-sm">
                    <p>{renderTemplatePreview(view === "custom")}</p>
                </div>
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

export default SMSSettings;
