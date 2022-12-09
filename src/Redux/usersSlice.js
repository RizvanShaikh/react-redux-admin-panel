import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: [],
    userMaster: [],
  },
  reducers: {
    register: (state, action) => {
      if (
        action.payload.signupData.firstName === "" &&
        action.payload.signupData.lastName ===   "" &&
        action.payload.signupData.email ===  "" &&
        action.payload.signupData.password ===   ""
      ) {
        return;
      }
      state.user.push(action.payload.signupData);
    },

    userMaster: (state, action) => {
      if (
        action.payload.userData.firstName ===  "" &&
        action.payload.userData.lastName ===   "" &&
        action.payload.userData.email ===  ""
      ) {
        return;
      }
      action.payload.userData.id = uuidv4();
      state.userMaster.push(action.payload.userData);
    },

    deleteUser: (state, action) => {
      const userInstance = state.userMaster.filter((user) => {
        return user?.id !== action.payload.id;
      });
      state.userMaster = userInstance;
    },
  },
});

export const { register, userMaster, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
