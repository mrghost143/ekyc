import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@shared/reducer/index.js';

const store = configureStore({
    reducer: rootReducer,
});
export default store;
