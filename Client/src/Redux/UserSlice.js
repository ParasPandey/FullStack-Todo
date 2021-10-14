import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  //redux initial state
  initialState: {
    user: null,
    token: null,
    todoList: [],
    notes: [],
    showTodo: true,
    left_box: true,
  },
  //   reducers
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    addToTodoList: (state, action) => {
      state.todoList = [action.payload.newTodo, ...state.todoList];
    },
    initializeTodoList: (state, action) => {
      state.todoList = action.payload.todo;
    },
    logout: (state) => {
      state.user = null;
    },
    setShowTodo: (state, action) => {
      state.showTodo = action.payload.showTodo;
    },
    addNotes: (state, action) => {
      state.notes = [action.payload.newNotes, ...state.notes];
    },
    initializeNotes: (state, action) => {
      state.notes = action.payload.notes;
    },
    setLeftBox: (state, action) => {
      state.left_box = action.payload.left_box;
    },

    //   setSignIn: (state, action) => {
    //     state.user.signIn = action.payload.signIn;
    //   },
    //   setProfile: (state, action) => {
    //     state.user.profile = action.payload.profile;
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
  addToTodoList,
  initializeTodoList,
  setShowTodo,
  addNotes,
  initializeNotes,
  setLeftBox
} = userSlice.actions;
export const selectuser = (state) => state.user.user;
export const selectTodoList = (state) => state.user.todoList;
export const selectNotes = (state) => state.user.notes;
export const selectToken = (state) => state.user.token;
export const selectShowTodo = (state) => state.user.showTodo;
export const selectLeftBox = (state) => state.user.left_box;
export default userSlice.reducer;
