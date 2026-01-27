// Test basic ES Module functionality
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('ES Modules are working!');
});

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  // Close server after 2 seconds to test the functionality
  setTimeout(() => {
    console.log('Closing test server');
    process.exit(0);
  }, 2000);
});