const express = require('express');
const router = express.Router()
const { verifyToken, authRole } = require('../middleware/auth')
const { getAllDrugs, addDrugs, deletById, updateDrugs, deleteAll } = require('../controllers/products')
const search = require('../controllers/search')




router.route('/getDrugs').get(verifyToken, authRole, getAllDrugs)

router.route('/static').post(verifyToken, authRole, addDrugs)

router.route('/addDrugs').post(verifyToken, authRole, addDrugs)

router.route('/deleteall').delete(verifyToken, authRole, deleteAll)

router.route('/deleteOne/:id').delete(verifyToken, authRole, deletById)

router.route('/update/:name').patch(verifyToken, authRole, updateDrugs)


router.route('/search').get(search)





module.exports = router