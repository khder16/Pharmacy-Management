const User = require("../model/user");
const Admin = require("../model/admin");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { verifyToken, authRole } = require('../middleware/auth');
//register for user
const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        if (!(first_name && last_name && email && password && role)) {
            return res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User is already Exist. Please login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: "user",
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
};

//register for admin
const registerAdmin = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        if (!(first_name && last_name && email && password)) {
            return res.status(400).send("All input is required");
        }

        const oldAdmin = await Admin.findOne({ email });

        if (oldAdmin) {
            return res.status(409).send("Admin is already Exist. Please login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: "admin",
        });

        const token = jwt.sign(
            { admin_id: admin._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "30d",
            }
        );

        admin.token = token;

        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("Enter email and password");
        }

        let user
        user = await User.findOne({ email }) || await Admin.findOne({ email })
        if (!user) {
            res.json({ msg: "there is no user with this email" })
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await jwt.sign(
                { user_id: user._id, role: user.role, email: user.email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "30d",
                }
            );
            res.cookie("token", token, { maxAge: 240 * 60 * 60 * 1000 })
        }
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
    }
};

const getAllAdmins = async (req, res) => {
    try {
        verifyToken(req, res, async () => {
            const allAdmins = await Admin.find({})
            res.send(allAdmins)
        })

    } catch (error) {
        console.log(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        verifyToken(req, res, async () => {
            const allUsers = await User.find({})
            res.send(allUsers)
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = { login, registerUser, registerAdmin, getAllAdmins, getAllUsers };
