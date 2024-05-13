import { createSlice } from "@reduxjs/toolkit";

export const profsSlice = createSlice({
  name: "profs",
  initialState: {
    profs: [],
  },
  reducers: {
    /**Récuperer touts les profs */
    getAllprofs: (state, { payload }) => {
      state.profs = payload;
    },
    /**Ajouter une profs */
    addprofs: (state, { payload }) => {
      state.profs?.push(payload);
    },
    deleteprofs: (state, { payload }) => {
      state.profs = state.profs.filter((post) => post._id !== payload);
    },
  },
});

export const { getAllprofs, addprofs } = profsSlice.actions;
export default profsSlice.reducer;
