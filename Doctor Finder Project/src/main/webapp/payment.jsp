<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Razorpay Payment</title>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <style>
        /* Attractive Background */
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(to right, #ff758c, #ff7eb3);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        /* Centered Payment Box */
        .payment-container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 350px;
        }

        .payment-container h2 {
            margin-bottom: 15px;
            color: #333;
        }

        /* Attractive Pay Now Button */
        .pay-button {
            background: linear-gradient(135deg, #ff416c, #ff4b2b);
            color: white;
            font-size: 18px;
            font-weight: bold;
            padding: 12px 25px;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 5px 15px rgba(255, 64, 108, 0.4);
            outline: none;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .pay-button:hover {
            background: linear-gradient(135deg, #ff4b2b, #ff416c);
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(255, 64, 108, 0.6);
        }
    </style>
</head>
<body>
    <div class="payment-container">
        <h2>Complete Your Payment</h2>
        <form id="paymentForm">
            <input type="hidden" name="amount" id="amount" value="100"> <!-- Amount in paise -->
            <input type="hidden" name="currency" id="currency" value="INR">
            <button type="button" class="pay-button" id="rzp-button1">Pay Now</button>
        </form>
    </div>

    <script>
        var options = {
            "key": "rzp_test_hWS7k6CBHBiHw3", // Enter your Razorpay API Key
            "amount": document.getElementById("amount").value, // Amount in subunits
            "currency": document.getElementById("currency").value,
            "name": "Test",
            "description": "Test Transaction",
            "handler": function (response) {
                alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
                // Redirect to success page or handle success
            },
            "theme": {
                "color": "#F37254"
            }
        };

        document.getElementById('rzp-button1').onclick = function (e) {
            var rzp1 = new Razorpay(options);
            rzp1.open();
            e.preventDefault();
        }
    </script>
</body>
</html>
