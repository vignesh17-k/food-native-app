import { createSlice } from "@reduxjs/toolkit";

const Wishlist = createSlice({
  name: "wishlist",
  initialState: {
    wishlist_data: []
  },
  reducers: {
    set_wishlist: (state, { payload }) => {
      state.wishlist_data = payload;
    },
  },
});

export const { set_wishlist } = Wishlist.actions;
export default Wishlist.reducer;
