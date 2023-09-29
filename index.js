const express = require("express");
const axios = require("axios");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const SCALAPAY_API_KEY = "qhtfs87hjnc12kkos";

app.post("/create-order", async (req, res) => {
  try {
    const orderData = {
      totalAmount: {
        amount: req.body.totalMoney,
        currency: req.body.currency,
      },
      consumer: {
        givenNames: req.body.givenNames,
        surname: req.body.surname,
        email: req.body.email,
      },
      shippingAmount: {
        amount: req.body.shippingMoney,
        currency: req.body.currency,
      },
      taxAmount: {
        amount: req.body.taxMoney,
        currency: req.body.currency,
      },
      type: "online",
      product: "pay-in-3",
      frequency: {
        number: 1,
        frequencyType: "monthly",
      },
      merchant: {
        redirectConfirmUrl:
          "https://portal.integration.scalapay.com/success-url",
        redirectCancelUrl:
          "https://portal.integration.scalapay.com/failure-url",
      },
      orderExpiryMilliseconds: 600000,
    };
    
    const response = await axios.post(
      "https://staging.api.scalapay.com/v2/orders",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${SCALAPAY_API_KEY}`,
        },
      }
    );

    console.log(response.data);
    res.json(response.data);

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("An error occurred while processing your order.");
  }
});

// Start the Express server.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
