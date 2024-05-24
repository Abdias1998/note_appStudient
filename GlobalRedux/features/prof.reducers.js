import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk pour récupérer les professeurs
export const fetchProfs = createAsyncThunk("profs/fetchProfs", async (user) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_APP_PROF}/find`,
    {
      etat: user.etat,
      classe: user.classe,
      type: user.type,
      serie: user.serie,
      userId: user._id,
    }
  );
  return response.data;
});

const profSlice = createSlice({
  name: "profs",
  initialState: { profs: [], status: null },
  reducers: {
    addRating: (state, action) => {
      const { id, rating } = action.payload;
      const profIndex = state.profs.findIndex((prof) => prof._id === id);
      if (profIndex !== -1) {
        state.profs[profIndex].userRating = rating;
        state.profs[profIndex].averageRating = rating; // Mise à jour pour l'exemple, ajustez selon la logique réelle
      }
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.profs.find((prof) => prof._id === postId);
      if (post) {
        post.comments = [...post.comments, comment];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfs.fulfilled, (state, action) => {
        state.profs = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProfs.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addRating, addComment } = profSlice.actions;
export default profSlice.reducer;
