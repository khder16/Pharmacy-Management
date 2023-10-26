const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth')
const authRole = require('../middleware/auth')
const orderDrugs = require('../controllers/orders')

router.route('/orderDrug').get(verifyToken, orderDrugs)


module.exports = router