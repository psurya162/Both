const db = require('../config/db_Setting')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// admin login 
const AdminLogin = async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.select('tbl_admin', '*', `username='${username}'`,true);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign({ userId: user.id }, 'dfghjnhbgdsdsdvf', { expiresIn: '7d' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const getAllUser = async (req, res) => {
    try {
        const allUsers = await db.selectAll('tblusers', '*', '');
        const userfound=await db.selectAll('tblusers','*',`issubscribed='0'`)
        const allsubs=await db.selectAll('tblusers','*',`issubscribed='1'`)
        const usercount=userfound.length;
        const userCount = allUsers.length;
        const isusercount=allsubs.length;
        res.status(200).json({
            message: "Data fetched successfully",
            userCount: userCount,
            allUsers: allUsers,
            usercount:usercount,
            isusercount:isusercount
        });
    } catch (error) {
       
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
}
// to get notsubscription users
const getAllNotSubscriptionUser=async(req,res)=>{
    const userfound=await db.selectAll('tblusers','*',`issubscribed='0'`)
    const usercount=userfound.length;
    res.status(200).json({
        message:"data fetch successfully",
        userfound,
        usercount
    })
}
// to fetch all subscription user
const getAllSubscriptionUser=async(req,res)=>{
    const userfound=await db.selectAll('tblusers','*',`issubscribed='1'`)
    const userscount=userfound.length;
    res.status(200).json({
        message:"data fetch successfully",
        userscount
    })
}
// to add content
const content=async(req,res)=>{
    const {video_title,subject_id,subject_title,chapter_title,chapter_id,class_id,url}=req.body
    if(!video_title || !subject_id || !subject_title || !chapter_title || !chapter_id || !class_id || !url){
        res.status(400).json({
            message:"all field are required"
        })
    }
    await db.insert('tbl_videos',{video_title,subject_id,subject_title,chapter_title,chapter_id,class_id,url},true)
    res.status(200).json({
        message:"data inserted successfully"
    })
}
// to add books in database
const books=async(req,res)=>{
    const {books_name,book_url,class_id,subject_id}=req.body;
    if(!books_name || !book_url || !class_id ||!subject_id){
        res.status(400).json({
            message:"all fields are required"
        })
    }
    await db.insert('tbl_books',{books_name,book_url,class_id,subject_id})
    res.status(200).json({
        message:"books inserted successfully"
    })
}
function generateRandomCode() {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const date = currentDate.getDate().toString().padStart(2, '0');
    let hour = currentDate.getHours().toString().padStart(2, '0');
    const minute = currentDate.getMinutes().toString().padStart(2, '0');
    const second = currentDate.getSeconds().toString().padStart(2, '0');
    const randomCode = `DV${year}${date}${hour}${minute}${second}`;
    return randomCode;
}
async function updateLicenseCode(id,duration) {
    const randomCode = generateRandomCode();
    await db.update('tbl_license', { appcode: randomCode }, `id=${id}`);
    await db.insert('tbl_device_license',{appcode:randomCode,license_id:id,Time_Period:duration})
}
// to generate license
const License = async (req, res) => {
    const { name, phoneno, email, organisation, content, board, medium, duration } = req.body;
    if (!name || !phoneno || !email || !organisation || !content || !board || !medium || !duration) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const userFound = await db.select('tbl_license', '*', `email='${email}'`, true);
    if (userFound) {
        return res.status(400).json({ message: 'Email already exists' });
    } else {
        try {
            
            const insertResult = await db.insert('tbl_license', { name, phoneno, email, organisation, content, board, medium, duration }, true);
            if (insertResult.status && insertResult.insert_id) {
                const lastInsertedId = insertResult.insert_id;
                await updateLicenseCode(lastInsertedId,duration);
                return res.status(200).json({ message: 'License created successfully', lastInsertedId });
            } else {
                return res.status(500).json({ message: 'Error inserting license' });
            }
        } catch (error) {
            console.error('Error creating license:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
// to get profile of a particular user
const getProfile = async (req, res) => {
    const id = req.params.id;
    const user = await db.select('tblusers', '*', `id='${id}'`, true);
    console.log(user)
    if (user) {
        await res.status(200).json({
            message: "data profile fetched successfully",
            user
        });
    } else {
        await res.status(404).json({
            message: "User not found at profile"
        });
    }
}
// to get all license
const getAllLicense=async(req,res)=>{
    const users=await db.selectAll('tbl_license','*','','',true)
    const usercount=users.length;
    await res.status(200).json({
        message:"data fetched successfully",
        users,
        usercount
    })
}
const renewLicense = async (req, res) => {
    try {
        const { appcode } = req.body;
        if (!appcode) {
            return res.status(400).json({
                message: "App code is required"
            });
        }
        const codeFound = await db.select('tbl_device_license', '*', `appcode='${appcode}'`, true);
        if (!codeFound) {
            return res.status(404).json({
                message: "App code is not found in database"
            });
        }

        await db.update('tbl_device_license', { isactivated: '1' }, `appcode='${appcode}'`, true);
        return res.status(200).json({
            message: "Subscription renewal successful"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports={AdminLogin,getAllUser,getAllNotSubscriptionUser,getAllSubscriptionUser,content,books,License,getProfile,getAllLicense,renewLicense }
