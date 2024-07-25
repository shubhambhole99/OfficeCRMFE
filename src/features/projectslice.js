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
        ////////////////console.log("state,action")
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

export const fetchProjects = (body) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    // //////console.log(body)
    if(body.isDisabled==undefined){
    body.isDisabled=false
    }
    const response = await axios.put(`${baseurl}/project/`,body);
    dispatch(fetchDataSuccess(response.data));
    let proj=[]
    for(let i=0;i<(response.data).length;i++){
      proj[i]=(response.data)[i]
    }
    proj.sort((a1, b1) => a1.name?.localeCompare(b1.name));
    // //////console.log(proj)
    return proj
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};


export const importquestions = (id) => async (dispatch) => {
  // dispatch(fetchDataStart());
  try {
    //console.log(id)

  await axios.put(`${baseurl}/project/imquestion/${id}`);
   
  
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export default datasSlice.reducer;


