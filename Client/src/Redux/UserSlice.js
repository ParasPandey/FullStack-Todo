import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  //redux initial state
  initialState: {
    user: null,
    token : null,
    basket: [],
  },
  //   reducers
  reducers: {
    login: (state, action) => {
      console.log( action.payload)
      state.user = action.payload;
    },
    setToken: (state, action) => {
      console.log( action.payload)
      state.token = action.payload.token;
    },
  //   setSignIn: (state, action) => {
  //     state.user.signIn = action.payload.signIn;
  //   },
  //   setProfile: (state, action) => {
  //     state.user.profile = action.payload.profile;
  //   },
  //   logout: (state) => {
  //     state.user = null;
  //   },
  //   addToBasket: (state, action) => {
  //     state.basket = [...state.basket, action.payload.product];
  //   },
  //   initializeBasket: (state, action) => {
  //     state.basket = action.payload.item;
  //   },
  //   emptyBasket: (state, action) => {
  //     state.basket = [];
  //   },
  //   deleteFromBasket: (state, action) => {
  //     let newBasket = [...state.basket];
  //     let index;
  //     newBasket.map((item, i) => {
  //       if (item.id === action.payload.id) {
  //         index = i;
  //       }
  //       return index;
  //     });
  //     newBasket.splice(index, 1);
  //     state.basket = newBasket;
  //   },
  },
});
export const {
  login,
  setToken,
  logout,
  addToBasket,
  deleteFromBasket,
  initializeBasket,
  setSignIn,
  setProfile,
  emptyBasket,
} = userSlice.actions;
export const selectuser = (state) => state.user.user;
export const selectbasket = (state) => state.user.basket;
export default userSlice.reducer;
