// user.routes.js
import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/user.controllers.js';

const router = express.Router();

// Registration route with validation
router.post(
  '/register',
  [
    body('username')
      .notEmpty()
      .withMessage('Username is required'),
    body('email')
      .isEmail()
      .withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  register
);

// Login route with validation
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Valid email is required'),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  login
);

export default router;
