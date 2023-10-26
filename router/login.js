const express = require('express');
const router = express.Router()
const { login, registerUser, registerAdmin, getAllAdmins, getAllUsers } = require('../controllers/login')
const {verifyToken} = require('../middleware/auth')
const {authRole} = require('../middleware/auth')


router.route('/login').post(login)
router.route('/register/user').post(registerUser)
router.route('/register/admin').post(registerAdmin)
router.route('/register/getadmins').get(verifyToken,authRole, getAllAdmins)
router.route('/register/getusers').get(verifyToken,authRole, getAllUsers)
module.exports = router