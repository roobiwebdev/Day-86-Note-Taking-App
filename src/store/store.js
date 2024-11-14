import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice';
import dialogReducer from './dialogSlice';
import { loadState, saveState } from '../utils/localStorage';
import throttle from 'lodash/throttle';
import authReducer, { checkAuth } from './authSlice';
import themeReducer from './themeSlice';

const persistedState = loadState();


const store = configureStore({
    reducer: {

        note: noteReducer,
        dialog: dialogReducer,
        auth: authReducer,
        theme: themeReducer,
    },
    preloadedState: persistedState, // Load the persisted state

});

store.subscribe(throttle(() => {
    saveState({
        note: store.getState().note, // Save the note slice state
        auth: store.getState().auth, // Save the auth slice state
        theme: store.getState().theme, // Save the theme slice state
    });
}, 1000));

store.dispatch(checkAuth()); // Check if the user is authenticated

export default store;