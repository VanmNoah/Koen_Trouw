// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
    },
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static('public'));

// Route to handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.status(200).send('File uploaded successfully: ' + req.file.filename);
    } else {
        res.status(400).send('Error uploading file.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
