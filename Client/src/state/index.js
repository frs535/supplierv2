import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light", //dark
    //userId: null, //"63701cc1f03239b7f700000e",
    user: null,
    token: null,
    post: [],

    //e commerce
    isCartOpen: false,
    //catalog: [],
    cart: [],
    orderDetail: {
        organisation: null,
        delive: false,
        deliveryAdress: "",
        deliverComment: "",
        deliveryDate: "",
        comment: ""
    },
    //items: [],
    price: [],
    warehouses: [],
    typeofPrice: [],
    partner: null,
};

export const globalSlice = createSlice({
    initialState,
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

        setWarehouses: (state, action) =>{
            state.warehouses = action.payload;
        },

        setTypeofPrice: (state, action)=>{
            state.typeofPrice = action.payload;
        },

        setPartner: (state, action)=>{
            state.partner = action.payload;
        },

        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item];
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },
        setValueToCart: (state, action)=>{

            if(action.payload.value < 0) return;

            const cart = state.cart.find((item)=> item? item.id === action.payload.item.id  && item.wh == action.payload.wh: false);

            if (action.payload.value === 0 && !cart) return;

            if (!cart)
            {
                state.cart = [...state.cart, {
                    catalog:action.payload.item,
                    id: action.payload.item.id,
                    order: action.payload.value,
                    images: action.payload.images,
                    wh: action.payload.wh,
                    price: action.payload.price,
                }];
                return;
            }

            if (action.payload.value ===0)
            {
                const index = state.cart.indexOf(cart);
                if (index > -1) { // only splice array when item is found
                    state.cart.splice(index, 1); // 2nd parameter means remove one item only
                }
                return;
            }

            console.log(`Before ${cart.order}`);
            cart.order = action.payload.value;
            console.log(`After ${cart.order}`);
        },
        increaseCount: (state, action) => {
            const result = state.cart.filter(item=>{ return item.catalog.id === action.payload.id });

            //action.payload.order = action.payload.order + 1;
            if (result.length ===0)
            {
                state.cart.push({quantity: 1, catalog: action.payload});
                return;
            }

            result[0].quantity = action.payload.order;
        },
        decreaseCount: (state, action) => {

            if (action.payload.order<=0) return;

            action.payload.order = action.payload.order - 1;

            const result = state.cart.filter(item=>{ return item.catalog.id === action.payload.id });
            if (result.length === 0) return;

            result[0].quantity = action.payload.order;
        },

        getQuantity: (state, action) =>{
            const result = state.cart.filter(item=>{ return item.id === action.payload.id });
            if (!result) return 0;

            return  result.reduce((accumulator, currentValue) => accumulator + currentValue.order, 0);
        },

        setOrganisation: (state, action)=>{
            state.orderDetail.organisation = action.payload
        },

        setDelive: (state, action)=>{
            state.orderDetail.delive = action.payload
        },

        setDeliveryAdress: (state, action)=>{
            state.orderDetail.deliveryAdress = action.payload
        },

        setDeliveryComment: (state, action)=>{
            state.orderDetail.deliverComment = action.payload
        },

        setOrderComment: (state, action)=>{
            state.orderDetail.comment = action.payload
        },

        setDeliveryDate: (state, action)=>{
            state.orderDetail.deliveryDate = action.payload
        },

        clearBag: (state)=>
        {
            state.cart = []
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
    setCatalog,
    clearBag,
    setValueToCart,
    getQuantity,
    setWarehouses,
    setTypeofPrice,
    setPartner,
    setOrganisation,
    setDelive,
    setDeliveryAdress,
    setDeliveryComment,
    setOrderComment,
    setDeliveryDate,} = globalSlice.actions;

export default globalSlice.reducer;