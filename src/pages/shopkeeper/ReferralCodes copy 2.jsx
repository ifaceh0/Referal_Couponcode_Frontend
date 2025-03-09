import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import { colorPalette } from "../../utils/demoData";
import { generateReferralCode, uploadBulkReferralCodes } from "../../api/referralCodes";
import { getAllUsers } from "../../api/users";

const ReferralCodes = () => {
  const [codes, setCodes] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkPreview, setBulkPreview] = useState([]);
  const [bulkExpiryDate, setBulkExpiryDate] = useState("");
  const [bulkReferralAmount, setBulkReferralAmount] = useState("");
  const [bulkReferrerAmount, setBulkReferrerAmount] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    expiryDate: "",
    referralAmount: "",
    referrerAmount: "",
  });

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const result = await getAllUsers();
  //       setUsers(result.user ? [result.user] : []);
  //     } catch (error) {
  //       console.error("Failed to fetch users:", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const result = await getAllUsers();
        setUsers(result); // Assuming `result` is the array of users
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleGenerateCode = async () => {
    if (!form.name && !form.email) {
      alert("Name or Email is required to generate a referral code.");
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
        ramount: "",
      });
    } catch (error) {
      alert(error.message);
    }
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
      setCodes([...codes, ...result.generatedCodes]);
      setBulkFile(null);
      setBulkPreview([]);
    } catch (error) {
      alert(error.message);
    }
  };

  const userRows = users.map((user) => ({
    name: user.name || "Anonymous",
    email: user.email || "N/A",
    phone: user.phone || "N/A",
    referralCode: user.referralCode?.code || "N/A",
    expiryDate: user.referralCode?.expirationDate || "N/A",
    amount: user.referralCode?.amount || "N/A",
    status: user.referralCode?.status || "N/A",
  }));

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
          <input
            type="number"
            placeholder="Referrer Amount ($)"
            value={form.ramount}
            onChange={(e) => setForm({ ...form, ramount: e.target.value })}
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
          <input
            type="number"
            placeholder="Referrer Amount ($)"
            value={bulkReferrerAmount}
            onChange={(e) => setBulkReferrerAmount(e.target.value )}
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

      {/* Responsive Table */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.accentDark }}>
          User Details
        </h2>
        {/* <ResponsiveTable
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email" },
            { header: "Phone", accessor: "phone" },
            { header: "Referral Code", accessor: "referralCode" },
            { header: "Expiry Date", accessor: "expiryDate" },
            { header: "Amount ($)", accessor: "amount" },
          ]}
          data={userRows}
        /> */}
        <ResponsiveTable
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email" },
            { header: "Phone", accessor: "phone" },
            { header: "Referral Code", accessor: "referralCode" },
            { header: "Expiry Date", accessor: "expiryDate" },
            { header: "Amount ($)", accessor: "amount" },
            { header: "Status", accessor: "status" },
          ]}
          data={userRows}
          onRefresh={() => console.log("Data refreshed!")} // Replace with actual refresh logic
          enableSearch={true}
          enableRefresh={true}
        />
      </section>
    </div>
  );
};

export default ReferralCodes;
