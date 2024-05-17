const express = require('express')
const router = express.Router()


router.post('/signup', require('../Controllers/SignUp'))
router.post('/checkemail', require('../Controllers/CheckEmail'))
router.post('/login', require('../Controllers/LogIn'))


module.exports = router;
