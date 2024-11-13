const db = require("../config/db_Setting");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const sendOTPByEmail = async (email, otp) => {
  // Create a transporter using Gmail SMTP server
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' for the service
    auth: {
      user: 'psurya162@gmail.com', // Your Gmail address
      pass: 'thkf erjs maby bash',    // Your App Password or Gmail password
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });

  // Define the HTML template with dynamic OTP insertion
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You Email</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
        }
        table {
          border-spacing: 0;
          width: 100%;
          max-width: 650px;
          margin: 0 auto;
        }
        .left-column {
          padding: 30px;
          font-size: 14px;
          line-height: 1.6;
          color: #555;
        }
        .left-column h1 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;
        }
        .left-column p {
          margin-bottom: 15px;
        }
        .social-icons {
          margin-top: 20px; 
        }
        .social-icons img {
          width: 24px; 
          height: 24px; 
          margin-right: 10px; 
        }
        .right-column {
          padding: 0;
          background-color: #f4f4f4;
          width: 100%;
          height: 100%;
          background-image: url('https://deltawebservice.com/chatbot/autobot/images/delta.jfif');
          background-size: cover; 
          background-position: center;
          position: relative; 
        }
        .centered-image {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%); 
          
          max-width: 250px; 
          height: auto; 
        }
      </style>
    </head>
    <body>
      <table role="presentation">
        <tr>
          <td>
            <table role="presentation" width="100%" height="100%">
              <tr>
                <!-- Left Column (Text Section) -->
                <td class="left-column" width="50%" style="background-color: #ffffff; border: 2px solid black;">
                  <h1>Thank you!</h1>
                  <p>We've received your message. Someone from our team will contact you soon.</p>
                  <p>Your OTP for verification is: <strong>${otp}</strong></p>
                  <p>This is an auto-generated email to confirm the receipt of your email. Your reference ID for this communication is <strong>(DVT015)</strong>.</p>
                  <p>Thank you,<br>Team Delta IT Network</p>
    
                  <!-- Social Media Icons -->
                  <div class="social-icons" style="display: flex; justify-content: center; align-items: center; padding-top: 20px;">
                    <a href="https://www.facebook.com/" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/3955/3955013.png" alt="Facebook" />
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/3955/3955056.png" alt="LinkedIn" />
                    </a>
                    <a href="https://www.youtube.com/" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/3256/3256012.png" alt="YouTube" />
                    </a>
                    <a href="https://twitter.com/" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png" alt="Twitter" />
                    </a>
                  </div>
                </td>
                <!-- Right Column (Image Section) -->
                <td width="50%" class="right-column">
                  <img src="./1.png" alt="" class="centered-image">
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;


  // Define the email options
  const mailOptions = {
    from: 'psurya162@gmail.com', // Use your Gmail address as the sender
    to: email,                   // Recipient's email address
    subject: 'Your OTP for verification',
    html: htmlTemplate,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
const otpSend = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    
    // Check if the email already exists in the system
    const existingUser = await db.select("tblusers", "id, status, is_steps_complete, grade, stream", `email = '${email}'`, true);

    if (existingUser) {
      // Check if email is already verified
      if (existingUser.status === "1") {
        if (existingUser.is_steps_complete === "0") {
          // Email is verified, but steps not complete
          return res.status(200).json({
            message: "Your email is verified. Please complete the remaining steps"
          });
        } else {
          return res.status(200).json({
            message: "Your account is fully verified. Please login"
          });
        }
      } else {
        // If email is not verified, check the stream selection
        const { grade, stream } = existingUser; 

        if ((grade === '11' || grade === '12') && !stream) {
          // Stream not selected for users in grades 11 or 12
          return res.status(403).json({
            message: "You must select a stream before proceeding."
          });
        }

        // If email is not verified, send OTP again
        const otp = generateOTP();
        await db.update("tblusers", { otp }, `email = '${email}'`);
        await sendOTPByEmail(email, otp);
        return res.status(200).json({ message: "OTP resent successfully. Please check your email" });
      }
    } else {
      // If user does not exist, create a new entry and send OTP
      const otp = generateOTP();
      await db.insert("tblusers", { email, otp }, true);
      await sendOTPByEmail(email, otp);
      return res.status(200).json({ message: "OTP sent successfully. Please check your email" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const resendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  await db.update("tblusers", { otp }, `email = '${email}'`);
  await sendOTPByEmail(email, otp);
  return res
    .status(200)
    .json({ message: "OTP resent successfully. Please check your email" });
};
// OTP VERIFY API
  const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ error: "OTP must be a 6-digit number." });
    }
    try {
      const result = await db.select("tblusers", "*", `otp = '${otp}'`);
      
      if (!result || result.length === 0) {
        return res.status(401).json({ error: "Wrong OTP" });
      }

      // Set status to 1 (email verified), is_email_exists, and is_active flags
      await db.update(
        "tblusers",
        { status: "1", is_email_exists: "1", is_active: "1" },
        `otp = '${otp}'`
      );
      
      // Adjust the message to match the expected format in the frontend
      return res.status(200).json({ 
        message: "OTP verification successful", // Updated message
        nextStep: "completeProfile" // Added the next step info
      });
      
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


const updateUser = async (req, res) => {
  try {
    const tbl_name = "tblusers";
    const { email } = req.params;
    console.log(email);
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
   
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.select("tblusers", "*", `email = '${email}'`);
    if (!user || user.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found in the database" })
    }
   
    const result = await db.update(
      tbl_name,
      { username, password: hashedPassword },
      `email = '${email}'`
    );
    const userId = user.id;
    console.log(userId);
    const token = jwt.sign({ userId, source: "signup" }, "kjhgfghj");
    if (result.status) {
      const userid = user.id;
      return res.status(200).json({
        status: true,
        affected_rows: result.affected_rows,
        token: token,
        userId: userid,
        message: "SignUp  successfully",
      });
    } else {
      throw new Error("Failed to update data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update data" });
  }
};
// GET ALL USER API
const getAllUser = async (req, res) => {
  const userfound = await db.selectAll("tblusers", "*", "", "");
  res.status(200).json({
    message: "data fetched successfully",
    userfound,
  });
};
// SELECT CLASS API
// const selectclass = async (req, res) => {
//   const userId = req.userId;
//   const { name, phone, grade } = req.body;

//   if (!name || !phone || !grade) {
//     return res.status(400).json({ message: "Name, phone, and grade are required fields" });
//   }

//   const nameRegex = /^[a-zA-Z\s]+$/;
//   if (!nameRegex.test(name)) {
//     return res.status(400).json({ message: "Invalid name. Only alphabetic characters and spaces are allowed" });
//   }

//   const isValidGrade = Number(grade) >= 1 && Number(grade) <= 12;
//   if (!isValidGrade) {
//     return res.status(400).json({ message: "Choose a correct grade between 1 and 12" });
//   }

//   // Updating user information and flags if necessary
//   const is_steps_complete = (grade === '11' || grade === '12') ? '1' : '0'; // Set flag based on grade
//   const result = await db.update(
//     "tblusers",
//     { name, phone, grade, is_steps_complete }, // Use the calculated flag
//     `id = '${userId}'`
//   );

//   if (result.status) {
//     return res.status(200).json({
//       status: result.status,
//       affected_rows: result.affected_rows,
//       info: result.info,
//       message: "Data updated successfully",
//     });
//   } else {
//     throw new Error("Failed to update data");
//   }
// };

const selectclass = async (req, res) => {
  const userId = req.userId;
  const { name, phone, grade } = req.body;

  if (!name || !phone || !grade) {
    return res.status(400).json({ message: "Name, phone, and grade are required fields" });
  }

  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({ message: "Invalid name. Only alphabetic characters and spaces are allowed" });
  }

  const isValidGrade = Number(grade) >= 1 && Number(grade) <= 12;
  if (!isValidGrade) {
    return res.status(400).json({ message: "Choose a correct grade between 1 and 12" });
  }

  // Determine is_steps_complete based on the selected grade
  let is_steps_complete = '0'; // Default value
  if (grade === '11' || grade === '12') {
    const existingUser = await db.select("tblusers", "stream", `id = '${userId}'`, true);
    if (existingUser && existingUser.stream) {
      is_steps_complete = '1'; // Set to 1 if stream is already selected
    }
  } else {
    is_steps_complete = '1'; // Automatically complete steps for grades 1-10
  }

  // Updating user information and flags
  const result = await db.update(
    "tblusers",
    { name, phone, grade, is_steps_complete }, // Use the calculated flag
    `id = '${userId}'`
  );

  if (result.status) {
    return res.status(200).json({
      status: result.status,
      affected_rows: result.affected_rows,
      info: result.info,
      message: "Data updated successfully",
    });
  } else {
    throw new Error("Failed to update data");
  }
};



