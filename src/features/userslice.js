// dataSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseurl} from "../../api";

const initialState = {
  user1: [],
  loading: false,
  error: null
};

const datasSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
        // console.log(action.payload)
      state.user1 = action.payload;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = datasSlice.actions;

export const fetchAsyncData = () => async (dispatch) => {
  dispatch(fetchDataStart());
  try {

    const response = await axios.get(`${baseurl}/user`);
    // console.log(response.data)
    dispatch(fetchDataSuccess(response.data));
    return response.data;
  } catch (error) {
    console.log(error)
    dispatch(fetchDataFailure(error.message));
  }
};

export default datasSlice.reducer;


