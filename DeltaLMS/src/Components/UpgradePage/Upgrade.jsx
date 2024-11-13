import React, { useState ,useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment, handleSubscription } from '../redux/paymentSlice';
import './Upgrade.css';
import { IoMdArrowRoundBack ,IoIosInfinite } from 'react-icons/io';
import { LuPanelBottom } from "react-icons/lu";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaAward } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import {fetchUserData} from '../redux/authSlice'
// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51Pq7HR06cVP5WkZIg8qiY1tKCtzIQ2g6oJHBpXwOAkKF512oe3oytBBhqexa9GkHxzbRN9WNpKESOdaBBBYeSyOs00IdaLMeqo');

const Upgrade = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Assuming you already have some API call that sets user data when component mounts
        dispatch(fetchUserData());  // Replace with your actual action
      }, [dispatch]);
      
      // Select userId after it's set
      const { userData, loading: userLoading, error: userError } = useSelector(state => state.auth);
      const userId = userData?.id;
    
    const { clientSecret, paymentStatus, error } = useSelector(state => state.payment);

    const handleNavigate = () => {
        navigate(-1);
    };

    const handleSelectPlan = (planType) => {
        setSelectedPlan(planType);
    };

    const handleProceed = async () => {
        if (!selectedPlan) {
            alert("Please select a plan.");
            return;
        }
    
      
        setLoading(true);
        try {
            await dispatch(createPayment({ userId, planType: selectedPlan })); // Use dynamic userId
        } catch (error) {
            console.error("Payment creation failed:", error);
        }
        setLoading(false);
    };
    
    const handlePaymentSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.error("Stripe or Elements not loaded");
            return;
        }
    
        const cardElement = elements.getElement(CardElement);
       
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            }
        });
    
        if (error) {
            console.error("Payment error:", error.message);
        } else if (paymentIntent.status === 'succeeded') {
            console.log("Payment succeeded, updating subscription for user:", userId); // Log userId
            dispatch(handleSubscription({ userId, planType: selectedPlan })); // Use dynamic userId
            setSuccess(true);
            setTimeout(() => {
                navigate('/studentDashboard');
            }, 2000);
        }
    };
    
    return (
        <>
            <Container fluid className="upgrade mb-3">
                <div className="upgrade-back" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
                    <IoMdArrowRoundBack size={30} />
                </div>
                <Row className="text-center">
                    <Col>
                        <h4 className='pt-3 pb-3 text-white'>Get Delta Subscription and <br /> Learn Unlimited</h4>
                    </Col>
                </Row>
            </Container>

            <Container className="subscription-container mb-4">
                <h4>Subscription Plans</h4>
                <Row>
                    <Col md={6} className="d-flex justify-content-end mb-3">
                        <div
                            className={`subscription-card p-3 ${selectedPlan === 'year' ? 'selected' : ''}`}
                            onClick={() => handleSelectPlan('year')}
                        >
                            <div className='d-flex justify-content-center align-items-center'>
                            <TiTick />
                            <p>One Year</p>
                            </div>
                            <p>₹4000/yr</p>
                        </div>
                    </Col>
                    <Col md={6} className="mb-3">
                        <div
                            className={`subscription-card p-3 ${selectedPlan === 'threeMonths' ? 'selected' : ''}`}
                            onClick={() => handleSelectPlan('threeMonths')}
                        >
                            <p>Three Months</p>
                            <p>₹1200/3mth</p>
                        </div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end mb-3">
                        <div
                            className={`subscription-card p-3 ${selectedPlan === 'week' ? 'selected' : ''}`}
                            onClick={() => handleSelectPlan('week')}
                        >
                            <p>One Week</p>
                            <p>₹100/wk</p>
                        </div>
                    </Col>
                    <Col md={6} className="mb-3">
                        <div
                            className={`subscription-card p-3 ${selectedPlan === 'day' ? 'selected' : ''}`}
                            onClick={() => handleSelectPlan('day')}
                        >
                            <p>One Day</p>
                            <p>₹20/day</p>
                        </div>
                    </Col>
                </Row>

                <Row >
                    <Col>
                        <Button
                            onClick={handleProceed}
                            
                            className="default__button w-25"
                        >
                            {loading ? 'Processing...' : 'Proceed to Payment'}
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Container className="upgrade-section text-center mt-5 mb-5">
                <Row>
                    <Col>
                        <h4 >Go Pro And Learn Unlimited</h4>
                    </Col>
                </Row>
                <Row className="plan-feature justify-content-center mt-3">
                    <Col md={2}  className="plan-feature-child text-center">
                        <MdOutlineContentCopy size={30} />
                        <h6>Annual Plan</h6>
                        <p>Video lessons, syllabus books, notes</p>
                    </Col>
                    <Col md={2} className="plan-feature-child text-center">
                        <IoIosInfinite size={30} />
                        <h6>Unlimited Practice</h6>
                        <p>Build mastery & improve your score</p>
                    </Col>
                    <Col md={2} className="plan-feature-child text-center">
                        <LuPanelBottom size={30} />
                        <h6>Explore Additional Content</h6>
                        <p>DIY projects, stories, poems, biographies</p>
                    </Col>
                    <Col md={2} className="plan-feature-child text-center">
                        <FaAward size={30} />
                        <h6>Test Prep</h6>
                        <p>Access to all competitive exams</p>
                    </Col>
                    <Col md={2} className="plan-feature-child text-center">
                        <FaArrowRightArrowLeft size={30} />
                        <h6>Switch Classes</h6>
                        <p>Change class anytime within the year</p>
                    </Col>
                </Row>
            </Container>

            {clientSecret && (
                <Container className="billing-details-section border p-3">
                    <Row>
                        <Col className="text-center">
                            <h5>Billing Details</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <form onSubmit={handlePaymentSubmit}>
                                <CardElement />
                                <Button type="submit" disabled={!stripe || loading} className="default__button w-100">
                                    {loading ? 'Processing...' : 'Confirm Payment'}
                                </Button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            )}

            {error && <p className="text-danger text-center mt-2">{error}</p>}
            {success && <p className="text-success text-center mt-2">Payment successful! Redirecting...</p>} {/* Success message */}
        </>
    );
};

const StripeWrappedUpgrade = () => (
    <Elements stripe={stripePromise}>
        <Upgrade />
    </Elements>
);

export default StripeWrappedUpgrade;