// const selectstream = async (req, res) => {
//   const userId = req.userId;
//   const { stream } = req.body;

//   if (!stream) {
//     return res.status(400).json({ message: "Stream is a required field" });
//   }

//   // Check the current user's grade
//   const existingUser = await db.select("tblusers", "grade, is_steps_complete", `id = '${userId}'`, true);
  
//   if (existingUser) {
//     const { grade, is_steps_complete } = existingUser;

//     // Validate that stream selection is mandatory for grades 11 and 12
//     if ((grade === '11' || grade === '12') && !stream) {
//       return res.status(403).json({
//         message: "You must select a stream before proceeding."
//       });
//     }

//     // Update the stream field and set is_steps_complete to '1'
//     const result = await db.update("tblusers", { stream, is_steps_complete: '1' }, `id = '${userId}'`);
//     if (result.status) {
//       return res.status(200).json({
//         status: result.status,
//         affected_rows: result.affected_rows,
//         info: result.info,
//         message: "Data updated successfully",
//       });
//     } else {
//       throw new Error("Failed to update data");
//     }
//   } else {
//     return res.status(404).json({ message: "User not found" });
//   }
// };


// LOGIN CONTROLLER
// const loginController = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists in the database based on email
//     const user = await db.select(
//       "tblusers",
//       "id, email, password, status, is_email_exists, is_active, is_steps_complete",
//       `email='${email}'`
//     );
    
