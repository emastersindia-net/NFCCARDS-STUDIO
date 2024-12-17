import { createSlice } from "@reduxjs/toolkit";

const selectedNodeSlice = createSlice({
    name: "selectednode",
    initialState: null,
    reducers: {
        addEditingnodeId: (state, action) => {  
            return state = action.payload;
        },
        removeEditingnodeId: (state) => {
            return state = null;
        }
    }
})

export const { addEditingnodeId, removeEditingnodeId } = selectedNodeSlice.actions;
export default selectedNodeSlice.reducer;