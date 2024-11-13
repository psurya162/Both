// src/utils/subscriptionUtils.js

const calculateExpiryDate = (durationInDays) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + durationInDays);
    return expiryDate;
};

module.exports = { calculateExpiryDate };
