import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import { colorPalette } from "../../utils/demoData";
import { generateCouponCode, uploadBulkCouponCodes } from "../../api/couponCodes";
import { getAllUsers } from "../../api/users";

const CouponCodes = () => {
  const [codes, setCodes] = useState([]); // Dynamically generated codes
  const [allCodes, setAllCodes] = useState([]); // Combined stored and newly generated codes
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkPreview, setBulkPreview] = useState([]);
  const [bulkExpiryDate, setBulkExpiryDate] = useState("");
  const [bulkLimit, setBulkLimit] = useState("");
  const [bulkReferralAmount, setBulkReferralAmount] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    usageLimit: "",
    expiryDate: "",
  });

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

  // useEffect(() => {
  //   const storedCodes = JSON.parse(localStorage.getItem("couponCodes")) || [];
  //   setAllCodes(storedCodes); // Initialize allCodes with stored data
  // }, []);

  // const updateLocalStorage = (newCodes) => {
  //   const storedCodes = JSON.parse(localStorage.getItem("couponCodes")) || [];
  //   const updatedCodes = [...storedCodes, ...newCodes];
  //   localStorage.setItem("couponCodes", JSON.stringify(updatedCodes));
  //   setAllCodes(updatedCodes); // Update the combined list
  // };

  // const generateCouponCode = (name, email) => {
  //   const uniquePart = Math.random().toString(36).substring(2, 8).toUpperCase();
  //   return `${name || email || "COUPON"}-${uniquePart}`;
  // };

  const handleGenerateCode = async () => {
    if (!form.name && !form.email) {
      alert("Name or Email is required to generate a coupon code.");
      return;
    }
    if (!form.expiryDate || !form.amount || !form.usageLimit) {
      alert("Expiry Date, Referral Amount, and Limit are required.");
      return;
    }

    try {
      const result = await generateCouponCode(form);
      alert(result.message || "Code generated successfully.");
      setCodes([...codes, { ...form, couponCode: result.couponCode }]);
      setForm({
        name: "",
        email: "",
        phone: "",
        expiryDate: "",
        amount: "",
        usageLimit: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGenerateCodelocal = () => {
    if (!form.name && !form.email) {
      alert("Name or Email is required to generate a coupon code.");
      return;
    }
    if (!form.expiryDate || !form.amount || !form.usageLimit) {
      alert("Expiry Date, Referral Amount, and Limit are required.");
      return;
    }

    const newCode = {
      ...form,
      couponCode: generateCouponCode(form.name, form.email),
    };

    const newCodes = [...codes, newCode];
    setCodes(newCodes);
    updateLocalStorage([newCode]); // Save new code to localStorage
    setForm({
      name: "",
      email: "",
      phone: "",
      expiryDate: "",
      amount: "",
      usageLimit: "",
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

  const handleBulkGenerate = async () => {
    if (!bulkExpiryDate || !bulkReferralAmount || !bulkLimit) {
      alert("Please provide an expiry date, referral amount, and usageLimit.");
      return;
    }
    try {
      const result = await uploadBulkCouponCodes(bulkFile, bulkExpiryDate, bulkReferralAmount, bulkLimit);
      alert(result.message || "Bulk codes generated successfully.");
      setCodes([...codes, ...result.generatedCodes]); // Assuming API returns generated codes
      setBulkFile(null);
      setBulkPreview([]);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleBulkGeneratelocal = () => {
    if (!bulkExpiryDate || !bulkReferralAmount || !bulkLimit) {
      alert("Please provide an expiry date, referral amount, and usageLimit.");
      return;
    }

    const bulkCodes = bulkPreview.map(([name, email, phone]) => ({
      name: name || "Anonymous",
      email: email || "N/A",
      phone: phone || "N/A",
      expiryDate: bulkExpiryDate,
      amount: bulkReferralAmount,
      usageLimit: bulkLimit,
      couponCode: generateCouponCode(name, email),
    }));

    setCodes([...codes, ...bulkCodes]);
    updateLocalStorage(bulkCodes); // Save bulk codes to localStorage
    setBulkFile(null);
    setBulkPreview([]);
  };

  const userRows = users.map((user) => ({
    name: user.name || "Anonymous",
    email: user.email || "N/A",
    phone: user.phone || "N/A",
    referralCode: user.couponCode?.code || "N/A",
    expiryDate: user.couponCode?.expirationDate || "N/A",
    amount: user.couponCode?.amount || "N/A",
    status: user.couponCode?.status || "N/A",
  }));

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: colorPalette.primaryLight }}
    >
      <h1 className="text-3xl font-bold mb-6" style={{ color: colorPalette.white }}>
        Manage Coupon Codes
      </h1>

      {/* Individual Code Generation */}
      <div className="mb-8 bg-white p-6 rounded shadow-md">
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
            placeholder="Coupon Amount ($)"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Limit"
            value={form.usageLimit}
            onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={handleGenerateCode}
          className="px-4 py-2 rounded shadow"
          style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}
        >
          Generate Code
        </button>
      </div>

      {/* Bulk Upload Section */}
      <div className="mb-8 bg-white p-6 rounded shadow-md">
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
            placeholder="Limit"
            value={bulkLimit}
            onChange={(e) => setBulkLimit(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={handleBulkGenerate}
          className="px-4 py-2 rounded shadow"
          style={{ backgroundColor: colorPalette.secondary, color: colorPalette.white }}
        >
          Generate Bulk Codes
        </button>
      </div>

      {/* Preview Table
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.accentDark }}>
          Generated and Stored Codes
        </h2>
        <table className="table-auto w-full border-collapse border bg-white shadow-md rounded-md">
          <thead>
            <tr style={{ backgroundColor: colorPalette.primaryLight }}>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Phone</th>
              <th className="border p-2 text-left">Coupon Code</th>
              <th className="border p-2 text-left">Expiry Date</th>
              <th className="border p-2 text-left">Amount ($)</th>
              <th className="border p-2 text-left">Limit</th>
            </tr>
          </thead>
          <tbody>
            {allCodes.map((code, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border p-2">{code.name}</td>
                <td className="border p-2">{code.email}</td>
                <td className="border p-2">{code.phone}</td>
                <td className="border p-2">{code.couponCode}</td>
                <td className="border p-2">{code.expiryDate}</td>
                <td className="border p-2">{code.amount}</td>
                <td className="border p-2">{code.usageLimit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
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
            { header: "Referral Code", accessor: "couponCode" },
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
            { header: "Coupon Code", accessor: "couponCode" },
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

export default CouponCodes;



// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";

// const CouponCodes = () => {
//   const [codes, setCodes] = useState([]); // Dynamically generated codes
//   const [allCodes, setAllCodes] = useState([]); // Combined stored and newly generated codes
//   const [bulkFile, setBulkFile] = useState(null);
//   const [bulkPreview, setBulkPreview] = useState([]);
//   const [bulkExpiryDate, setBulkExpiryDate] = useState("");
//   const [bulkLimit, setBulkLimit] = useState("");
//   const [bulkReferralAmount, setBulkReferralAmount] = useState("");
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     expiryDate: "",
//     amount: "",
//     usageLimit: "",
//   });

//   // Load coupon codes from localStorage on page load
//   useEffect(() => {
//     const storedCodes = JSON.parse(localStorage.getItem("couponCodes")) || [];
//     setAllCodes(storedCodes); // Initialize allCodes with stored data
//   }, []);

//   // Save new codes to localStorage without overwriting
//   const updateLocalStorage = (newCodes) => {
//     const storedCodes = JSON.parse(localStorage.getItem("couponCodes")) || [];
//     const updatedCodes = [...storedCodes, ...newCodes];
//     localStorage.setItem("couponCodes", JSON.stringify(updatedCodes));
//     setAllCodes(updatedCodes); // Update the combined list
//   };

//   // Generate a unique coupon code
//   const generateCouponCode = (name, email) => {
//     const uniquePart = Math.random().toString(36).substring(2, 8).toUpperCase();
//     return `${name || email || "COUPON"}-${uniquePart}`;
//   };

//   // Handle individual code generation
//   const handleGenerateCode = () => {
//     if (!form.name && !form.email) {
//       alert("Name or Email is required to generate a coupon code.");
//       return;
//     }
//     if (!form.expiryDate || !form.amount || !form.usageLimit) {
//       alert("Expiry Date, Referral Amount, and Limit are required.");
//       return;
//     }

//     const newCode = {
//       ...form,
//       couponCode: generateCouponCode(form.name, form.email),
//     };

//     const newCodes = [...codes, newCode];
//     setCodes(newCodes);
//     updateLocalStorage([newCode]); // Save new code to localStorage
//     setForm({
//       name: "",
//       email: "",
//       phone: "",
//       expiryDate: "",
//       amount: "",
//       usageLimit: "",
//     });
//   };

//   // Handle bulk upload preview and code generation
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
//         setBulkPreview(rows.slice(1)); // Ignore header
//       } else if (["xls", "xlsx"].includes(fileExtension)) {
//         const workbook = XLSX.read(content, { type: "binary" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
//         setBulkPreview(sheet.slice(1)); // Ignore header
//       }
//     };
//     if (["xls", "xlsx"].includes(fileExtension)) {
//       reader.readAsBinaryString(file);
//     } else {
//       reader.readAsText(file);
//     }
//   };

//   const handleBulkGenerate = () => {
//     if (!bulkExpiryDate || !bulkReferralAmount || !bulkLimit) {
//       alert("Please provide an expiry date, referral amount, and usageLimit.");
//       return;
//     }

//     const bulkCodes = bulkPreview.map(([name, email, phone]) => ({
//       name: name || "Anonymous",
//       email: email || "N/A",
//       phone: phone || "N/A",
//       expiryDate: bulkExpiryDate,
//       amount: bulkReferralAmount,
//       usageLimit: bulkLimit,
//       couponCode: generateCouponCode(name, email),
//     }));

//     setCodes([...codes, ...bulkCodes]);
//     updateLocalStorage(bulkCodes); // Save bulk codes to localStorage
//     setBulkFile(null);
//     setBulkPreview([]);
//   };

//   return (
//     <div className="min-h-screen p-4 md:p-8 bg-gray-50">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Manage Coupon Codes</h1>

//       {/* Individual Code Generation */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-2">Generate Individual Code</h2>
//         <div className="flex flex-wrap gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="border rounded p-2"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="border rounded p-2"
//           />
//           <input
//             type="text"
//             placeholder="Phone"
//             value={form.phone}
//             onChange={(e) => setForm({ ...form, phone: e.target.value })}
//             className="border rounded p-2"
//           />
//           <input
//             type="date"
//             value={form.expiryDate}
//             onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
//             className="border rounded p-2"
//           />
//           <input
//             type="number"
//             placeholder="Referral Amount ($)"
//             value={form.amount}
//             onChange={(e) => setForm({ ...form, amount: e.target.value })}
//             className="border rounded p-2"
//           />
//           <input
//             type="number"
//             placeholder="Limit"
//             value={form.usageLimit}
//             onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
//             className="border rounded p-2"
//           />
//         </div>
//         <button
//           onClick={handleGenerateCode}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Generate Code
//         </button>
//       </div>

//       {/* Bulk Upload Section */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-2">Mass Codes Generation</h2>
//         <div className="flex flex-wrap gap-4 mb-4">
//           <input
//             type="file"
//             accept=".csv, .xls, .xlsx, .txt"
//             onChange={handleBulkUpload}
//             className="block text-sm"
//           />
//           <input
//             type="date"
//             value={bulkExpiryDate}
//             onChange={(e) => setBulkExpiryDate(e.target.value)}
//             className="border rounded p-2"
//           />
//           <input
//             type="number"
//             placeholder="Referral Amount ($)"
//             value={bulkReferralAmount}
//             onChange={(e) => setBulkReferralAmount(e.target.value)}
//             className="border rounded p-2"
//           />
//           <input
//             type="number"
//             placeholder="Limit"
//             value={bulkLimit}
//             onChange={(e) => setBulkLimit(e.target.value)}
//             className="border rounded p-2"
//           />
//         </div>
//         <button
//           onClick={handleBulkGenerate}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Generate Bulk Codes
//         </button>
//       </div>

//       {/* Preview Table */}
//       <div>
//         <h2 className="text-lg font-semibold mb-2">Generated and Stored Codes</h2>
//         <table className="table-auto w-full border-collapse border bg-white shadow-md rounded-md">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Phone</th>
//               <th className="border p-2">Coupon Code</th>
//               <th className="border p-2">Expiry Date</th>
//               <th className="border p-2">Amount ($)</th>
//               <th className="border p-2">Limit</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allCodes.map((code, index) => (
//               <tr key={index}>
//                 <td className="border p-2">{code.name}</td>
//                 <td className="border p-2">{code.email}</td>
//                 <td className="border p-2">{code.phone}</td>
//                 <td className="border p-2">{code.couponCode}</td>
//                 <td className="border p-2">{code.expiryDate}</td>
//                 <td className="border p-2">{code.amount}</td>
//                 <td className="border p-2">{code.usageLimit}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CouponCodes;