//     console.log("User Result:", user); // Debug: log user result to verify response

//     // Ensure the query returned valid data
//     if (!user || user.length === 0) {
//       console.log("User query returned no results or an empty array."); // Debug: log if user is empty
//       return res.status(400).json({ message: "User not found in the database" });
//     }

//     // MySQL might return a RowDataPacket. Ensure you're properly accessing the user data
//     const userData = Array.isArray(user) ? user[0] : user;

//     console.log("UserData:", userData); // Debug: log userData to verify content

//     if (!userData) {
//       return res.status(400).json({ message: "Invalid user data" });
//     }

//     // Destructure the necessary fields from userData
//     const { status, is_email_exists, is_active, is_steps_complete ,grade, stream } = userData;

//     // If the user's email is not verified or steps are not complete, deny login
//     if (is_email_exists === '0' || is_active === '0' || is_steps_complete === '0') {
//       return res.status(403).json({
//         message: "Please complete your registration process to log in",
//       });
//     }

//     if (status != 1) {
//       return res.status(403).json({
//         message: "Your account is pending verification. Please complete the required steps.",
//       });
//     }

//      // Check if the user is in grade 11 or 12 and has selected a stream
//      if ((grade === '11' || grade === '12') && !stream) {
//       return res.status(403).json({
//         message: "You must select a stream to log in.",
//       });
//     }

//     // Compare the password with the stored password in the database
//     const userPassword = userData.password;
//     const passwordMatch = await bcrypt.compare(password, userPassword);

//     // If the password doesn't match, return a 400 status
//     if (!passwordMatch) {
//       return res.status(400).json({ message: "Incorrect email or password" });
//     }

//     // Generate a JWT token after successful login
//     const token = jwt.sign(
//       { userId: userData.id, source: "login" },
//       "dfghjnhbgvf",
//       { expiresIn: "7d" }
//     );

//     // Respond with a success message and token
//     res.status(200).json({ message: "Login successful", token });

