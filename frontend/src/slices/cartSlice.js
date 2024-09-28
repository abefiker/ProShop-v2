import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducer: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItems = state.cartItems.find((x) => x._id === item._id);
      if (existItems) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItems._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //calculate item price
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      //calculate shipping price (if order is over $100 then free, else $10 shipping)
      state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);
      //calculate tax price (15% of total price)
      state.taxPrice = addDecimals(Number(state.itemPrice * 0.15).toFixed(2));
      //calculate total price (item price + shipping price + tax price)
      state.totalPrice = addDecimals(
        Number(state.itemPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      );
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
