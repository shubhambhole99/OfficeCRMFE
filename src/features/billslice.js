

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseurl} from "../api";

let initialState = {
  bills: [],
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
        // ////////////////console.log(action.payload)
      state.bills = action.payload;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = datasSlice.actions;

export const getbill = (bool) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    let body={
      isDisabled:bool
    }
    
    const response = await axios.put(`${baseurl}/income/`,body);
    ////////////console.log(response.data,"billlllllllllllllllllllllllls")
    // initialState.bills=response.data.data
    dispatch(fetchDataSuccess(response.data.data));
    // resolve(response.data.data)
   
    return response.data.data
    
  } catch (error) {
    ////////////////console.log(error)
    dispatch(fetchDataFailure(error.message));
  }
};

export const disableBill = (body) => async (dispatch) => {
  ////////console.log(body)
  try {
    ////////////console.log(body)

    const response = await axios.delete(`${baseurl}/income/${body}`);
    
  } catch (error) {
  }
};

export default datasSlice.reducer;


