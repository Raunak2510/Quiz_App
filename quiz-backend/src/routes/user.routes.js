const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/user.controllers.js');
const {loginUser}= require('../controllers/user.controllers.js');
const {logoutUser}= require('../controllers/user.controllers.js');
const { auth } = require('../middlewares/auth.middlewares.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',auth, logoutUser);

module.exports = router;