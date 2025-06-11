export const demoData = {
    company: {
        name: "Demo Shop",
        slug: "demo-shop",
        logo: "/assets/react.svg",
        colorPalette: {
            primary: "#4CAF50",
            secondary: "#FF9800",
            text: "#333333",
        },
    },
    user: {
        name: "John Doe",
        email: "john.doe@example.com",
        points: 120,
        referralCode: "JOHN123",
        referralHistory: [
            { date: "2024-12-01", referee: "Jane Smith", status: "used" },
            { date: "2024-12-02", referee: "Robert Brown", status: "pending" },
        ],
    },
};

export const discountData = {
    discountMapping: [
        { name: "Basic Discount", points: 50, discount: "5%" },
        { name: "Standard Discount", points: 100, discount: "10%" },
        { name: "Premium Discount", points: 200, discount: "20%" },
    ],
    milestoneMapping: [
        { milestoneType: "Referrals", milestoneValue: 10, rewardType: "Points", reward: 50 },
        { milestoneType: "Points", milestoneValue: 500, rewardType: "Item", reward: "Gift Voucher" },
    ],
};

// export const companyDetails = {
//     name: "Acme Corp",
//     logo: "https://via.placeholder.com/150",
//     primaryColor: "#4caf50",
//     contactEmail: "support@acmecorp.com",
//     contactNumber: "+1-800-123-4567"
// };

// export const emailTemplates = {
//     "Welcome Email": `
//         <div style="text-align: center; color: {primaryColor};">
//             <h1>Welcome to {companyName}!</h1>
//             <img src="{logo}" alt="Company Logo" style="max-width: 150px;" />
//             <p>We are thrilled to have you on board. Start exploring today!</p>
//         </div>`,
//     "Referral Invitation": `
//         <div style="color: {primaryColor};">
//             <h1>Refer and Earn!</h1>
//             <p>Invite your friends to {companyName} and earn exciting rewards!</p>
//         </div>`,
//     "Thank You Email": `
//         <div style="text-align: center; color: {primaryColor};">
//             <h1>Thank You!</h1>
//             <p>We appreciate your trust in {companyName}. Here's a special gift just for you.</p>
//         </div>`,
//     "Discount Offer Email": `
//         <div style="color: {primaryColor};">
//             <h1>Exclusive Discount!</h1>
//             <p>Enjoy a {offerDetails} discount on your next purchase with {companyName}.</p>
//         </div>`
// };


export const shopkeeperDemoData = {
    subscription: {
        tier: "Pro",
        features: ["Referral System", "Email Notifications", "SMS Notifications"],
        expiry: "2025-01-01",
    },
    referralCodes: [
        { code: "REF123", used: 5, expiresOn: "2025-01-01" },
        { code: "REF456", used: 3, expiresOn: "2025-01-15" },
    ],
    customers: [
        { name: "John Doe", email: "john@example.com", phone: "1234567890", points: 50 },
        { name: "Jane Smith", email: "jane@example.com", phone: "0987654321", points: 30 },
    ],
    stats: {
        totalUsers: 450,
        referralCodes: 1200,
        couponsRedeemed: 750,
    },
};


export const shopkeeperDemoData1 = {
    subscription: {
        tier: "Pro",
        features: ["Referral System", "Email Notifications", "SMS Notifications", "Custom Email Templates", "Custom SMS Templates"],
        expiry: "2025-01-01",
    },
    stats: {
        totalUsers: 450,
        referralCodes: 1200,
        couponsRedeemed: 750,
    },
    referralCodes: [
        {
            code: "REF123",
            discountAmount: "15%",
            used: 5,
            expiresOn: "2025-01-01",
            customer: { name: "John Doe", email: "john@example.com", phone: "1234567890", points: 500 },
        },
        {
            code: "REF456",
            discountAmount: "10%",
            used: 4,
            expiresOn: "2025-01-01",
            customer: { name: "Jane Smith", email: "jane@example.com", phone: null, points: 50 },
        },
        {
            code: "REF789",
            discountAmount: null,
            used: 0,
            expiresOn: "2025-01-01",
            customer: null,
        },
    ],
};



export const companyDetails = {
    name: "Acme Corp",
    logo: "https://via.placeholder.com/150",
    primaryColor: "#4caf50",
    address: "123 Business Road, New York, NY, 10001",
    contactEmail: "support@acmecorp.com",
    contactNumber: "+1-800-123-4567"
};

export const referralData = {
    username: "johndoe@example.com",
    password: "securepassword123",
    referralCode: "REF12345",
    referralLink: "https://acmecorp.com/referral/REF12345"
};

