import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

// TO GET ALREADY ADDED TO CART PRODUCTS FROM COOKIES
const initialState = {
  cart: Cookies.get('cart')
    ? //   TO COVERT A STRING FROM THE COOKIES TO A JAVASCRIPT OBJECT
      JSON.parse(Cookies.get('cart'))
    : { cartItems: [], shippingAddress: {}},
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      // SAVE THE SELECTED PRODUCT TO THE COOKIES
      // AND IT HAS TO BE SAVE AS STRING
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      // THIS RETUNR ALL ITEMS EXCEPT THE ONE THAT IS PASSED AS SLUG
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      // KEEP THE PREVIOUS STATE, IN THE CART, KEEP THE PREVIOUS STATE
      // AND PASS THE CARTITEMS AS A PARAMETER
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_RESET': {
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };
    }
    case "SAVE_SHIPPING_ADDRESS" :{
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress:{
            ...state.cart.shippingAddress,
            ...action.payload,
          }
        }
      }
    }
    case "CART_CLEAR_ITEMS" : {
      return {...state, cart: {...state.cart, cartItems: []}}
    }
    case "SAVE_PAYMENT_METHOD" : {
      return {
        ...state,
        cart: {
          ...state.cart,
         paymentMethod: action.payload
        }
      }
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
