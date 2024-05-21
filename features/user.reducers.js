import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: false,
  },
  reducers: {
    /**Récuperer les données de l'user */
    setGetUser: (state, { payload }) => {
      state.user = payload;
    },
    setgetUnique: (state, { payload }) => {
      state.user = payload;
    },
    setGetSouscription: (state, { payload }) => {
      state.user = payload;
    },
    /**Déconnexion de l'utilisateur */
    logOut: (state, { payload }) => {
      state.user = true;
    },
    logOutSession: (state, { payload }) => {
      state.user = true;
    },
    /**Modification du profil de l'user */
    updateProfil: (state, { payload }) => {
      state.user.push(payload);
    },
    /**Télécharger un fichier par l'utilisateur */
    uploadPicture: (state, { payload }) => {
      return {
        ...state,
        picture: payload,
      };
      // state.user.push(payload);
    },
  },
});

export const {
  setGetUser,
  setgetUnique,
  logOut,
  uploadPicture,
  updateProfil,
  setGetSouscription,
  logOutSession,
} = userSlice.actions;
export default userSlice.reducer;
