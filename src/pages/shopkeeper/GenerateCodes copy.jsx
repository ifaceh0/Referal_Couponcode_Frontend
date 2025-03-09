import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { generateCouponCode, uploadBulkCouponCodes } from "../../api/couponCodes";
import { generateReferralCode, uploadBulkReferralCodes } from "../../api/referralCodes";

const GenerateCodes = () => {
  const [step, setStep] = useState(1);
  const [selectedCodeType, setSelectedCodeType] = useState("");
  const [selectedGenerationType, setSelectedGenerationType] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    usageLimit: "",
    expiryDate: "",
  });
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkPreview, setBulkPreview] = useState([]);
  const [bulkExpiryDate, setBulkExpiryDate] = useState("");
  const [bulkReferralAmount, setBulkReferralAmount] = useState("");
  const [bulkLimit, setBulkLimit] = useState("");
  const [generatedCodes, setGeneratedCodes] = useState([]);

  // useEffect(() => {
  //   // Load existing codes from local storage
  //   const referralCodes = JSON.parse(localStorage.getItem("referralCodes")) || [];
  //   const couponCodes = JSON.parse(localStorage.getItem("couponCodes")) || [];
  //   setGeneratedCodes([...referralCodes, ...couponCodes]);
  // }, []);

  // const saveToLocalStorage = (newCodes, type) => {
  //   const key = type === "Referral" ? "referralCodes" : "couponCodes";
  //   const storedCodes = JSON.parse(localStorage.getItem(key)) || [];
  //   localStorage.setItem(key, JSON.stringify([...storedCodes, ...newCodes]));
  // };

  // const generateCode = (name, email, type) => {
  //   const uniquePart = Math.random().toString(36).substring(2, 8).toUpperCase();
  //   return `${name || email || type.toUpperCase()}-${uniquePart}`;
  // };

  const handleIndividualGenerate = () => {
    const { name, email, phone, expiryDate, amount, limit } = form;

    if (!name && !email) {
      alert("Name or Email is required.");
      return;
    }
    if (!expiryDate || !amount || (selectedCodeType === "Coupon" && !limit)) {
      alert("All fields are required.");
      return;
    }

    const newCode = {
      ...form,
      code: generateCode(name, email, selectedCodeType),
      type: selectedCodeType,
    };

    setGeneratedCodes([...generatedCodes, newCode]);
    saveToLocalStorage([newCode], selectedCodeType);

    // Reset form
    setForm({
      name: "",
      email: "",
      phone: "",
      expiryDate: "",
      amount: "",
      limit: "",
    });
  };

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!["csv", "xls", "xlsx", "txt"].includes(fileExtension)) {
      alert("Unsupported file format. Please upload a .csv, .xls, .xlsx, or .txt file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      if (["csv", "txt"].includes(fileExtension)) {
        const rows = content.split("\n").map((row) => row.split(","));
        setBulkPreview(rows.slice(1)); // Ignore header
      } else if (["xls", "xlsx"].includes(fileExtension)) {
        const workbook = XLSX.read(content, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        setBulkPreview(sheet.slice(1)); // Ignore header
      }
    };
    if (["xls", "xlsx"].includes(fileExtension)) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleBulkGenerate = () => {
    if (!bulkExpiryDate || !bulkReferralAmount || (selectedCodeType === "Coupon" && !bulkLimit)) {
      alert("Please provide all required fields.");
      return;
    }

    const bulkCodes = bulkPreview.map(([name, email, phone]) => ({
      name: name || "Anonymous",
      email: email || "N/A",
      phone: phone || "N/A",
      expiryDate: bulkExpiryDate,
      amount: bulkReferralAmount,
      limit: selectedCodeType === "Coupon" ? bulkLimit : undefined,
      code: generateCode(name, email, selectedCodeType),
      type: selectedCodeType,
    }));

    setGeneratedCodes([...generatedCodes, ...bulkCodes]);
    saveToLocalStorage(bulkCodes, selectedCodeType);

    // Reset bulk inputs
    setBulkFile(null);
    setBulkPreview([]);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Generate Codes</h1>

      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Select Code Type</h2>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setSelectedCodeType("Referral");
                setStep(2);
              }}
              className={`p-4 rounded-lg border ${
                selectedCodeType === "Referral" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              disabled={!!selectedCodeType}
            >
              Referral Code
            </button>
            <button
              onClick={() => {
                setSelectedCodeType("Coupon");
                setStep(2);
              }}
              className={`p-4 rounded-lg border ${
                selectedCodeType === "Coupon" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
              disabled={!!selectedCodeType}
            >
              Coupon Code
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Select Generation Type</h2>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setSelectedGenerationType("Individual");
                setStep(3);
              }}
              className={`p-4 rounded-lg border ${
                selectedGenerationType === "Individual" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              disabled={!!selectedGenerationType}
            >
              Individual
            </button>
            <button
              onClick={() => {
                setSelectedGenerationType("Mass");
                setStep(3);
              }}
              className={`p-4 rounded-lg border ${
                selectedGenerationType === "Mass" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
              disabled={!!selectedGenerationType}
            >
              Mass
            </button>
          </div>
        </div>
      )}

      {step === 3 && selectedGenerationType === "Individual" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Generate Individual {selectedCodeType} Code</h2>
          <div className="flex flex-wrap gap-4 mb-4">
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
            {selectedCodeType === "Coupon" && (
              <input
                type="number"
                placeholder="Limit"
                value={form.limit}
                onChange={(e) => setForm({ ...form, limit: e.target.value })}
                className="border rounded p-2"
              />
            )}
          </div>
          <button
            onClick={handleIndividualGenerate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Generate Code
          </button>
        </div>
      )}

      {step === 3 && selectedGenerationType === "Mass" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Generate Mass {selectedCodeType} Codes</h2>
          <div className="flex flex-wrap gap-4 mb-4">
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
            {selectedCodeType === "Coupon" && (
              <input
                type="number"
                placeholder="Limit"
                value={bulkLimit}
                onChange={(e) => setBulkLimit(e.target.value)}
                className="border rounded p-2"
              />
            )}
          </div>
          <button
            onClick={handleBulkGenerate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Generate Bulk Codes
          </button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Generated Codes</h2>
        <table className="table-auto w-full border-collapse border bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Code</th>
              <th className="border p-2">Expiry Date</th>
              <th className="border p-2">Amount ($)</th>
              {selectedCodeType === "Coupon" && <th className="border p-2">Limit</th>}
              <th className="border p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {generatedCodes.map((code, index) => (
              <tr key={index}>
                <td className="border p-2">{code.name}</td>
                <td className="border p-2">{code.email}</td>
                <td className="border p-2">{code.phone}</td>
                <td className="border p-2">{code.code}</td>
                <td className="border p-2">{code.expiryDate}</td>
                <td className="border p-2">{code.amount}</td>
                {selectedCodeType === "Coupon" && <td className="border p-2">{code.limit}</td>}
                <td className="border p-2">{code.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleRefresh}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Back
      </button>
    </div>
  );
};

export default GenerateCodes;