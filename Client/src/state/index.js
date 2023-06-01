import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark", //light
    userId: null, //"63701cc1f03239b7f700000e",
    token: null,
    post: [],
};

export const globalSlice = createSlice({
    initialState, //auth,
    name: "global",
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
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
    }
});

export const { setMode, setLogin, setLogout } = globalSlice.actions;

export default globalSlice.reducer;