const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*' // Replace '*' with your frontend URL in production
}));
app.use(express.json());

// Helper to generate 6-digit numeric codes
function generate6Digit() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Voucher endpoint
app.post('/api/cashier/voucher', (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.json({ error: 'Amount must be greater than 0' });

  const userCode = generate6Digit();
  const pin = generate6Digit();
  const bonus = Math.floor(amount * 0.1);

  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userCode}-${pin}`;

  res.json({
    userCode,
    pin,
    amount: Number(amount),
    bonus,
    loginUrl: 'https://playtimeusa.net',
    qrCode
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});

