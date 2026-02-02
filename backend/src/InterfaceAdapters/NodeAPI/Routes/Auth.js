const express = require('express');
const AuthController = require('../Controllers/AuthController');
const UserService = require('../../../Application/services/UserService');
const UserRepository = require('../../../Infrastructure/Repositories/UserRepository');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

// Dependency injection
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

// POST /auth/register - Register new user
router.post('/register', (req, res) => authController.register(req, res));

// POST /auth/login - Login user
router.post('/login', (req, res) => authController.login(req, res));

// GET /auth/me - Get current user (protected)
router.get('/me', authMiddleware, (req, res) => authController.me(req, res));

module.exports = router;

