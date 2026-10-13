import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cartSlice",
    initialState : {
       cartItems : JSON.parse(localStorage.getItem("cartData")) || []
    },
    reducers : {
        addToCart: (state,action) => {
            const {newItem} = action.payload;
            //  setCartData((prev) => [...prev, newItem]);
            state.cartItems.push(newItem);
             localStorage.setItem("cartData",JSON.stringify(state.cartItems)
    );
        },
        deleteCart: (state,action) => {
          state.cartItems = action.payload;
        localStorage.setItem("cartData", JSON.stringify(action.payload));

        },
        clearCart: (state) => {
           state.cartItems = [];
           localStorage.removeItem("cartData");
        },
    },
})

export const {addToCart,deleteCart,clearCart} = cartSlice.actions;

export default cartSlice.reducer;