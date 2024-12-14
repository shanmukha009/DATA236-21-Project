const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const fs = require('fs');

const app = express();
// const PORT = 5000;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies in requests
app.use(bodyParser.json());

// Endpoint to save checkout data to a text file
app.post('/save-checkout', (req, res) => {
  console.log("Received request to save checkout:", req.body);
  const { customerName, orderDetails, totalPrice } = req.body;

  const data = `
Customer Name: ${customerName}
Order Details:
${orderDetails.map(item => `Product: ${item.name}, Quantity: ${item.quantity}, Price: $${item.price}`).join('\n')}
Total Price: $${totalPrice}
----------------------------------
`;

  fs.appendFile('checkout_data.txt', data, (err) => {
    if (err) {
      console.error('Error writing to file', err);
      res.status(500).json({ message: 'Failed to save data' });
    } else {
      console.log("Checkout data saved successfully");
      res.status(200).json({ message: 'Checkout data saved successfully' });
    }
  });
});

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
