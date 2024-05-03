// dataSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseurl} from "../../api";

const initialState = {
  data: [],
  loading: false,
  error: null
};

const dataSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
        console.log("state,action")
      state.data = action.payload;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;

export const deletetasks = (data) => async (dispatch) => {
console.log(data)
  dispatch(fetchDataStart());
  try {
    const response = await axios.delete(`${baseurl}/task/${data}`);
    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export default dataSlice.reducer;


