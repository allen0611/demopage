import React from 'react';

function Track() {
  return (
    <div>
      <h2>Track Your Order</h2>
      <p>Enter your order number and email address to track your order status:</p>
      <form>
        <label htmlFor="order-number">Order Number:</label>
        <input type="text" id="order-number" name="order-number" />
        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Track Order</button>
      </form>
    </div>
  );
}

export default Track;
