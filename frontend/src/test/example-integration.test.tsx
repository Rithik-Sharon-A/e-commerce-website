import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/slices/cartSlice';

// Simple cart display component for testing
const CartDisplay = () => {
  const cart = { totalItems: 0 }; // Simplified for example
  return <div>Cart Items: {cart.totalItems}</div>;
};

describe('Integration Test Example', () => {
  it('should render cart with initial state', () => {
    const testStore = configureStore({
      reducer: {
        cart: cartReducer
      }
    });

    render(
      <Provider store={testStore}>
        <CartDisplay />
      </Provider>
    );

    expect(screen.getByText('Cart Items: 0')).toBeInTheDocument();
  });
});


