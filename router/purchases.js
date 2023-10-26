const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth')
const authRole = require('../middleware/auth')
const { checkout, purchasesDrugs } = require('../controllers/purchases')



router.route('/purchasesDrugs').post(verifyToken, purchasesDrugs)
router.route('/checkout').post(verifyToken, checkout)

module.exports = router

