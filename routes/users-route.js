//========== USERS ROUTE ==========
const express = require('express');

const usersController = require('./../controllers/users-controller');

//========== ROUTES ==========
const router = express.Router();

//USER SIGN UP
router
.route('/signUp')
.post(usersController.createUserSignUp);

//USER SIGN IN
router
.route('/signIn')
.post(usersController.createUserSignIn);


//========== EXPORTING ==========
module.exports = router;