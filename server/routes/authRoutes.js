const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const {SignUp, Login, Logout, fetchData, getAllUser, userData, sendMsg, fetchMsg} = require('../controllers/Usercontroller.js')

router.post('/SignUp', SignUp)
router.post('/Login', Login)
router.get('/Home', auth, fetchData)
router.get('/Logout', Logout)
router.get('/getUser', auth, getAllUser)
router.post('/userData', auth, userData)
router.post('/send', auth, sendMsg)
router.post('/fetchMsg', fetchMsg)




module.exports = router;