//   } catch (error) {
//     console.error("Error:", error); // Debug: log error stack
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
const selectstream = async (req, res) => {
  const userId = req.userId;
  const { stream } = req.body;

  if (!stream) {
    return res.status(400).json({ message: "Stream is a required field" });
  }

  // Check the current user's grade
  const existingUser = await db.select("tblusers", "grade", `id = '${userId}'`, true);
  
  if (existingUser) {
    const { grade } = existingUser;

    // Validate that stream selection is mandatory for grades 11 and 12
    if ((grade === '11' || grade === '12') && !stream) {
      return res.status(403).json({
        message: "You must select a stream before proceeding."
      });
    }

    // Update the stream field and set is_steps_complete to '1'
    const result = await db.update("tblusers", { stream, is_steps_complete: '1' }, `id = '${userId}'`);
    if (result.status) {
      return res.status(200).json({
        status: result.status,
        affected_rows: result.affected_rows,
        info: result.info,
        message: "Data updated successfully",
      });
    } else {
      throw new Error("Failed to update data");
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database based on email
    const user = await db.select(
      "tblusers",
      "id, email, password, status, is_email_exists, is_active, is_steps_complete, grade, stream", // Include grade and stream in selection
      `email='${email}'`
    );

    console.log("User Result:", user); // Debug: log user result to verify response

    // Ensure the query returned valid data
    if (!user || user.length === 0) {
      console.log("User query returned no results or an empty array."); // Debug: log if user is empty
      return res.status(400).json({ message: "Registration Required" });
    }

    // Access the first user record
    const userData = Array.isArray(user) ? user[0] : user;

    console.log("UserData:", userData); // Debug: log userData to verify content

    if (!userData) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    // Destructure necessary fields from userData
    const { status, is_email_exists, is_active, is_steps_complete, grade, stream } = userData;

    // Debug: Check the values of grade and stream
    console.log(`Grade: ${grade}, Stream: ${stream}`);

    // If the user's email is not verified or steps are not complete, deny login
    if (is_email_exists === '0' || is_active === '0' || is_steps_complete === '0') {
      return res.status(403).json({
        message: "Please complete your registration process to log in",
      });
    }

    if (status != 1) {
      return res.status(403).json({
        message: "Your account is pending verification. Please complete the required steps.",
      });
    }

    // Check if the user is in grade 11 or 12 and has selected a stream
    if ((grade === '11' || grade === '12') && (!stream || stream === "")) {
      console.log("Login denied: Stream not selected for grade 11 or 12."); // Debug log
      return res.status(403).json({
        message: "You must select a stream to log in.",
      });
    }
    
    

    // Compare the password with the stored password in the database
    const userPassword = userData.password;
    const passwordMatch = await bcrypt.compare(password, userPassword);

    // If the password doesn't match, return a 400 status
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    // Generate a JWT token after successful login
    const token = jwt.sign(
      { userId: userData.id, source: "login" },
      "dfghjnhbgvf",
      { expiresIn: "7d" }
    );

    // Respond with a success message and token
    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error("Error:", error); // Debug: log error stack
    res.status(500).json({ error: "Internal server error" });
  }
};



const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("User ID:", userId);
    let UserData = {};
    UserData = await db.select("tblusers", "*", `id = '${userId}'`, true);
    res.status(200).json({ UserData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const userProfile = async (req, res) => {
  const userId = req.userId;
  const {
    name,
    phone,
    alternatephone,
    state,
    city,
    dob,
    school,
    address,
    gender,
  } = req.body;
  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }
  const result = await db.update(
    "tblusers",
    { name, phone, alternatephone, city, dob, school, address, gender, state },
    `id = '${userId}'`,
    true
  );
  if (result.status) {
    return res.status(200).json({
      status: result.status,
      affected_rows: result.affected_rows,
      info: result.info,
      message: "Data updated successfully",
    });
  } else {
    throw new Error("Failed to update data");
  }
};
// select board api
const selectboard = async (req, res) => {
  try {
    const id = req.userId;
    console.log('User ID:', id);
    const { board_id } = req.body;
    if (!board_id) {
      return res.status(400).json({ message: "Board is a required field" });
    }
    const result = await db.update(
      "tblusers",
      { board_id },
      `id = '${id}'`,
      true
    );
    if (result.status) {
      return res.status(200).json({
        status: result.status,
        affected_rows: result.affected_rows,
        info: result.info,
        message: "Data updated successfully",
      });
    } else {
      throw new Error("Failed to update data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update data" });
  }
};
const selectlanguage = async (req, res) => {
  try {
    const userId = req.userId;
    const { language_id } = req.body;
    if (!language_id) {
      return res.status(400).json({ message: "Language ID is required" });
    }
    const result = await db.update(
      "tblusers",
      { language_id },
      `id = '${userId}'`,
      true
    );

    if (result.status) {
      return res.status(200).json({
        status: result.status,
        affected_rows: result.affected_rows,
        info: result.info,
        message: "Data updated successfully",
      });
    } else {
      throw new Error("Failed to update data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update data" });
  }
};

//    update grade
const updategrade = async (req, res) => {
  const userId = req.userId;
  const { grade } = req.body;
  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }
  const isValidGrade = Number(grade) >= 1 && Number(grade) <= 12;
  if (!isValidGrade) {
    return res
      .status(400)
      .json({ message: "Choose a correct grade between 1 and 12" });
  }
  if (parseInt(grade) >= 1 && parseInt(grade) <= 10) {
    const result = await db.update(
      "tblusers",
      { grade, stream: "" },
      `id='${userId}'`,
      true
    );
    return handleUpdateResponse(result, res);
  } else {
    const result = await db.update(
      "tblusers",
      { grade },
      `id='${userId}'`,
      true
    );
    return handleUpdateResponse(result, res);
  }
};
// Function to handle update response
const handleUpdateResponse = (result, res) => {
  if (result.status) {
    return res.status(200).json({
      status: result.status,
      affected_rows: result.affected_rows,
      info: result.info,
      message: "Data updated successfully",
    });
  } else {
    throw new Error("Failed to update data");
  }
};
// update STREAM after login
const updatestream = async (req, res) => {
  const userId = req.userId;
  const { stream } = req.body;
  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }
  const result = await db.update(
    "tblusers",
    { stream },
    `id='${userId}'`,
    true
  );
  return handleResponse(result, res);
};
// Function to handle update response
const handleResponse = (result, res) => {
  if (result.status) {
    return res.status(200).json({
      status: result.status,
      affected_rows: result.affected_rows,
      info: result.info,
      message: "Data updated successfully",
    });
  } else {
    throw new Error("Failed to update data");
  }
};

