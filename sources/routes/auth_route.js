const express = require('express');
const router = express.Router();
const controller = require('../controller/auth__controller.js');

const requireAuth = require('../middleware/authUser.js')
const {register, login, post_register, postLogin, GEtLoginVerifyAccount, CompleteInformation, PostCompleteInformation, GetPropiedad, logout} = controller;

router.get('/register', register);
router.get('/login', login);

router.post('/register', post_register);
router.post('/login', postLogin);

router.get('/verificar/cuenta/:id', GEtLoginVerifyAccount);

router.get('/auth/complete/information',requireAuth,CompleteInformation);
router.post('/auth/complete/information',requireAuth,PostCompleteInformation);

router.get('/auth/propiedad',requireAuth, GetPropiedad)

router.get('/logout', logout);

module.exports = router;