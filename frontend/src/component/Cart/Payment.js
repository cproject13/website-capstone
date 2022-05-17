import React, { Fragment, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import "./payment.css";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { createOrder } from "../../actions/orderAction"



const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch()

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);


  const orderTime = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice)
  };
  console.log(paymentData)
  const submitHandler = async (e) => {
    e.preventDefault();
    history.push("/success");
  }

  const product = {
    description: "Design+Code React Hooks Course",
    price: 19
  };

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderId) => {
    setPaidFor(true);
  };

  if (paidFor) {
    alert("Thank you for your purchase!");

  }

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <div className="checkout">
          <button className="checkout-button" onClick={(e) => submitHandler(e)}><h1>COD</h1></button>
          <div className="paypal-button-container">
            <PayPalScriptProvider options={{ "client-id": "AVbCfEwyPYpzjbs-ERx-FvSUDsLyF353rmWyY0_Rzxu_0yvgCT7xs_nhOd_8pt8jbp14uFF51zCs-_rj" }}>
              <PayPalButtons
                style={{
                  color: "gold",
                  layout: "horizontal",
                  height: 40,
                  tagline: false
                }}

                onClick={(data, actions) => {
                  // Validate on button click, client or server side
                  const hasAlreadyBoughtCourse = false;

                  if (hasAlreadyBoughtCourse) {
                    setError(
                      "You already bought this course. Go to your account to view your list of courses."
                    );

                    return actions.reject();
                  } else {
                    return actions.resolve();
                  }
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: product.descriptionpaypa,
                        amount: {

                          value: paymentData.amount
                        }
                      }
                    ]
                  });
                }}
                onApprove={async (data, actions) => {
                  const order = await actions.order.capture();
                  history.push("/success");
                  handleApprove(data.orderID);
                  orderTime.paymentInfo = {
                    id: order.id,
                    status: order.status,
                  }
                  dispatch(createOrder(orderTime))
                  console.log(orderTime)

                }}
                onCancel={() => {
                  // Display cancel message, modal or redirect user to cancel page or back to cart
                }}
                onError={(err) => {
                  setError(err);
                  console.error("PayPal Checkout onError", err);
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Payment