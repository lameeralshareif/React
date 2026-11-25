import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const parseCost = (cost) => {
    if (typeof cost === 'number') return cost;
    return parseFloat(String(cost).replace(/[^0-9.]/g, '')) || 0;
  };

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0)
      .toFixed(2);
  };

  const calculateItemSubtotal = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Checkout functionality will be available soon.');
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>

      {cartItems.length === 0 ? (
        <p style={{ margin: '1rem 0' }}>Your cart is currently empty.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
          {cartItems.map((item) => (
            <div
              key={item.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '6px' }}
              />
              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>Unit Price: {item.cost}</p>
                <p>Subtotal: ${calculateItemSubtotal(item)}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => handleDecrement(item)} style={{ padding: '0.25rem 0.6rem', cursor: 'pointer' }}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => handleIncrement(item)} style={{ padding: '0.25rem 0.6rem', cursor: 'pointer' }}>
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    style={{ marginLeft: '1rem', padding: '0.25rem 0.75rem', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button type="button" onClick={onContinueShopping} style={{ padding: '0.6rem 1.2rem', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button type="button" onClick={handleCheckoutShopping} style={{ padding: '0.6rem 1.2rem', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
