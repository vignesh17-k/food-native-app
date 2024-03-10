import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
  name: "user",
  initialState: {
    session: {},
  },
  reducers: {
    setSession: (state, { payload }) => {
      state.session = payload;
    },
  },
});

export const { setSession } = User.actions;
export default User.reducer;