const getsubject = async (req, res) => {
  const userId = req.userId;
  // Fetch the user from the database
    const user = await db.select("tblusers", "*", `id='${userId}'`, true);
    
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Now it's safe to access user properties
    const grade = user.grade;
    const languageId = user.language_id;
  const query = `
    SELECT DISTINCT
                                            tbl_subjects.subject_name,
                                            tbl_subjects.id,
                                            tbl_subject_logo.subject_logo
                                            FROM tblusers
                                            LEFT JOIN tbl_subjects ON tblusers.grade = tbl_subjects.class_id
                                            LEFT JOIN tbl_subject_logo ON tbl_subjects.logo_id = tbl_subject_logo.id
                                            LEFT JOIN tbl_board_master ON FIND_IN_SET(tblusers.board_id, tbl_subjects.board_id) > 0
                                            LEFT JOIN tbl_language_master ON FIND_IN_SET(tblusers.language_id, tbl_subjects.language_id) > 0
                                            WHERE tblusers.grade = '${grade}'
                                            AND tblusers.id = '${userId}'
                                            AND (FIND_IN_SET(tblusers.board_id, tbl_subjects.board_id) > 0 OR tbl_subjects.board_id IS NULL)
                                            AND (tblusers.stream = tbl_subjects.stream_id OR tbl_subjects.subject_name IN (
                                                'English Grammar',
                                                'English Literature',
                                                'Sanskrit',
                                                'Computer Science',
                                                'Informatics Practice',
                                                'हिन्दी साहित्य',
                                                'हिन्दी व्याकरण',
                                                'संस्कृत'
                                            ))
                                            AND (tblusers.language_id = tbl_subjects.language_id OR FIND_IN_SET(tblusers.language_id, tbl_subjects.language_id) > 0)
                                            AND tbl_subjects.subject_active = '1'`;

  const result = await db.queryAll(query, true);
  res.status(200).json({
    message: "data fetched successfully",
    result,
    languageId
  });
};

