// dataSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseurl} from "../api";

const initialState = {
  projects: [],
  loading: false,
  error: null
};

const datasSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
        ////////console.log("state,action")
      state.projects = action.payload;
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
    const response = await axios.put(`${baseurl}/project/`);
    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export default datasSlice.reducer;


