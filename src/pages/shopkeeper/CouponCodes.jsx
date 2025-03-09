import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import { colorPalette } from "../../utils/demoData";
import { registerUser, uploadBulkCouponCodes, getAllCouponCodeByShopkeeper } from "../../api/registerUser";
import PhoneInputField from "../../components/ui/PhoneInputField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CouponCodes = () => {
  const [allCodes, setAllCodes] = useState([]);
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkExpiryDate, setBulkExpiryDate] = useState("");
  const [bulkLimit, setBulkLimit] = useState("");
  const [bulkReferralAmount, setBulkReferralAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    referralAmount: "",
    usageLimit: "",
    expiryDate: "",
    type: "C",
  });

  const shopkeeperId = 1; // Replace with actual shopkeeper ID

  useEffect(() => {
    const fetchReferralCodes = async () => {
      setIsLoading(true);
      const toastId = toast.loading("Fetching coupon codes...");
      try {
        const result = await getAllCouponCodeByShopkeeper(shopkeeperId);
        setAllCodes(result);
        const message = result.message || "Coupon codes fetched successfully!";
        toast.update(toastId, { render: message, type: "success", isLoading: false, autoClose: 3000 });
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch coupon codes.";
        toast.update(toastId, { render: errorMessage, type: "error", isLoading: false, autoClose: 3000 });
      } finally {
        setIsLoading(false);
      }
    };
    fetchReferralCodes();
  }, [shopkeeperId]);

  const handleGenerateCode = async () => {
    if (!form.name || !form.email || !form.expiryDate || !form.referralAmount || !form.usageLimit) {
      toast.error("All fields are required!", { autoClose: 3000 });
      return;
    }

    const toastId = toast.loading("Generating coupon code...");
    try {
      const result = await registerUser(form, shopkeeperId);
      const message = result.message || "Coupon code generated successfully!";
      toast.update(toastId, { render: message, type: "success", isLoading: false, autoClose: 3000 });

      setTimeout(() => window.location.reload(), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to generate coupon code.";
      toast.update(toastId, { render: errorMessage, type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const handleBulkGenerate = async () => {
    if (!bulkExpiryDate || !bulkReferralAmount || !bulkLimit || !bulkFile) {
      toast.error("Please provide all required fields and upload a file.", { autoClose: 3000 });
      return;
    }

    const toastId = toast.loading("Uploading bulk coupon codes...");
    try {
      const result = await uploadBulkCouponCodes(bulkFile, bulkExpiryDate, bulkReferralAmount, bulkLimit, shopkeeperId, "C");
      const message = result.message || "Bulk coupon codes generated successfully!";
      toast.update(toastId, { render: message, type: "success", isLoading: false, autoClose: 3000 });

      setAllCodes([...allCodes, ...result.generatedCodes]);
      setTimeout(() => window.location.reload(), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to upload bulk coupon codes.";
      toast.update(toastId, { render: errorMessage, type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <>
      <div className="min-h-screen p-8" style={{ backgroundColor: colorPalette.primaryLight }}>
        <h1 className="text-3xl font-bold mb-6" style={{ color: colorPalette.white }}>Manage Coupon Codes</h1>

        {/* Individual Coupon Code Generation */}
        <div className="mb-8 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>Individual Coupon Code Generation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded p-2" />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border rounded p-2" />
            <PhoneInputField label="" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} containerClass="w-full" inputClass="border rounded p-2 w-full" />
            <input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className="border rounded p-2" />
            <input type="number" placeholder="Coupon Amount ($)" value={form.referralAmount} onChange={(e) => setForm({ ...form, referralAmount: e.target.value })} className="border rounded p-2" />
            <input type="number" placeholder="Limit" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} className="border rounded p-2" />
          </div>
          <button onClick={handleGenerateCode} className="px-4 py-2 rounded shadow" style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}>Generate Code</button>
        </div>

        {/* Bulk Coupon Code Generation */}
        <div className="mb-8 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.secondaryDark }}>Bulk Coupon Codes Generation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <input type="file" accept=".csv, .xls, .xlsx, .txt" onChange={(e) => setBulkFile(e.target.files[0])} className="block text-sm" />
            <input type="date" value={bulkExpiryDate} onChange={(e) => setBulkExpiryDate(e.target.value)} className="border rounded p-2" />
            <input type="number" placeholder="Coupon Amount ($)" value={bulkReferralAmount} onChange={(e) => setBulkReferralAmount(e.target.value)} className="border rounded p-2" />
            <input type="number" placeholder="Limit" value={bulkLimit} onChange={(e) => setBulkLimit(e.target.value)} className="border rounded p-2" />
          </div>
          <button onClick={handleBulkGenerate} className="px-4 py-2 rounded shadow" style={{ backgroundColor: colorPalette.secondary, color: colorPalette.white }}>Generate Coupon Codes</button>
        </div>

        <section className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.accentDark }}>
            Generated Coupon Codes
          </h2>
          {/* <ResponsiveTable columns={[{ header: "Code", accessor: "code" }, { header: "Expiry Date", accessor: "expiryDate" }, { header: "Amount", accessor: "amount" }]} data={allCodes} onRefresh={() => console.log("Data refreshed!")} enableSearch={true} enableRefresh={true} /> */}
          {isLoading ? (
            <p>Loading...</p>
          ) : allCodes.length > 0 ? (
            <ResponsiveTable
              rowData={allCodes.map((code) => ({
                name: code.user?.name || "N/A",
                email: code.user?.email || "N/A",
                phone: code.user?.phone || "N/A",
                expiryDate: code.expiryDate || "",
                amount: `$${code.amount || 0}`,
                code: code.code || "N/A",
                status: code.status || "N/A",
                createdDate: code.createdDate || "N/A",
              }))}
              columnDefs={[
                { headerName: "Name", field: "name" },
                { headerName: "Email", field: "email" },
                { headerName: "Phone", field: "phone" },
                { headerName: "Expiry Date", field: "expiryDate" },
                { headerName: "Amount", field: "amount" },
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
            />
          ) : (
            <p>No coupon codes found.</p>
          )}
        </section>
      </div>
      {/* ToastContainer for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default CouponCodes;
