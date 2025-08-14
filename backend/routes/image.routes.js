// image.routes.js
import express from 'express';
import authMiddleware from '../middlewares/auth.middlewares.js';
import uploadMiddleware from '../middlewares/multer.middlewares.js';
import { removeImageBackground } from '../controllers/image.controllers.js';

const router = express.Router();

// POST /api/images/upload
router.post(
  '/upload',
  authMiddleware,         // Check JWT token
  uploadMiddleware,       // Handle single file upload (expects 'image' field)
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Call controller to process image
      await removeImageBackground(req, res);
    } catch (error) {
      console.error('Unexpected error in upload route:', error);
      res.status(500).json({ message: 'Unexpected server error' });
    }
  }
);

export default router;
