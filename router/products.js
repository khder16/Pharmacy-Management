const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth')
const authRole = require('../middleware/auth')
const { getAllDrugs, addDrugs, deletById, updateDrugs, deleteAll } = require('../controllers/products')
const search = require('../controllers/search')




router.route('/getDrugs').get(verifyToken, getAllDrugs)

router.route('/static').post(verifyToken,addDrugs)

router.route('/addDrugs').post(addDrugs)

router.route('/deleteall').delete(deleteAll)

router.route('/deleteOne/:id').delete(verifyToken,deletById)

router.route('/update/:name').patch(verifyToken,updateDrugs)


router.route('/search').get( search)





module.exports = router