const getvideos = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const langid=req.params.langid;
  const result = await db.select("tblusers", "*", `id='${userId}'`, true);

  const videoQuery = `
    SELECT
                        c.id AS chapter_id,
                        c.chapter_title,
                        s.subject_name,
                        v.id AS video_id,
                        v.video_title,
                        v.url
                    FROM tbl_chapters c
                    JOIN tbl_subjects s ON c.subject_id = s.id
                    LEFT JOIN videos v ON v.chapter_id = c.id
                    WHERE s.id = '${id}' and c.chapter_active='1' and is_video='1'  and c.language_id='${langid}'
                    ORDER BY c.chapter_title, v.video_title`;

  const videos = await db.queryAll(videoQuery, true);

  if (!videos || videos.length === 0) {
    return res.status(404).json({ error: "No videos found for this subject" });
  }

  const userSubscriptionStatus = await db.queryAll(
    `SELECT issubscribed FROM tblusers WHERE id = '${userId}'`
  );

  const isSubscribed =
    userSubscriptionStatus.length > 0 &&
    userSubscriptionStatus[0].issubscribed === "1";

  if (!isSubscribed) {
    videos.forEach((video, index) => {
      video.isLocked = index >= 3;
    });
  }

  res.status(200).json({
    message: "Data fetched successfully",
    videos,
    isSubscribed,
    language_id: result.language_id,
    board_id: result.board_id,
    class_id: result.grade,
  });
};

