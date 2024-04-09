const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors()); // Enable CORS for all routes

// Your other routes and configurations...

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
