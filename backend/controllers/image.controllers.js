// image.controllers.js
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import User from '../models/user.models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const removeImageBackground = async (req, res) => {
  try {
    // Verify user exists (from JWT middleware)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check for uploaded file
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const inputPath = req.file.path;

    // Prepare form-data request to remove.bg
    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(inputPath));

    const response = await axios.post(
      process.env.REMOVE_BG_API_URL, // Example: 'https://api.remove.bg/v1.0/removebg'
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'x-api-key': process.env.REMOVE_BG_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    // Save processed image
    const filename = `bg-removed-${uuidv4()}.png`;
    const outputPath = path.join(__dirname, '../uploads', filename);
    fs.writeFileSync(outputPath, response.data);

    // Optionally delete original upload (optional)
    fs.unlinkSync(inputPath);

    res.status(200).json({
      message: 'Background removed successfully',
      imageUrl: `/uploads/${filename}`, // Client can fetch this via server’s static route
    });
  } catch (error) {
  console.error('Error removing background:', error.message);
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Response data:', error.response.data.toString());
  }
  res.status(500).json({
    message: 'Error removing background',
    error: error.response?.data?.toString() || error.message,
  });
}
};
