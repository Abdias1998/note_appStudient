"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducers from "./features/user.reducers";
import profReducers from "./features/prof.reducers";

export default configureStore({
  reducer: {
    user: userReducers, // Reducer de de l'utilisateur
    profs: profReducers, // Reducer de profs
  },
});