export const smsTemplates = {
    "Minimal Template": `Hi {username}, welcome to {companyName}! Share your referral code: {referralCode} and earn points. Use the link: {referralLink}.`,
    "Friendly Template": `Hello {username}! Invite your friends using this referral code: {referralCode}. Earn exciting rewards at {companyName}. Your referral link: {referralLink}.`,
    "Promotional Template": `Don't miss out, {username}! Use your referral code {referralCode} to invite friends. Earn rewards at {companyName}. Referral link: {referralLink}.`,
    "Professional Template": `Welcome to {companyName}, {username}. Your referral code: {referralCode}. Share it with friends and earn rewards. Link: {referralLink}.`,
};

export const emailTemplates = {
    "Minimal Template": `
        <div style="font-family: Arial, sans-serif; color: {primaryColor};">
            <h1>Hello {username},</h1>
            <p>{intro}</p>
            <p>Your referral code is: <strong>{referralCode}</strong></p>
            <p>Share this link with your friends: <a href="{referralLink}">{referralLink}</a></p>
            <p>Your login details are:</p>
            <ul>
                <li>Username: {username}</li>
                <li>Password: {password}</li>
            </ul>
            <p>{ending}</p>
            <footer style="margin-top: 20px; font-size: 12px;">
                Regards,<br />
                {companyName}<br />
                <img src="{logo}" alt="Company Logo" style="max-width: 20px; margin: 10px;" /><br />
                {address}<br />
                Email: {contactEmail}<br />
                Phone: {contactNumber}
            </footer>
        </div>
    `,
    "Modern Template": `
        <div style="font-family: 'Helvetica Neue', sans-serif; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd;">
            <h2 style="color: {primaryColor};">Hi {name},</h2>
            <p style="color: #333;">{intro}</p>
            <div style="padding: 10px; background-color: #fff; border: 1px solid #ddd; margin: 10px 0;">
                <p>Your referral code is: <strong>{referralCode}</strong></p>
                <p>Referral link: <a href="{referralLink}" style="color: {primaryColor};">{referralLink}</a></p>
            </div>
            <p>Your login details:</p>
            <ul style="list-style: none; padding: 0;">
                <li><strong>Username:</strong> {email}</li>
                <li><strong>Password:</strong> {password}</li>
            </ul>
            <p>{ending}</p>
            <footer style="margin-top: 20px; font-size: 12px; text-align: center; color: #555;">
                Regards,<br />
                {companyName}<br />
                <img src="{logo}" alt="Company Logo" style="max-width: 20px; margin: 10px auto;" /><br />
                {address}<br />
                <a href="mailto:" style="color: {primaryColor};">{contactEmail}</a><br />
                {contactNumber}
            </footer>
        </div>
    `,
    "Professional Template": `
        <div style="font-family: Georgia, serif; padding: 20px;">
            <h1 style="color: {primaryColor};">Greetings {username},</h1>
            <p>{intro}</p>
            <p style="font-weight: bold;">Referral Code: {referralCode}</p>
            <p>Share your referral link:</p>
            <a href="{referralLink}" style="color: {primaryColor};">{referralLink}</a>
            <p>Your credentials are:</p>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Password:</strong> {password}</p>
            <p>{ending}</p>
            <footer style="border-top: 1px solid #ddd; padding-top: 10px; font-size: 12px;">
                Regards,<br />
                {companyName}<br />
                <img src="{logo}" alt="Company Logo" style="max-width: 20px; margin: 10px;" /><br />
                {address}<br />
                Email: {contactEmail} | Phone: {contactNumber}
            </footer>
        </div>
    `
};

// demoData.js

let generalSettings = {
    timezone: "UTC",
    dateFormat: "YYYY-MM-DD",
    useCredits: false,
};

/**
 * Simulates saving general settings.
 * @param {Object} settings - The general settings to save.
 */
export const saveGeneralSettings = (settings) => {
    generalSettings = { ...generalSettings, ...settings };
    console.log("Settings saved:", generalSettings); // For debugging purposes
};

/**
 * Simulates fetching general settings.
 * @returns {Object} The stored general settings.
 */
export const getGeneralSettings = () => {
    return generalSettings;
};


// demoData.js
// export const colorPalette = {
//     primary: "#7c3aed", // Purple
//     secondary: "#fb923c", // Orange
//     accent: "#2563eb", // Blue
//     white: "#ffffff",
//     black: "#000000",
//     gray: "#6b7280", // Tailwind's "gray-500" equivalent
// };

export const colorPalette = {
    primary: "#7c3aed", // Purple
    primaryLight: "#9f67f3",
    primaryDark: "#5a28ba",

    secondary: "#fb923c", // Orange
    secondaryLight: "#fdab67",
    secondaryDark: "#c56d2c",

    accent: "#2563eb", // Blue
    accentLight: "#4a84f3",
    accentDark: "#1a48b5",

    white: "#ffffff",
    black: "#000000",
    gray: "#6b7280", // Minimal use
};

