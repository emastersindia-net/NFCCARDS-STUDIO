import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from '../config/apiUrl'

export const addImagetoProject = createAsyncThunk('data/addImagetoProject', async (formdata, thunkAPI) => {
    try {
        const res = await axios.post(`${baseurl}/upload-gallery-image`, formdata, {
            "Content-Type": 'multipart/form-data'
        });
        console.log(res.data.gallery.gallery);
        return res.data.gallery.gallery;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const fetchProjectImages = createAsyncThunk('data/fetchProjectImages', async (projectid, thunkAPI) => {
    try {
        const res = await axios.post(`${baseurl}/fetch-all-gallery`, {
            projectid: projectid
        });
        return res.data.gallery;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const deleteProjectImage = createAsyncThunk('data/delteProjectImage', async ({ imageid, projectid }, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/delete-gallery`, {
            id: imageid
        });
        console.log(projectid);
        thunkAPI.dispatch(fetchProjectImages(projectid));
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const imageSclice = createSlice({
    name: "images",
    initialState: {
        data: [],
        status: "idle",
        error: null
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(addImagetoProject.pending, (state) => {
            state.status = 'loading';
        }).addCase(addImagetoProject.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data.push(action.payload);
        }).addCase(addImagetoProject.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }).addCase(fetchProjectImages.pending, (state) => {
            state.status = 'loading';
        }).addCase(fetchProjectImages.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        }).addCase(fetchProjectImages.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
    }
});

export const { deleteImage } = imageSclice.actions;
export default imageSclice.reducer