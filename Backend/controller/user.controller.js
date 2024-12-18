const User = require("../model/user.model")
const bcrypt = require("bcryptjs")
const salt = 10;
const jwt = require("jsonwebtoken")
const SECRET_KEY = "test"

exports.store = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findedUser = await User.findOne({ email: email })
        if (findedUser) {
            return res.json({ success: false, status: 403, mesage: "Email Already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword;
        const user = await User.create(req.body);
        return res.json({ status: 200, success: true, message: "User Created Successfully", user })
    }
    catch (err) {
        console.log(err.message);

    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findedUser = await User.findOne({ email: email })
        if (findedUser) {
            const isMatch = await bcrypt.compare(password, findedUser.password)
            if (isMatch) {
                const token = jwt.sign({ id: findedUser._id }, SECRET_KEY, { expiresIn: '1h' })
                return res.json({ status: 200, success: true, message: "User Logged In Successfully", user: findedUser, token })
            } else {
                return res.json({ status: 401, success: false, message: "Incorrect Password" })
            }
        } else {
            return res.json({ status: 404, success: false, message: "User not found" })
        }
    }
    catch (err) {
        console.log(err);

    }
}
exports.index = async (req, res) => {
    try {
        const users = await User.find();
        return res.json({ status: 200, success: true, message: "Users Fetched Successfully", users })
    }
    catch (err) {
        console.log(err.message);
        SECRET_KEY
    }
}

exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.json({ status: 404, success: false, message: "User not found" })
        }
        return res.json({ status: 200, success: true, message: "User Fetched Successfully", user })
    }
    catch (err) {
        console.log(err.message);

    }
}

exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndDelete({ _id: id });
        if (!user) {
            return res.json({ status: 404, success: false, message: "User not found" })
        }
        return res.json({ status: 200, success: true, message: "User Deleted Successfully" })
    }
    catch (err) {
        console.log(err.message);

    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (!user) {
            return res.json({ status: 404, success: false, message: "User not found" })
        }
        return res.json({ status: 200, success: true, message: "User Updated Successfully" })
    }
    catch (err) {
        console.log(err.message);

    }
}

exports.generateOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.json({ status: 404, success: false, message: "User not found" })
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.code = otp;
        user.save();
        return res.json({ status: 200, success: true, message: "OTP CREATED SUCCESSFULLY" })
    }
    catch (err) {
        console.log(err.message)
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        const { email,otp } = req.body;
        console.log(email,otp)
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.json({ status: 404, success: false, message: "User not found" })
        }
        if(user.code == otp){
            return res.json({ status: 200, success: true, message: "OTP Verified SUCCESSFULLY" })
        }else{
            return res.json({ status: 403, success: false, message: "Incorrect OTP" })
        }
    }
    catch (err) {
        console.log(err.message)
    }
}