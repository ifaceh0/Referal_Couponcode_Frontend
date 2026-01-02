import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import { colorPalette } from "../../utils/demoData";
import { registerUser, uploadBulkCouponCodes, getAllCouponCodeByShopkeeper } from "../../api/registerUser";
import PhoneInputField from "../../components/ui/PhoneInputField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "../../api/signin";
import { getSettingsAction } from "../../api/settingPageApi";


const CouponCodes = () => {
  const [allCodes, setAllCodes] = useState([]);
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkExpiryDate, setBulkExpiryDate] = useState("");
  const [bulkLimit, setBulkLimit] = useState("");
  const [bulkReferralAmount, setBulkReferralAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedUsers, setFailedUsers] = useState([]);
  const [failedUsersPage, setFailedUsersPage] = useState(1);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const failedUsersPerPage = 5;
  // const [form, setForm] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   referralAmount: "",
  //   usageLimit: "",
  //   expiryDate: "",
  //   type: "C",
  // });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",

    referralAmount: "",
    usageLimit: "",
    expiryDate: "",
    type: "C",
  });
  const [couponAmountReadOnly, setCouponAmountReadOnly] = useState(false);
  const [referralAmountReadOnly, setReferralAmountReadOnly] = useState(false);
  const [couponUseLimitReadOnly, setCouponUseLimitReadOnly] = useState(false);
  const [expiryReadOnly, setExpiryReadOnly] = useState(false);
  const [settingDetails, setSettingDetails] = useState(null);
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
  const shopkeeperId = userDetails?.id || localStorage.getItem("shopkeeperId"); // Replace with actual shopkeeper ID

  useEffect(() => {
    const fetchSettingData = async () => {
      try {
        const setting = await getSettingsAction(shopkeeperId);
        console.log("Fetched user:", shopkeeperId);
        setSettingDetails(setting);
        if (setting?.couponAmount != null) {
          setBulkReferralAmount(setting.couponAmount);
          setForm((prev) => ({ ...prev, referralAmount: setting.couponAmount }));
          setReferralAmountReadOnly(true);
        }
        if (setting?.couponUseLimit != null) {
          setBulkLimit(setting.couponUseLimit);
          setForm((prev) => ({ ...prev, usageLimit: setting.couponUseLimit }));
          setCouponUseLimitReadOnly(true);
        }
        if (setting?.couponPromotionEndDate != null) {
          const formattedDate = setting.couponPromotionEndDate.split("T")[0]; // ensures YYYY-MM-DD
          setBulkExpiryDate(formattedDate);
          setForm((prev) => ({ ...prev, expiryDate: formattedDate }));
          setExpiryReadOnly(true);
        }
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    fetchSettingData();
  }, []);


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
    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        toast.error("Invalid email format.");
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
      setFailedUsers(result.failedUsers || []);
      const message = result.message || "Bulk coupon codes generated successfully!";

      // toast.update(toastId, { render: message, type: "success", isLoading: false, autoClose: 3000 });

      if (result.failedUsers?.length > 0) {
        toast.update(toastId, {
          render: `Upload completed. ${result.failedUsers.length} failed.`,
          type: "error",
          isLoading: false,
          // autoClose: false,
          // closeOnClick: true,
          autoClose: 3000,
        });
        setShowFailedModal(true);
      } else {
        toast.update(toastId, {
          render: result.message || "Bulk coupon codes generated successfully!.",
          type: "success",
          isLoading: false,
          autoClose: 3000,

        });
        setAllCodes([...allCodes, ...result.generatedCodes]);
        setTimeout(() => window.location.reload(), 3000);
      }

    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Failed to upload bulk coupon codes.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }



    //   setAllCodes([...allCodes, ...result.generatedCodes]);
    //   setTimeout(() => window.location.reload(), 3000);
    // } catch (error) {
    //   const errorMessage = error.response?.data?.message || "Failed to upload bulk coupon codes.";
    //   toast.update(toastId, { render: errorMessage, type: "error", isLoading: false, autoClose: 3000 });
    // }
  };

  const handleDownloadCSV = () => {
    const headers = ["Name", "Email", "Phone", "Reason"];
    const rows = failedUsers.map(user =>
      [user.name, user.email, user.phone, user.reason].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Coupon_failed_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const paginatedFailedUsers = failedUsers.slice(
    (failedUsersPage - 1) * failedUsersPerPage,
    failedUsersPage * failedUsersPerPage
  );
  const failedUsersTotalPages = Math.ceil(failedUsers.length / failedUsersPerPage);

  return (
    <>
      <div className="min-h-screen p-8" style={{ backgroundColor: colorPalette.primaryLight }}>
        <h1 className="text-3xl font-bold mb-6" style={{ color: colorPalette.white }}>Manage Coupon Codes</h1>

        {/* Individual Coupon Code Generation */}
        <div className="mb-8 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>Individual Coupon Code Generation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* <input type="text" placeholder="Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded p-2" /> */}
            <div>
              <label htmlFor="individual-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="individual-name"
                type="text"
                placeholder="Enter name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>  
            
            {/* <div className="flex flex-col">
              <input 
              type="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })} 
                className={`border rounded p-2 ${
                  form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "border-red-500" : ""
                }`} />
                {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                  <span className="text-sm text-red-600">Please enter a valid email address.</span>
                )}
            </div> */}
            <div>
              <label htmlFor="individual-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="individual-email"
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "border-red-500" : ""
                }`}
              />
              {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                <span className="text-sm text-red-600">Please enter a valid email address.</span>
              )}
            </div>
            {/* <PhoneInputField label="" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} containerClass="w-full" inputClass="border rounded p-2 w-full" /> */}
            {/* <PhoneInputField
              label="Phone"
              name="phone"
              dialCodeField="phoneDialCode"
              value={form.phone}
              dialCodeValue={form.phoneDialCode}
              onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
              containerClass="w-full"
              inputClass="border rounded p-2 w-full"
            /> */}
            <div>
              <label htmlFor="individual-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <PhoneInputField
                id="individual-phone"
                label=""
                name="phone"
                dialCodeField="phoneDialCode"
                value={form.phone}
                dialCodeValue={form.phoneDialCode}
                onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                containerClass="w-full"
                inputClass="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* <input type="date" value={form.expiryDate}
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
              className="border rounded p-2" title="Expire Date" readOnly={expiryReadOnly}
              min={new Date().toISOString().split("T")[0]} /> */}
            <div>
              <label htmlFor="individual-expiry" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                id="individual-expiry"
                type="date"
                value={form.expiryDate}
                onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly={expiryReadOnly}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>  
            {/* <input type="number" placeholder="Coupon Amount ($)" value={form.referralAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setForm((prev) => ({
                  ...prev,
                  referralAmount: isNaN(value) ? '' : Math.max(0, value),
                }));
              }}  
              className="border rounded p-2" readOnly={referralAmountReadOnly} /> */}
            <div>
              <label htmlFor="individual-amount" className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Amount ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="individual-amount"
                type="number"
                placeholder="Enter amount"
                value={form.referralAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setForm((prev) => ({
                    ...prev,
                    referralAmount: isNaN(value) ? "" : Math.max(0, value),
                  }));
                }}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly={referralAmountReadOnly}
              />
            </div>  
            {/* <input type="number" placeholder="Limit" value={form.usageLimit}
              onChange={(e) =>{
                const value = Number(e.target.value);
                setForm((prev) => ({
                  ...prev,
                  usageLimit: isNaN(value) ? '' : Math.max(0, value),
                }));
              }}
              className="border rounded p-2" readOnly={couponUseLimitReadOnly} /> */}
            <div>
              <label htmlFor="individual-limit" className="block text-sm font-medium text-gray-700 mb-1">
                Usage Limit <span className="text-red-500">*</span>
              </label>
              <input
                id="individual-limit"
                type="number"
                placeholder="Enter usage limit"
                value={form.usageLimit}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setForm((prev) => ({
                    ...prev,
                    usageLimit: isNaN(value) ? "" : Math.max(0, value),
                  }));
                }}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly={couponUseLimitReadOnly}
              />
            </div>  
          </div>
          <button onClick={handleGenerateCode} className="px-4 py-2 rounded shadow" style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}>Generate Code</button>
        </div>

        {/* Bulk Coupon Code Generation */}
        <div className="mb-8 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.secondaryDark }}>Bulk Coupon Codes Generation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* <input type="file" accept=".csv, .xls, .xlsx, .txt" onChange={(e) => setBulkFile(e.target.files[0])} className="block text-sm border rounded p-2" /> */}
            <div>
              <label htmlFor="bulk-file" className="block text-sm font-medium text-gray-700 mb-1">
                Upload File (CSV/XLSX) <span className="text-red-500">*</span>
              </label>
              <input
                id="bulk-file"
                type="file"
                accept=".csv, .xls, .xlsx, .txt"
                onChange={(e) => setBulkFile(e.target.files[0])}
                className="block w-full text-sm text-gray-700 border rounded p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {/* <input type="date" value={bulkExpiryDate} onChange={(e) => setBulkExpiryDate(e.target.value)}
              className="border rounded p-2" title="Expire Date - mm/dd/yyyy" readOnly={expiryReadOnly} 
              min={new Date().toISOString().split("T")[0]} /> */}
            <div>
              <label htmlFor="bulk-expiry" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                id="bulk-expiry"
                type="date"
                value={bulkExpiryDate}
                onChange={(e) => setBulkExpiryDate(e.target.value)}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly={expiryReadOnly}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>  

            {/* <input type="number" placeholder="Coupon Amount ($)" value={bulkReferralAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setBulkReferralAmount(isNaN(value) ? '' : Math.max(0, value));
              }} className="border rounded p-2"
              readOnly={referralAmountReadOnly} /> */}
            <div>
              <label htmlFor="bulk-amount" className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Amount ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="bulk-amount"
                type="number"
                placeholder="Enter amount"
                value={bulkReferralAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setBulkReferralAmount(isNaN(value) ? "" : Math.max(0, value));
                }}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly={referralAmountReadOnly}
              />
            </div>  
            {/* <input type="number" placeholder="Limit" value={bulkLimit}
              onChange={(e) => {
                const value = Number(e.target.value);
                setBulkLimit(isNaN(value) ? '' : Math.max(0, value));
              }} className="border rounded p-2" readOnly={couponUseLimitReadOnly} /> */}
            <div>
              <label htmlFor="bulk-limit" className="block text-sm font-medium text-gray-700 mb-1">
                Usage Limit <span className="text-red-500">*</span>
              </label>
              <input
                id="bulk-limit"
                type="number"
                placeholder="Enter limit"
                value={bulkLimit}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setBulkLimit(isNaN(value) ? "" : Math.max(0, value));
                }}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly={couponUseLimitReadOnly}
              />
            </div>  
          </div>
          <button onClick={handleBulkGenerate} className="px-4 py-2 rounded shadow" style={{ backgroundColor: colorPalette.secondary, color: colorPalette.white }}>Generate Bulk Coupon Codes</button>
        </div>
        {showFailedModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full">
              <h2 className="text-xl font-bold mb-4 text-red-700">Failed Users</h2>

              {/* Paginated Data */}
              <div className="overflow-x-auto max-h-96 overflow-y-auto mb-4">
                <table className="min-w-full text-sm border">
                  <thead className="bg-red-100 text-red-800">
                    <tr>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Phone</th>
                      <th className="border px-4 py-2">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedFailedUsers.map((user, idx) => (
                      <tr key={idx} className="bg-white hover:bg-red-50">
                        <td className="border px-4 py-2">{user.name}</td>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2">{user.phone}</td>
                        <td className="border px-4 py-2 text-red-600">{user.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {failedUsersTotalPages > 1 && (
                <div className="flex justify-between items-center mb-4 text-sm text-gray-700">
                  <span>
                    Page {failedUsersPage} of {failedUsersTotalPages}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => setFailedUsersPage((prev) => Math.max(prev - 1, 1))}
                      disabled={failedUsersPage === 1}
                      className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setFailedUsersPage((prev) =>
                          Math.min(prev + 1, failedUsersTotalPages)
                        )
                      }
                      disabled={failedUsersPage === failedUsersTotalPages}
                      className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleDownloadCSV}
                >
                  Download CSV
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => {
                    setShowFailedModal(false);
                    setTimeout(() => window.location.reload(), 3000);
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}




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