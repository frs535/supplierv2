import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light", //dark
    //userId: null, //"63701cc1f03239b7f700000e",
    user: null,
    token: null,
    post: [],
    //e commerce
    isCartOpen: false,
    catalog: [],
    cart: [],
    items: [],
};

export const globalSlice = createSlice({
    initialState, //auth,
    name: "global",
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setPosts: (action, state) => {
            state.posts = action.payload.posts;
        },
        setPost : (action, state) => {
            const  updatePosts = state.posts.map((post) => {
                if ((post._id === action.payload.post_id)) return action.payload.post;

                return  post;
            });
            state.posts = updatePosts;
        },
        //E COMMERCE
        setCatalog: (state, action)=>{
            state.catalog = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item];
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },
        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }
                return item;
            });
        },
        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item;
            });
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
    },
});

export const {
    setMode,
    setLogin,
    setLogout,
    setIsCartOpen,
    decreaseCount,
    increaseCount,
    removeFromCart,
    addToCart,
    setItems,
    setCatalog,} = globalSlice.actions;

export default globalSlice.reducer;