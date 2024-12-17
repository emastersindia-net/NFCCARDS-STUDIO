import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "../config/apiUrl";

export const fetchBackground = createAsyncThunk('data/fetchBackground', async (id, thunkAPI) => {
    try {
        const response = await axios.post(`${baseurl}/fetch-project-details`, {
            id: id
        });
        return response.data.data.backgounds;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})

export const setBackgroundImage = createAsyncThunk('data/setBackground', async (formData, thunkAPI) => {
    try {
        const response = await axios.post(`${baseurl}/upload-background-image`, formData, {
           'Content-Type': "multipart/form-data"
        });
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})

export const updategradientData = createAsyncThunk('data/updategradientData', async (gradient, thunkAPI) => {
    try {
        const response = await axios.post(`${baseurl}/save-gradient-data`, {
            gradient
        });
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})

export const addnewColor = createAsyncThunk('data/addnewColor', async (formdata, thunkAPI) => {
    try {
        const resonse = await axios.post(`${baseurl}/create-color-code`, formdata, {
            'Content-Type': "multipart/form-data"
        });
        return resonse.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})

const backgroundSlice = createSlice({
    name: "background",
    initialState: {
        data: null,
        status: 'idle',
        error: null
    },
    reducers: {
        changeBackgroundColor: (state, action) => {
            const { value, side } = action.payload;
            console.log(value, side);
            if (side === 'front') {
                state.data.front.bgcolor = value;
            } else {
                state.data.back.bgcolor = value;
            }
        },
        changelinearGradientColor: (state, action) => {
            const { value, index, side } = action.payload;
            if (side === 'front') {
                state.data.front.gradient.colors[index].code = value;
            } else {
                state.data.back.gradient.colors[index].code = value;
            }
        },
        changeSpread: (state, action) => {
            const { value, index, side } = action.payload;
            if (side === 'front') {
                state.data.front.gradient.colors[index].spread = value;
            } else {
                state.data.back.gradient.colors[index].spread = value;
            }
        },
        addColorToGradient: (state, action) => {
            const side = action.payload;
            if (side === 'front') {
                state.data.front.gradient.colors.push({ code: "#ffffff", spread: 100 });
                const step = 100 / (state.data.front.gradient.colors.length - 1);
                state.data.front.gradient.colors.forEach((color, index) => {
                    color.spread = Math.round(index * step);
                });
            } else {
                state.data.back.gradient.colors.push({ code: "#ffffff", spread: 100 });
                const step = 100 / (state.data.back.gradient.colors.length - 1);
                state.data.back.gradient.colors.forEach((color, index) => {
                    color.spread = Math.round(index * step);
                });
            }
        },
        deleteColorFromGradient: (state, action) => {
            const { index, side } = action.payload;
            if (side === 'front') {
                const updatedColors = state.data.front.gradient.colors.filter((_, i) => i !== index);
                state.data.front.gradient.colors = updatedColors;
                const step = 100 / (state.data.front.gradient.colors.length - 1);
                state.data.front.gradient.colors.forEach((color, index) => {
                    color.spread = Math.round(index * step);
                });
            } else {
                const updatedColors = state.data.back.gradient.colors.filter((_, i) => i !== index);
                state.data.back.gradient.colors = updatedColors;
                const step = 100 / (state.data.front.gradient.colors.length - 1);
                state.data.front.gradient.colors.forEach((color, index) => {
                    color.spread = Math.round(index * step);
                });
            }
        },
        changeGradientDirection: (state, action) => {
            const { value, side } = action.payload;
            if (side === 'front') {
                state.data.front.gradient.direction = value;
            } else {
                state.data.back.gradient.direction = value;
            }
        },
        changeTypes: (state, action) => {
            const { value, side } = action.payload;
            if (side === 'front') {
                state.data.front.type = value;
            } else {
                state.data.back.type = value;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBackground.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchBackground.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
        }).addCase(fetchBackground.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Something went wrong';
        }).addCase(setBackgroundImage.pending, (state) => {
            state.status = "loading";
        }).addCase(setBackgroundImage.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
        }).addCase(setBackgroundImage.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Something went wrong';
        }).addCase(addnewColor.pending, (state) => {
            state.status = 'loading';
        }).addCase(addnewColor.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        }).addCase(addnewColor.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || 'Something went wrong';
        })
    }
})


export const { changeBackgroundColor, changelinearGradientColor, addColorToGradient, deleteColorFromGradient, changeGradientDirection, changeTypes, changeSpread } = backgroundSlice.actions;
export default backgroundSlice.reducer;