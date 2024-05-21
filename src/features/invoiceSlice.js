// dataSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseurl} from "../api";

const initialState = {
  invoices: [],
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
        // ////////console.log(action.payload)
      state.invoices = action.payload;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = datasSlice.actions;

export const getinvoice = () => async (dispatch) => {
  dispatch(fetchDataStart());
  try {

    const response = await axios.put(`${baseurl}/invoice/`);
    // //////console.log(response.data)
    dispatch(fetchDataSuccess(response.data));
    // return response.data;
  } catch (error) {
    ////////console.log(error)
    dispatch(fetchDataFailure(error.message));
  }
};

export default datasSlice.reducer;


