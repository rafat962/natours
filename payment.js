// This is your test secret API key.
const stripe = require('stripe')('sk_test_51OafveHJfeXTZvCZTIQ6uugWhvbbxzXdk9OegT2O4VGZ2xp3TyRfLb7VucS60qLCh5lSWebxsE8BBIsyQTYZsmvo00QvJISpid');

const app = require('./app')





const YOUR_DOMAIN = 'http://http://localhost:8000';

app.post('/create-checkout-session', async (req, res) => {
const session = await stripe.checkout.sessions.create({
    line_items: [
    {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
    },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
});
res.redirect(303, session.url);
});