const getBooks = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const bookQuery = `
  SELECT c.id AS chapter_id,
                          c.chapter_title,
                          s.subject_name,
                          b.id AS book_id,
                          b.book_title,
                          b.book_url
                      FROM
                          tbl_chapters c
                      JOIN
                          tbl_subjects s ON c.subject_id = s.id
                      LEFT JOIN
                          tbl_books b ON b.chapter_id = c.id
                      WHERE
                          s.id = '${id}' and c.chapter_active='1' and c.is_book='1'
                      ORDER BY
                          c.chapter_title, b.book_title
`;
  const books = await db.queryAll(bookQuery, true);
  console.log("Books fetched from database:", books);
  if (!books || books.length === 0) {
    return res.status(404).json({ error: "No books found for this subject" });
  }
  res.status(200).json({
    message: "Data fetched successfully",
    books,
  });
};
const Email = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "rahulsoni7982@gmail.com",
      pass: "fsga runm dxax fucq",
    },
  });
  let message = {
    from: "rahulsoni7982@gmail.com",
    to: email,
    subject: "your enquiry",
    text: "This is a test email.",
  };
  try {
    await transporter.sendMail(message);
    await db.insert("tbl_support", { email });
    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error occurred while sending email:", error.message);
    res.status(500).json({
      message: "Failed to send email",
    });
  }
};
const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await db.select("tblusers", "*", `email='${email}'`, true);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a token with expiration time (e.g., 1 hour)
    const secret = process.env.JWT_SECRET || "wertreweee"; // Use a secret from environment variables
    const token = jwt.sign({ email }, secret, { expiresIn: "3m" });

    const resetLink = `https://deltawebservices.in/reset/${token}`;

    await sendPasswordResetLink(email, resetLink);
    res.status(200).json({
      message: "Password reset link has been sent to your email",
      resetLink,
    });
  } catch (error) {
    console.error("Error in forgotpassword API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
async function sendPasswordResetLink(email, resetLink) {
  try {
    const mailOptions = {
      from: "backstreettrickstars@gmail.com",
      to: email,
      subject: "Password Reset Link",
      text: `Click the following link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Password reset link has been sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send password reset email");
  }
}
const reset = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({
      message: " new password, and confirmation password are required",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const secret = process.env.JWT_SECRET || "wertreweee"; // Use your secret key

  try {
    const decoded = jwt.verify(token, secret);
    const email = decoded.email;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.update(
      "tblusers",
      { password: hashedPassword },
      `email='${email}'`
    );
    res.status(200).json({ message: "Password has been successfully reset." });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ message: "Token is expired. Please request a new one." });
    }
    res.status(500).json({ message: "Invalid or malformed token." });
  }
};
const Mcq = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.json(404).json({
      status: false,
      message: " subject id not found in database",
    });
  }
  const userId = req.userId;
  const sql = `SELECT
      m.id,
      m.chapter_id,
      m.question,
      m.option_a,
      m.option_b,
      m.option_c,
      m.option_d,
      m.correct_option,
      s.subject_name,
      c.chapter_title
    FROM
      tbl_mcq m
    JOIN
      tbl_chapters c ON m.chapter_id = c.id
    JOIN
      tbl_subjects s ON c.subject_id = s.id
    WHERE
      s.id = ${id}`;
  const result = await db.queryAll(sql, true);
  if (result.length == 0) {
    return res
      .status(404)
      .json({ error: "No mcq found in database  of particular subject " });
  }
  res.status(200).json({
    status: true,
    message: "MCQs fetched successfully",
    result,
  });
};

const updateVideoTime = async (req, res) => {
  const userId = req.userId;
  try {
    const { subjectId, videoId, playTime, classId, boardId, languageId } =
      req.body;
    const existing = await db.select(
      "tbl_video_play_time",
      "play_time",
      `user_id='${userId}' AND subject_id='${subjectId}' AND video_id='${videoId}' AND class_id='${classId}' AND board_id='${boardId}' AND language_id='${languageId}'`,
      true
    );
    if (existing) {
      if (playTime > existing.play_time) {
      const result = await db.update(
          "tbl_video_play_time",
          { play_time: playTime },
          `user_id='${userId}' AND subject_id='${subjectId}' AND video_id='${videoId}' AND class_id='${classId}' AND board_id='${boardId}' AND language_id='${languageId}'`,
          true
        );
        if (result) {
          return res.status(200).json({
            message: "Data updated successfully",
          });
        } else {
          return res.status(500).json({
            message: "Failed to update data",
          });
        }
      } else {
        return res.status(400).json({
          message: "Playtime is not greater than the existing time",
        });
      }
    } else {
      const insertResult = await db.insert(
        "tbl_video_play_time",
        {
          user_id: userId,
          subject_id: subjectId,
          video_id: videoId,
          play_time: playTime,
          class_id: classId,
          board_id: boardId,
          language_id: languageId,
        },
        true
      );

      if (insertResult) {
        return res.status(200).json({
          message: "Playtime inserted successfully",
        });
      } else {
        return res.status(500).json({
          message: "Failed to insert playtime",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error updating playtime",
      error: error.message,
    });
  }
};

const report = async (req, res) => {
  const user_id = req.userId; 
  console.log(user_id);

  try {
    const totalTime = 7200;
    const query = `
          SELECT s.id, s.subject_name, l.subject_logo, SUM(v.play_time) AS total_play_time
      FROM tbl_video_play_time v
      JOIN tbl_subjects s ON v.subject_id = s.id
      JOIN tbl_subject_logo l ON s.logo_id = l.id
      WHERE v.user_id = '${user_id}'
      GROUP BY s.id, s.subject_name, l.subject_logo;
      `;
    const results = await db.queryAll(query, true);
    const reportData = results.map((row) => {
      const percentage = (row.total_play_time / totalTime) * 100;
      return {
        subjectId: row.subject_id,
        subjectName: row.subject_name,
        subjectLogo: row.subject_logo,
        timeSpent: row.total_play_time,
        percentage: percentage.toFixed(2),
      };
    });
    res.status(200).json({
      message: "Report data retrieved successfully",
      data: reportData,
    });
  } catch (error) {
    console.error("Error retrieving report data:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const bookmarkvideos = async (req, res) => {
  const user_id = req.userId;
  const { subjectId, videoId, classId, boardId, languageId } =
    req.body;
     console.log("Received data:", { subjectId, videoId, classId, boardId, languageId });

     
  const checkBookmark = await db.select(
    "tbl_bookmark",
    "*",
    `user_id = ${user_id} AND video_id = ${videoId}`,true
  );
  if (checkBookmark) {
    const deleteResult = await db.delete(
      "tbl_bookmark",
      `user_id = ${user_id} AND video_id = ${videoId}`
    );
    if (deleteResult) {
      res.json({
        status: "removed",
        message: "Bookmark deleted successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "Failed to delete bookmark",
      });
    }
  } else {
    const data = {
      user_id: user_id,
      subject_id: subjectId,
      video_id: videoId,
      class_id: classId,
      board_id: boardId,
      language_id: languageId,
    };
    
    console.log("Received videoId:", data);

    
    
    const insertResult = await db.insert("tbl_bookmark", data);
    if (insertResult) {
      res.json({
        status: "bookmarked",
        message: "Bookmark added successfully",
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Server error",
        error: error.message,
      });
    }
  }
};

module.exports = {
  otpSend,
  verifyOtp,
  updateUser,
  getAllUser,
  selectclass,
  updatestream,
  selectstream,
  loginController,
  getUserProfile,
  userProfile,
  getsubject,
  selectboard,
  getvideos,
  selectlanguage,
  updategrade,
  resendOTP,
  forgotpassword,
  reset,
  getBooks,
  Email,
  reset,
  Mcq,
  report,
  bookmarkvideos,
  updateVideoTime,
};
