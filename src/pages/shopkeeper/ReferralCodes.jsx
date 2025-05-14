import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import { colorPalette } from "../../utils/demoData";
import { registerUser, uploadBulkReferralCodes, getAllReferralCodeByShopkeeper } from "../../api/registerUser";
import PhoneInputField from "../../components/ui/PhoneInputField";
import { getCurrentUser } from "../../api/signin";

const ReferralManagement = () => {
  const [codes, setCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Individual Registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [referralAmount, setReferralAmount] = useState("");
  const [referrerAmount, setReferrerAmount] = useState("");

  // Bulk Upload
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkExpiryDate, setBulkExpiryDate] = useState("");
  const [bulkReferralAmount, setBulkReferralAmount] = useState("");
  const [bulkReferrerAmount, setBulkReferrerAmount] = useState("");

  const [type, setType] = useState("R");
  // const shopkeeperId = localStorage.getItem("shopkeeperId");
  const [userDetails, setUserDetails] = useState(null);
     useEffect(() => {
            const fetchData = async () => {
                try {
                    const user = await getCurrentUser();
                    console.log("Fetched user:", user.id);
                    setUserDetails(user);
                } catch (error) {
                    console.error("Error fetching monthly data:", error);
                }
            };
    
            fetchData();
        }, []);
        const shopkeeperId = userDetails?.id || localStorage.getItem("shopkeeperId") ; // Replace with actual shopkeeper ID
  useEffect(() => {
    const fetchCodes = async () => {
      setIsLoading(true);
      const toastId = toast.loading("Fetching referral codes...");
      try {
        const result = await getAllReferralCodeByShopkeeper(shopkeeperId);
        setCodes(result);
        toast.update(toastId, { render: result.message || "Referral codes fetched successfully!", type: "success", isLoading: false, autoClose: 3000 });
      } catch (error) {
        toast.update(toastId, { render: error.message || "Failed to fetch referral codes.", type: "error", isLoading: false, autoClose: 3000 });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCodes();
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !phone || !expiryDate || !referralAmount || !referrerAmount) {
      toast.warn("Please fill in all fields.");
      return;
    }

    const userData = { name, email, phone, expiryDate, referralAmount, referrerAmount, type };
    const toastId = toast.loading("Registering user...");

    try {
      const result = await registerUser(userData, shopkeeperId);
      toast.update(toastId, { render: result.message || "User registered successfully!", type: "success", isLoading: false, autoClose: 3000 });
      window.location.reload();
    } catch (error) {
      toast.update(toastId, { render: error.message || "Failed to register user.", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setBulkFile(file);
  };

  const handleBulkGenerate = async () => {
    if (!bulkFile || !bulkExpiryDate || !bulkReferralAmount || !bulkReferrerAmount) {
      toast.warn("All fields are required for bulk upload.");
      return;
    }

    const toastId = toast.loading("Generating bulk referral codes...");
    try {
      const result = await uploadBulkReferralCodes(
        bulkFile,
        bulkExpiryDate,
        bulkReferralAmount,
        bulkReferrerAmount,
        0,
        shopkeeperId,
        "R"
      );
      toast.update(toastId, { render: result.message || "Bulk referral codes generated successfully.", type: "success", isLoading: false, autoClose: 3000 });
      window.location.reload();
    } catch (error) {
      toast.update(toastId, { render: error.message || "Failed to generate bulk referral codes.", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  // 🔹 Edit Function
  const handleEdit = (row) => {
    console.log("Editing:", row);
    // Add your edit logic here
  };

  // 🔹 Delete Function
  const handleDelete = (row) => {
    console.log("Deleting:", row);
    setCodes((prev) => prev.filter((code) => code.code !== row.code));
  };

  // 🔹 Bulk Edit/Delete Function
  const handleBulkAction = (action, selectedRows) => {
    console.log(`${action.toUpperCase()} Selected Rows:`, selectedRows);

    if (action === "delete") {
      setCodes((prev) => prev.filter((code) => !selectedRows.some((row) => row.code === code.code)));
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
    <div className="min-h-screen p-8" style={{ backgroundColor: colorPalette.primaryLight }}>
      <h1 className="text-3xl font-bold text-white mb-6">Manage Referral Codes</h1>

      {/* Individual Referral Code Generation */}
      <section className="mb-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>
          Individual Referral Code Generation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded p-2" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded p-2" />
          {/* <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded p-2" /> */}
          <PhoneInputField
            label=""
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            containerClass="w-full"
            inputClass="border rounded p-2 w-full"
          />
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="border rounded p-2" title="Expire Date - mm/dd/yyyy"/>
          <input type="number" placeholder="Referral Amount ($)" value={referralAmount} onChange={(e) => setReferralAmount(e.target.value)} className="border rounded p-2" />
          <input type="number" placeholder="Referrer Amount ($)" value={referrerAmount} onChange={(e) => setReferrerAmount(e.target.value)} className="border rounded p-2" />
        </div>
        <button onClick={handleRegister} className="px-4 py-2 rounded" style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}>
          Generate Code
        </button>
      </section>

      {/* Bulk Upload Section */}
      <section className="mb-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>
          Bulk Referral Code Upload
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="file" accept=".csv, .xls, .xlsx" onChange={handleBulkUpload} className="border rounded p-2" />
          <input type="date" value={bulkExpiryDate} onChange={(e) => setBulkExpiryDate(e.target.value)} className="border rounded p-2" title="Expire Date - mm/dd/yyyy" />
          <input type="number" placeholder="Referral Amount ($)" value={bulkReferralAmount} onChange={(e) => setBulkReferralAmount(e.target.value)} className="border rounded p-2" />
          <input type="number" placeholder="Referrer Amount ($)" value={bulkReferrerAmount} onChange={(e) => setBulkReferrerAmount(e.target.value)} className="border rounded p-2" />
        </div>
        <button onClick={handleBulkGenerate} className="px-4 py-2 rounded" style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}>
          Generate Bulk Codes
        </button>
      </section>

      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>
          Generated Referral Codes
        </h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : codes.length > 0 ? (
          <ResponsiveTable
            rowData={codes.map((code) => ({
              name: code.user?.name || "N/A",
              email: code.user?.email || "N/A",
              phone: code.user?.phone || "N/A",
              expiryDate: code.expiryDate || "",
              referralAmount: `$${code.referralAmount || 0}`,
              referrerAmount: `$${code.referrerAmount || 0}`,
              code: code.code || "N/A",
              status: code.status || "N/A",
              createdDate: code.createdDate || "N/A",
            }))}
            columnDefs={[
              { headerName: "Name", field: "name" },
              { headerName: "Email", field: "email" },
              { headerName: "Phone", field: "phone" },
              { headerName: "Expiry Date", field: "expiryDate" },
              { headerName: "Referral Amount", field: "referralAmount" },
              { headerName: "Referrer Amount", field: "referrerAmount" },
              { headerName: "Code", field: "code" },
              { headerName: "Status", field: "status" },
            ]}
            filterableColumns={["status"]}
            enableSorting={true}
            enableRowSelection={true}
            enableGlobalSearch={true}
            enableDateFilter={true}
            enableEdit={true}
            enableDelete={false}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBulkAction={handleBulkAction}
          />
        ) : (
          <p>No referral codes found.</p>
        )}
      </section>

    </div>
    </>
  );
};

export default ReferralManagement;
