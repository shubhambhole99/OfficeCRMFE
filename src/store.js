
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Import Redux Thunk middleware
import userReducer from './features/userslice';
import taskReducer from './features/taskslice';
import projectReducer from './features/projectslice';
import taskhistoryslice from './features/taskhistoryslice';
import contactReducer from './features/contactslice';

const store = configureStore({
  reducer: {
    users: userReducer,
    task: taskReducer,
    taskhistoryslice:taskhistoryslice,
    project:projectReducer,
    contact:contactReducer

  },
});


export default store;

