import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";


function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const response = axios.post('http://localhost:3003/payment')
        const { clientSecret } = await response.json();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement },
        });

        if (confirmPayment.error) {
            setError(confirmPayment.error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <h2 className="payment-title">Secure Payment</h2>
                <form onSubmit={handleSubmit}>
                    {/* Single Card Input Styled to Look Separate */}
                    <div className="card-input-container">
                        <label>Card Details</label>
                        <CardElement className="card-element" options={{ style: { base: { fontSize: "16px" } } }} />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="pay-button" disabled={!stripe || loading}>
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                </form>

                {success && <div className="message success">✅ Payment Successful!</div>}
                {error && <div className="message error">❌ {error}</div>}
            </div>
        </div>
    );
}

export default PaymentForm;
