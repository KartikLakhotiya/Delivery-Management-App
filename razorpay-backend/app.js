const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3002' // Replace with your frontend's URL
}));

const razorpay = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET',
});

app.get('/', (req, res) => {
  res.send('Welcome to the Razorpay Node.js Example!');
});

app.post('/create-payment', (req, res) => {
  const { total, name, date } = req.body

  const options = {
    amount: total,
    currency: 'INR',
    receipt: Math.floor(1000 + Math.random() * 9000),
    partial_payment: false,
    notes: {
      name,
      date
    },
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(order);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
