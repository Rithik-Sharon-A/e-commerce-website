import { describe, it, expect } from 'vitest';
import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { Product } from '../types/product';

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  description: 'Test description',
  price: 99.99,
  image: 'test.jpg',
  category: 'Test',
  stock: 10
};

describe('Cart Slice', () => {
  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      totalItems: 0,
      totalPrice: 0
    });
  });

  it('should add a product to cart', () => {
    const initialState = {
      items: [],
      totalItems: 0,
      totalPrice: 0
    };

    const actual = cartReducer(initialState, addToCart(mockProduct));
    
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].product.id).toBe(1);
    expect(actual.items[0].quantity).toBe(1);
    expect(actual.totalItems).toBe(1);
    expect(actual.totalPrice).toBe(99.99);
  });

  it('should increase quantity when adding the same product', () => {
    const initialState = {
      items: [{
        product: mockProduct,
        quantity: 1
      }],
      totalItems: 1,
      totalPrice: 99.99
    };

    const actual = cartReducer(initialState, addToCart(mockProduct));
    
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(2);
    expect(actual.totalItems).toBe(2);
    expect(actual.totalPrice).toBeCloseTo(199.98);
  });

  it('should remove a product from cart', () => {
    const initialState = {
      items: [{
        product: mockProduct,
        quantity: 1
      }],
      totalItems: 1,
      totalPrice: 99.99
    };

    const actual = cartReducer(initialState, removeFromCart(1));
    
    expect(actual.items).toHaveLength(0);
    expect(actual.totalItems).toBe(0);
    expect(actual.totalPrice).toBe(0);
  });

  it('should update product quantity', () => {
    const initialState = {
      items: [{
        product: mockProduct,
        quantity: 1
      }],
      totalItems: 1,
      totalPrice: 99.99
    };

    const actual = cartReducer(initialState, updateQuantity({ productId: 1, quantity: 3 }));
    
    expect(actual.items[0].quantity).toBe(3);
    expect(actual.totalItems).toBe(3);
    expect(actual.totalPrice).toBeCloseTo(299.97);
  });

  it('should clear the cart', () => {
    const initialState = {
      items: [{
        product: mockProduct,
        quantity: 2
      }],
      totalItems: 2,
      totalPrice: 199.98
    };

    const actual = cartReducer(initialState, clearCart());
    
    expect(actual.items).toHaveLength(0);
    expect(actual.totalItems).toBe(0);
    expect(actual.totalPrice).toBe(0);
  });
});


