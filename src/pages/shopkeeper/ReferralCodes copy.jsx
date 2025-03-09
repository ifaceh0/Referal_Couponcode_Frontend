import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { colorPalette } from "../../utils/demoData";
import { generateReferralCode, uploadBulkReferralCodes } from "../../api/referralCodes";

const ReferralCodes = () => {
  const [codes, setCodes] = useState([]);
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkPreview, setBulkPreview] = useState([]);
  const [bulkExpiryDate, setBulkExpiryDate] = useState("");
  const [bulkReferralAmount, setBulkReferralAmount] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    expiryDate: "",
    amount: "",
  });

  // useEffect(() => {
  //   const storedCodes = JSON.parse(localStorage.getItem("referralCodes")) || [];
  //   setCodes(storedCodes);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("referralCodes", JSON.stringify(codes));
  // }, [codes]);

  // const generateReferralCode = (name, email) => {
  //   const uniquePart = Math.random().toString(36).substring(2, 8).toUpperCase();
  //   return `${name || email || "REF"}-${uniquePart}`;
  // };

  const handleGenerateCode = async () => {
    if (!form.name && !form.email) {
      alert("Name or Email is required to generate a coupon code.");
      return;
    }
    if (!form.expiryDate || !form.amount) {
      alert("Expiry Date and Referral Amount are required.");
      return;
    }
    try {
      const result = await generateReferralCode(form);
      alert(result.message || "Code generated successfully.");
      setCodes([...codes, { ...form, referralCode: result.referralCode }]);
      setForm({
        name: "",
        email: "",
        phone: "",
        expiryDate: "",
        amount: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGenerateCodelocal = () => {
    if (!form.name && !form.email) {
      alert("Name or Email is required to generate a referral code.");
      return;
    }
    if (!form.expiryDate || !form.amount) {
      alert("Expiry Date and Referral Amount are required.");
      return;
    }

    const newCode = {
      ...form,
      referralCode: generateReferralCode(form.name, form.email),
    };

    setCodes([...codes, newCode]);
    setForm({
      name: "",
      email: "",
      phone: "",
      expiryDate: "",
      amount: "",
    });
  };

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!["csv", "xls", "xlsx"].includes(fileExtension)) {
      alert("Unsupported file format. Please upload a .csv, .xls, .xlsx, or .txt file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      if (["csv", "txt"].includes(fileExtension)) {
        const rows = content.split("\n").map((row) => row.split(","));
        setBulkPreview(rows.slice(1));
      } else if (["xls", "xlsx"].includes(fileExtension)) {
        const workbook = XLSX.read(content, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        setBulkPreview(sheet.slice(1));
      }
    };
    if (["xls", "xlsx"].includes(fileExtension)) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleBulkGenerate = async () => {
    if (!bulkExpiryDate || !bulkReferralAmount) {
      alert("Please provide an expiry date and referral amount.");
      return;
    }
    try {
      const result = await uploadBulkReferralCodes(bulkFile, bulkExpiryDate, bulkReferralAmount);
      alert(result.message || "Bulk codes generated successfully.");
      setCodes([...codes, ...result.generatedCodes]); // Assuming API returns generated codes
      setBulkFile(null);
      setBulkPreview([]);
    } catch (error) {
      alert(error.message);
    }
  };
  

  const handleBulkGeneratelocal = () => {
    if (!bulkExpiryDate || !bulkReferralAmount) {
      alert("Please provide an expiry date and referral amount.");
      return;
    }

    const bulkCodes = bulkPreview.map(([name, email, phone]) => ({
      name: name || "Anonymous",
      email: email || "N/A",
      phone: phone || "N/A",
      expiryDate: bulkExpiryDate,
      amount: bulkReferralAmount,
      referralCode: generateReferralCode(name, email),
    }));

    setCodes([...codes, ...bulkCodes]);
    setBulkFile(null);
    setBulkPreview([]);
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: colorPalette.primaryLight }}
    >
      <h1 className="text-3xl font-bold text-white mb-6">Manage Referral Codes</h1>

      {/* Individual Code Generation */}
      <section className="mb-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>
          Generate Individual Code
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="date"
            value={form.expiryDate}
            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Referral Amount ($)"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={handleGenerateCode}
          className="px-4 py-2 rounded"
          style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}
        >
          Generate Code
        </button>
      </section>

      {/* Bulk Upload Section */}
      <section className="mb-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.secondaryDark }}>
          Mass Codes Generation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="file"
            accept=".csv, .xls, .xlsx, .txt"
            onChange={handleBulkUpload}
            className="block text-sm"
          />
          <input
            type="date"
            value={bulkExpiryDate}
            onChange={(e) => setBulkExpiryDate(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Referral Amount ($)"
            value={bulkReferralAmount}
            onChange={(e) => setBulkReferralAmount(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={handleBulkGenerate}
          className="px-4 py-2 rounded"
          style={{ backgroundColor: colorPalette.secondary, color: colorPalette.white }}
        >
          Generate Bulk Codes
        </button>
      </section>

      {/* Preview Table */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.accentDark }}>
          Generated Codes
        </h2>
        <table className="table-auto w-full border-collapse border bg-white shadow-md rounded-md">
          <thead>
            <tr style={{ backgroundColor: colorPalette.primaryLight }}>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Phone</th>
              <th className="border p-2 text-left">Referral Code</th>
              <th className="border p-2 text-left">Expiry Date</th>
              <th className="border p-2 text-left">Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border p-2">{code.name}</td>
                <td className="border p-2">{code.email}</td>
                <td className="border p-2">{code.phone}</td>
                <td className="border p-2">{code.referralCode}</td>
                <td className="border p-2">{code.expiryDate}</td>
                <td className="border p-2">{code.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ReferralCodes;


// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import { colorPalette } from "../../utils/demoData";

// const ReferralCodes = () => {
//   const [codes, setCodes] = useState([]);
//   const [bulkFile, setBulkFile] = useState(null);
//   const [bulkPreview, setBulkPreview] = useState([]);
//   const [bulkExpiryDate, setBulkExpiryDate] = useState("");
//   const [bulkReferralAmount, setBulkReferralAmount] = useState("");
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     expiryDate: "",
//     amount: "",
//   });

//   useEffect(() => {
//     const storedCodes = JSON.parse(localStorage.getItem("referralCodes")) || [];
//     setCodes(storedCodes);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("referralCodes", JSON.stringify(codes));
//   }, [codes]);

//   const generateReferralCode = (name, email) => {
//     const uniquePart = Math.random().toString(36).substring(2, 8).toUpperCase();
//     return `${name || email || "REF"}-${uniquePart}`;
//   };

//   const handleGenerateCode = () => {
//     if (!form.name && !form.email) {
//       alert("Name or Email is required to generate a referral code.");
//       return;
//     }
//     if (!form.expiryDate || !form.amount) {
//       alert("Expiry Date and Referral Amount are required.");
//       return;
//     }

//     const newCode = {
//       ...form,
//       referralCode: generateReferralCode(form.name, form.email),
//     };

//     setCodes([...codes, newCode]);
//     setForm({
//       name: "",
//       email: "",
//       phone: "",
//       expiryDate: "",
//       amount: "",
//     });
//   };

//   const handleBulkUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const fileExtension = file.name.split(".").pop().toLowerCase();
//     if (!["csv", "xls", "xlsx", "txt"].includes(fileExtension)) {
//       alert("Unsupported file format. Please upload a .csv, .xls, .xlsx, or .txt file.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const content = e.target.result;
//       if (["csv", "txt"].includes(fileExtension)) {
//         const rows = content.split("\n").map((row) => row.split(","));
//         setBulkPreview(rows.slice(1));
//       } else if (["xls", "xlsx"].includes(fileExtension)) {
//         const workbook = XLSX.read(content, { type: "binary" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
//         setBulkPreview(sheet.slice(1));
//       }
//     };

//     if (["xls", "xlsx"].includes(fileExtension)) {
//       reader.readAsBinaryString(file);
//     } else {
//       reader.readAsText(file);
//     }
//   };

//   const handleBulkGenerate = () => {
//     if (!bulkExpiryDate || !bulkReferralAmount) {
//       alert("Please provide an expiry date and referral amount.");
//       return;
//     }

//     const bulkCodes = bulkPreview.map(([name, email, phone]) => ({
//       name: name || "Anonymous",
//       email: email || "N/A",
//       phone: phone || "N/A",
//       expiryDate: bulkExpiryDate,
//       amount: bulkReferralAmount,
//       referralCode: generateReferralCode(name, email),
//     }));

//     setCodes([...codes, ...bulkCodes]);
//     setBulkFile(null);
//     setBulkPreview([]);
//   };

//   return (
//     <div className="min-h-screen p-8 bg-white">
//       <h1 className="text-3xl font-bold mb-6 text-black">Manage Referral Codes</h1>

//       {/* Individual Code Generation */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-black">Generate Individual Code</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="p-3 border rounded shadow-md"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="p-3 border rounded shadow-md"
//           />
//           <input
//             type="text"
//             placeholder="Phone"
//             value={form.phone}
//             onChange={(e) => setForm({ ...form, phone: e.target.value })}
//             className="p-3 border rounded shadow-md"
//           />
//           <input
//             type="date"
//             value={form.expiryDate}
//             onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
//             className="p-3 border rounded shadow-md"
//           />
//           <input
//             type="number"
//             placeholder="Referral Amount ($)"
//             value={form.amount}
//             onChange={(e) => setForm({ ...form, amount: e.target.value })}
//             className="p-3 border rounded shadow-md"
//           />
//         </div>
//         <button
//           onClick={handleGenerateCode}
//           className="bg-purple-500 text-white px-6 py-2 rounded shadow-md hover:bg-purple-600"
//         >
//           Generate Code
//         </button>
//       </section>

//       {/* Bulk Upload */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-black">Mass Codes Generation</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           <input
//             type="file"
//             accept=".csv, .xls, .xlsx, .txt"
//             onChange={handleBulkUpload}
//             className="p-3 border rounded shadow-md"
//           />
//           <input
//             type="date"
//             value={bulkExpiryDate}
//             onChange={(e) => setBulkExpiryDate(e.target.value)}
//             className="p-3 border rounded shadow-md"
//           />
//           <input
//             type="number"
//             placeholder="Referral Amount ($)"
//             value={bulkReferralAmount}
//             onChange={(e) => setBulkReferralAmount(e.target.value)}
//             className="p-3 border rounded shadow-md"
//           />
//         </div>
//         <button
//           onClick={handleBulkGenerate}
//           className="bg-orange-500 text-white px-6 py-2 rounded shadow-md hover:bg-orange-600"
//         >
//           Generate Bulk Codes
//         </button>
//       </section>

//       {/* Table */}
//       <section>
//         <h2 className="text-xl font-semibold mb-4 text-black">Generated Codes</h2>
//         <table className="w-full border border-collapse shadow-md">
//           <thead className="bg-blue-500 text-white">
//             <tr>
//               <th className="p-3 border">Name</th>
//               <th className="p-3 border">Email</th>
//               <th className="p-3 border">Phone</th>
//               <th className="p-3 border">Referral Code</th>
//               <th className="p-3 border">Expiry Date</th>
//               <th className="p-3 border">Amount ($)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {codes.map((code, index) => (
//               <tr key={index} className="hover:bg-purple-100">
//                 <td className="p-3 border">{code.name}</td>
//                 <td className="p-3 border">{code.email}</td>
//                 <td className="p-3 border">{code.phone}</td>
//                 <td className="p-3 border">{code.referralCode}</td>
//                 <td className="p-3 border">{code.expiryDate}</td>
//                 <td className="p-3 border">{code.amount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// };

// export default ReferralCodes;
