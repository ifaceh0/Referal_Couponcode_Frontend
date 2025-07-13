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
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  companyDetails as staticCompanyDetails,
  emailTemplates,
  referralData,
  shopkeeperDemoData1,
} from "../../../../utils/demoData";
import { getProfileAction } from "../../../../api/settingPageApi";
import { getCurrentUser } from "../../../../api/signin";

// ✅ Register default fonts only
const Font = Quill.import("formats/font");
Font.whitelist = ["sans", "serif", "monospace"];
Quill.register(Font, true);

// ✅ Register size options
const Size = Quill.import("formats/size");
Size.whitelist = ["small", "normal", "large", "huge"];
Quill.register(Size, true);

const EmailSettings = () => {
  const [view, setView] = useState("normal");
  const [selectedTemplate, setSelectedTemplate] = useState("Minimal Template");
  const [intro, setIntro] = useState("<p>Welcome! We're thrilled to have you on board.</p>");
  const [ending, setEnding] = useState("<p>Start sharing your referral code today and earn exciting rewards!</p>");
  const [companyDetails, setCompanyDetails] = useState(staticCompanyDetails);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchShopkeeperProfile = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        setUserDetails(user);

        if (user?.id) {
          const response = await getProfileAction(user.id);
          if (response) {
            setCompanyDetails({
              name: response.companyName || staticCompanyDetails.name,
              logo: response.logoBase64
                ? `data:image/png;base64,${response.logoBase64}`
                : staticCompanyDetails.logo,
              primaryColor: staticCompanyDetails.primaryColor,
              address: response.companyAddress || staticCompanyDetails.address,
              contactEmail: response.companyEmail || staticCompanyDetails.contactEmail,
              contactNumber: response.companyPhone || staticCompanyDetails.contactNumber,
            });
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShopkeeperProfile();
  }, []);

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const resetIntroAndEnding = () => {
    setIntro("<p>Welcome! We're thrilled to have you on board.</p>");
    setEnding("<p>Start sharing your referral code today and earn exciting rewards!</p>");
  };

  const renderTemplatePreview = (isCustom = false) => {
    const template = emailTemplates[selectedTemplate];
    return template
      .replace("{username}", referralData.username)
      .replace("{password}", referralData.password)
      .replace("{referralCode}", referralData.referralCode)
      .replace("{referralLink}", referralData.referralLink)
      .replace("{intro}", isCustom ? intro : "<p>Welcome! We're excited to have you.</p>")
      .replace("{ending}", isCustom ? ending : "<p>Start referring your friends and earning amazing rewards.</p>")
      .replace("{companyName}", companyDetails.name)
      .replace("{logo}", companyDetails.logo)
      .replace("{primaryColor}", companyDetails.primaryColor)
      .replace("{address}", companyDetails.address)
      .replace("{contactEmail}", companyDetails.contactEmail)
      .replace("{contactNumber}", companyDetails.contactNumber);
  };

  const hasCustomTemplate = shopkeeperDemoData1.subscription.features.includes("Custom Email Templates");

  // ✅ Use only default font list
  const quillModules = {
    toolbar: [
      [{ font: ["sans", "serif", "monospace"] }],
      [{ size: ["small", "normal", "large", "huge"] }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {view === "normal" ? "Email Settings" : "Custom Email Templates"}
          </h2>
          {hasCustomTemplate && (
            <button
              onClick={() => setView(view === "normal" ? "custom" : "normal")}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {view === "normal" ? "Custom Templates" : "Back to Settings"}
            </button>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Select Email Template</label>
          <select
            value={selectedTemplate}
            onChange={handleTemplateChange}
            className="w-full p-3 border rounded-md"
          >
            {Object.keys(emailTemplates).map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {view === "custom" && (
          <>
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">Custom Introduction</label>
              <ReactQuill value={intro} onChange={setIntro} modules={quillModules} className="bg-white" />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">Custom Ending</label>
              <ReactQuill value={ending} onChange={setEnding} modules={quillModules} className="bg-white" />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => alert(`Custom template "${selectedTemplate}" saved!`)}
                className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Save Custom Template
              </button>
              <button
                onClick={resetIntroAndEnding}
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Reset to Default
              </button>
            </div>
          </>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Template Preview</h3>
          <div
            className="template-preview-wrapper border p-4 rounded bg-gray-50 shadow-sm max-h-[400px] overflow-auto text-sm"
            dangerouslySetInnerHTML={{
              __html: renderTemplatePreview(view === "custom"),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;
