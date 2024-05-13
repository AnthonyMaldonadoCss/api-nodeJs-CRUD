

const express = require('express');
const router = express.Router();


const userController = require('../../controllers/users/authController');

const matchToken = require('../../middleware/auth');
/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Endpoints
 */

/**
 * @swagger
 * /register:
 *  post:
 *      summary: Register a new user
 *      tags: [User]
 */ 
router.post('/register', userController.register);

/**
 * @swagger
 * /signin:
 *  post:
 *      summary: Signin a user
 *      tags: [User]
 */
router.post('/signin', userController.signin);

/**
 * @swagger
 * /profile:
 *  get:
 *      summary: Get user profile
 *      tags: [User]
 */
router.get('/profile', matchToken, userController.profile);

/**
 * @swagger
 * /Logout:
 *  post:
 *      summary: LogOut a user
 *      tags: [User]
 */
router.post('/logout', matchToken, userController.logOut);

/**
 * @swagger
 * /:VerifyToken:
 *  post:
 *      summary: verify token
 *      tags: [User]
 */
router.get('/verify', userController.verifyToken);

module.exports = router