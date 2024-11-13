const nodemailer = require('nodemailer');
const db = require('../config/db_Setting')
// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "rahulsoni7982@gmail.com",
        pass: "ixbx nttt dmsb krvx",
    },

});
// to check license expiration where license expired or not
const checkLicenseExpirations = async () => {
    try {
        const queryResult = await db.queryAll("SELECT * FROM tbl_license");
        const allLicenses = Array.isArray(queryResult) ? queryResult : [queryResult];
        for (const license of allLicenses) {
            const { id,duration, created_at, email } = license;
            const created_t = new Date(created_at);
            const durationDate = new Date(duration);
            const durationMilliseconds = durationDate.getTime() - created_t.getTime();
            const expirationDate = new Date(created_t.getTime() + durationMilliseconds);
            const threeDaysBeforeExpiration = new Date(expirationDate);
            threeDaysBeforeExpiration.setDate(threeDaysBeforeExpiration.getDate() - 3);
            const currentDate = new Date();
            if (currentDate >= threeDaysBeforeExpiration && currentDate < expirationDate) {
                await sendExpirationNotification(email);
            }else if(currentDate>expirationDate){
                await db.update('tbl_device_license',{isactivated:'0'},`license_id='${id}'`)
            }
        }
    } catch (error) {
        console.error("Error checking license expirations:", error);
    }
}
// mail function to send a email in mail id where 
async function sendExpirationNotification(email) {
    const mailOptions = {
        from: 'rahulsoni7982@gmail.com',
        to: email,
        subject: 'Your license will expire soon',
        text: 'Your license will expire in 3 days. Please renew your license to continue using our service.'
    };
    try {
        // Send email using promisified function
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = checkLicenseExpirations;
