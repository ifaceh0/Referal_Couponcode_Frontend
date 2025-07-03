import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import { colorPalette } from "../../utils/demoData";
import { registerUser, uploadBulkReferralCodes, getAllReferralCodeByShopkeeper } from "../../api/registerUser";
import PhoneInputField from "../../components/ui/PhoneInputField";
import { getCurrentUser } from "../../api/signin";
import { getSettingsAction } from "../../api/settingPageApi";


const ReferralManagement = () => {
  const [codes, setCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // Individual Registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [referralAmount, setReferralAmount] = useState("");
  const [referrerAmount, setReferrerAmount] = useState("");
  const [failedUsers, setFailedUsers] = useState([]);


  // Bulk Upload
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkExpiryDate, setBulkExpiryDate] = useState("");
  const [bulkReferralAmount, setBulkReferralAmount] = useState("");
  const [bulkReferrerAmount, setBulkReferrerAmount] = useState("");
  const [failedUsersPage, setFailedUsersPage] = useState(1);
  const [referralAmountReadOnly, setReferralAmountReadOnly] = useState(false);
  const [referrerAmountReadOnly, setReferrerAmountReadOnly] = useState(false);
  const [referralPromotionEndDateReadOnly, setReferralPromotionEndDateReadOnly] = useState(false);
  const [expiryReadOnly, setExpiryReadOnly] = useState(false);


  const failedUsersPerPage = 5;

  const [type, setType] = useState("R");
  // const shopkeeperId = localStorage.getItem("shopkeeperId");
  const [userDetails, setUserDetails] = useState(null);
  const [settingDetails, setSettingDetails] = useState(null);
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
        if (setting?.referralAmount != null) {
          setReferralAmount(setting.referralAmount);
          setReferralAmountReadOnly(true);
          setBulkReferralAmount(setting.referralAmount);
        }
        if (setting?.referrerAmount != null) {
          setReferrerAmount(setting.referrerAmount);
          setReferrerAmountReadOnly(true);
          setBulkReferrerAmount(setting.referrerAmount);
        }
        if (setting?.referralPromotionEndDate != null) {
          // setReferralPromotionEndDate(setting.referralPromotionEndDate);
          // setReferralPromotionEndDateReadOnly(true); 
          const formattedDate = setting.referralPromotionEndDate.split("T")[0]; // ensures YYYY-MM-DD
          setExpiryDate(formattedDate);
          setBulkExpiryDate(formattedDate);
          setExpiryReadOnly(true);
        }
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    fetchSettingData();
  }, []);

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
    // email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Invalid email format.");
        return;
       }

    const userData = { name, email, phone, expiryDate, referralAmount, referrerAmount, type };
    const toastId = toast.loading("Registering user...");

    // try {
    //   const result = await registerUser(userData, shopkeeperId);
    //   toast.update(toastId, { render: result.message || "User registered successfully!", type: "success", isLoading: false, autoClose: 3000 });
    //   // window.location.reload();
    // } catch (error) {
    //   toast.update(toastId, { render: error || "Failed to register user.", type: "error", isLoading: false, autoClose: 3000 });
    // }
    try {
      const result = await registerUser(userData, shopkeeperId);
      toast.update(toastId, {
        render: typeof result === "string" ? result : "User registered successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Failed to register user.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
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
      setFailedUsers(result.failedUsers || []);
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
          render: result.message || "Bulk referral codes generated successfully.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
      // Add delayed page reload here (10 seconds)
      // setTimeout(() => {
      //   window.location.reload();
      // }, 15000);

    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Failed to generate bulk referral codes.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  //  Edit Function
  const handleEdit = (row) => {
    console.log("Editing:", row);
    // Add your edit logic here
  };

  //  Delete Function
  const handleDelete = (row) => {
    console.log("Deleting:", row);
    setCodes((prev) => prev.filter((code) => code.code !== row.code));
  };

  // Bulk Edit/Delete Function
  const handleBulkAction = (action, selectedRows) => {
    console.log(`${action.toUpperCase()} Selected Rows:`, selectedRows);

    if (action === "delete") {
      setCodes((prev) => prev.filter((code) => !selectedRows.some((row) => row.code === code.code)));
    }
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
    link.setAttribute("download", "Referral_failed_users.csv");
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
            <div className="relative">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={`border rounded p-2 w-full ${
                email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'border-red-500' : ''
              }`} 
            />
            {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
              <p className="text-sm text-red-600 mt-1">Please enter a valid email address.</p>
              )}
            </div>
            


            {/* <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded p-2" /> */}
            <PhoneInputField
              label=""
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              containerClass="w-full"
              inputClass="border rounded p-2 w-full"
            />
            <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="border rounded p-2"
              title="Expire Date - mm/dd/yyyy"
              readOnly={expiryReadOnly} />
            <input type="number" min={0} placeholder="Referral Amount ($)" value={referralAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setReferralAmount(isNaN(value) ? '' : Math.max(0, value));
              }}
              className="border rounded p-2"
              readOnly={referralAmountReadOnly} />
            <input type="number" min={0} placeholder="Referrer Amount ($)" value={referrerAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setReferrerAmount(isNaN(value) ? '' : Math.max(0, value));
              }}
              className="border rounded p-2"
              readOnly={referrerAmountReadOnly} />
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
            <input type="file" accept=".csv, .xls, .xlsx"
              onChange={handleBulkUpload} className="border rounded p-2" />
            <input type="date" value={bulkExpiryDate}
              onChange={(e) => setBulkExpiryDate(e.target.value)} className="border rounded p-2"
              title="Expire Date - mm/dd/yyyy"
              readOnly={expiryReadOnly} />
            <input
              type="number"
              placeholder="Referral Amount ($)"
              value={bulkReferralAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setBulkReferralAmount(isNaN(value) ? '' : Math.max(0, value));
              }}
              className="border rounded p-2"
              readOnly={referralAmountReadOnly}
            />

            <input
            type="number"
            placeholder="Referrer Amount ($)"
            value={bulkReferrerAmount}
            onChange={(e) => {
              const value = Number(e.target.value);
              setBulkReferrerAmount(isNaN(value) ? '' : Math.max(0, value));
            }}
            className="border rounded p-2"
            readOnly={referrerAmountReadOnly}
          />

          </div>
          <button onClick={handleBulkGenerate} className="px-4 py-2 rounded" style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}>
            Generate Bulk Codes
          </button>
        </section>

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
