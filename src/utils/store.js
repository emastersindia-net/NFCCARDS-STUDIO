import { configureStore } from "@reduxjs/toolkit";
import nodeReducer from './nodeSclice';
import selectedNodeReducer from './selectedNodeSlice';
import backgroundReducer from './backgroundSlice';
import imageReducer from './imageSlice';

const store = configureStore({
    reducer: {
        node: nodeReducer,
        selectednode: selectedNodeReducer,
        background: backgroundReducer,
        images: imageReducer
    }
});

export default store;