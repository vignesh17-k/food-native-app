import { createSlice } from "@reduxjs/toolkit";

const Home = createSlice({
  name: "home",
  initialState: {
    section_data: []
  },
  reducers: {
    set_section_data: (state, { payload }) => {
      state.section_data = payload;
    },
    update_section_data: (state, { payload }) => {
      const { section_name = '', section_data = [] } = payload

      const upated_data = state?.section_data?.map((item) =>
        item.section === section_name
          ? { ...item, data: section_data }
          : item
      );

      state.section_data = upated_data;
    },
  },
});

export const { set_section_data, update_section_data } = Home.actions;
export default Home.reducer;
