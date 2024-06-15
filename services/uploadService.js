// const multer = require('multer');

// const storage = multer.memoryStorage(); // Store files in memory as Buffer objects

// const upload = multer({ storage: storage });

// module.exports = upload;


const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory as Buffer objects

module.exports = multer({ storage: storage });

