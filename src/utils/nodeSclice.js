import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "../config/apiUrl";


export const addImageNodeToProject = createAsyncThunk('data/addImageNode', async (formData, thunkAPI) => {
    try {
        const res = await axios.post(`${baseurl}/addimagenode`, formData, {
            "Content-Type": "multipart/form-data"
        });
        return res.data.node;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const fetchAllNodes = createAsyncThunk("data/fetchAllNodes", async (projectid, thunkAPI) => {
    try {
        const res = await axios.post(`${baseurl}/fetch-all-nodes`, {
            projectid: projectid
        });
        return res.data.node;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const deleteNodeFromProject = createAsyncThunk("data/deleteNodeFromProject", async (nodeid, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/delete-node`, {
            id: nodeid
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const resizeImageNode = createAsyncThunk('data/resizeImageNode', async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/updateimagenode`, formdata, {
            "Content-Type": 'multipart/form-data'
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.value);
    }
})

export const updateNodePosition = createAsyncThunk("data/updateNodePosition", async (stringVal, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-position`, {
            obj: stringVal
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const addTextNodeToProject = createAsyncThunk("data/addTextNodeToProject", async ({ cardside, projectid }, thunkAPI) => {
    try {
        const res = await axios.post(`${baseurl}/save-text-node`, {
            cardside: cardside,
            projectid: projectid
        });
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const nodeTextWidthUpdate = createAsyncThunk("data/", async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-width`, formdata, {
            "Content-Type": 'multipart/form-data'
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const nodeTextUpdate = createAsyncThunk("data/nodeTextUpdate", async (formData, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-text`, formData, {
            "Content-Type": "multipart/form-data"
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const changeFontsize = createAsyncThunk("data/changeFontsize", async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-text-size`, formdata, {
            "Content-Type": "multipart/form-data"
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const changeFontFamilyToProject = createAsyncThunk("data/changeFontFamilyToProject", async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-text-family`, formdata, {
            "Content-Type": "multipart/form-data"
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const changeLetterSpacing = createAsyncThunk("data/changeLetterSpacing", async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-text-lspacing`, formdata, {
            "content-Type": 'multipart/form-data'
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const changeTextColor = createAsyncThunk('data/changeTextColor', async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-text-color`, formdata, {
            "Content-Type": "content-type"
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const changeFontWeight = createAsyncThunk("data/changeFontWeight", async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-text-fweight`, formdata, {
            "Content-Type": "multipart/form-data"
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const changeFontStyle = createAsyncThunk("data/changeFontStyle", async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-text-fstyle`, formdata, {
            'Content-Type': 'multipart/form-data'
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const changeTextDecoration = createAsyncThunk("data/changeTextDecoration", async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-text-tdecoration`, formdata, {
            "Content-Type": 'multipart/form-data'
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const changeTextAlignToProject = createAsyncThunk("data/changeTextAlignToProject", async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-text-talign`, formdata, {
            "Content-Type": "multipart/form-data"
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const changeObjectFit = createAsyncThunk("data/changeObjectFit", async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-text-ofit`, formdata, {
            'Content-Type': "multipart/form-data"
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const changeBorderRadius = createAsyncThunk("data/changeBorderRadius", async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-text-bradius`, formdata, {
            "content-Type": "multipart/form-data"
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const addShapeToProject = createAsyncThunk("data/addShapeToProject", async ({ projectid, cardside, shapetype }, thunkAPI) => {
    try {
        const res = await axios.post(`${baseurl}/save-node-shape`, {
            projectid,
            cardside,
            shapetype
        });
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const changeBackgroundColor = createAsyncThunk('data/changeBackgroundColor', async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-bgcolor`, formdata, {
            "Content-Type": "multipart/form-data"
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const changeOpacity = createAsyncThunk("data/changeOpacity", async (formdata, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-node-opacity`, formdata, {
            "Content-Type": "multipart/form-data"
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const addLogoText = createAsyncThunk("data/addLogoText", async ({ cardside, projectid }, thunkAPI) => {
    try {
        const res = await axios.post(`${baseurl}/save-node-logo-text`, {
            cardside,
            projectid
        });
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const addImageToLogoText = createAsyncThunk("data/addImageToLogoText", async ({ formData, projectid }, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/upload-node-logo-text-image`, formData, {
            "Content-Type": "multipart/form-data"
        });
        thunkAPI.dispatch(fetchAllNodes(projectid));
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const addIconText = createAsyncThunk("data/addIconText", async ({ cardside, projectid }, thunkAPI) => {
    try {
        const res = await axios.post(`${baseurl}/add-icon-text`, {
            cardside,
            projectid
        });
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const changeIcon = createAsyncThunk("data/changeIcon", async ({ nodeid, svg, paths, viewbox, fill, type, pathfill }, thunkAPI) => {
    try {
        await axios.post(`${baseurl}/update-icon-svg`, {
            nodeid,
            svg,
            paths: JSON.parse(paths),
            viewbox,
            fill,
            type,
            pathfill
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const duplicateLayer = createAsyncThunk("data/duplicateLayer", async (formdata, thunkAPI) => {
    try {
        const res = await axios.post(`${baseurl}/clone-the-node`, formdata, {
            "Content-Type": "multipart/form-data"
        });
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const addQrNode = createAsyncThunk("data/addQrNode", async (formdata, thunkAPI) => {
    try {
        const res = await axios.post(`${baseurl}/addqrnode`, formdata, {
            'Content-Type': "multipart/form-data"
        });
        return res.data.node;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const nodeSlice = createSlice({
    name: "node",
    initialState: {
        data: [],
        status: "idle",
        error: null
    },
    reducers: {
        updateNodePositions: (state, action) => {
            const { updates } = action.payload;
            updates.forEach((update) => {
                const node = state.data.find((node) => node.id === update.id);
                if (node) {
                    node.x = update.x;
                    node.y = update.y;
                }
            });
        },
        deleteNode: (state, action) => {
            const id = action.payload;
            const filteredData = state.data.filter(item => item.id !== id);
            state.data = filteredData;
        },
        editNodeText: (state, action) => {
            const { id, value } = action.payload;
            state.data.find(item => item.id === id).text = value;
        },
        updateNodeWidth: (state, action) => {
            const { id, width } = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.width = width;
            }
        },
        updateNodeDimension: (state, action) => {
            const { id, width, height } = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.width = width;
                node.height = height;
            }
        },
        increaseFontsize: (state, action) => {
            const { id, height } = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.height = height,
                node.styles = {
                    ...node.styles,
                    fsize: node.styles.fsize < 90 ? node.styles.fsize + 1 : 90,
                    lheight: node.styles.fsize + 5
                }
            }
        },
        increaseletterSpacing: (state, action) => {
            const id = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    lspacing: node.styles.lspacing < 10 ? node.styles.lspacing + 1 : 10,
                }
            }
        },
        decreaseFontSize: (state, action) => {
            const { id, height } = action.payload;       
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.height = height,
                node.styles = {
                    ...node.styles,
                    fsize: node.styles.fsize > 14 ? node.styles.fsize - 1 : 14 
                }
            }
        },
        decreaseletterSpacing: (state, action) => {
            const id = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    lspacing: node.styles.lspacing > -1 ? node.styles.lspacing - 1 : -1,
                }
            }
        },
        changeColor: (state, action) => {
            const { id, color } = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    color: color
                }
            }
        },
        toogleBold: (state, action) => {
            const id = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    fweight: node.styles.fweight === 400 ? 700 : 400
                }
            }
        },
        toogleItalic: (state, action) => {
            const id = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    fstyle: node.styles.fstyle === 'normal' ? 'italic' : 'normal'
                }
            }
        },
        toogleTextDecoration: (state, action) => {
            const id = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    tdecoration: node.styles.tdecoration === 'none' ? 'underline' : 'none' 
                }
            }
        },
        changeTextAlign: (state, action) => {
            const { id, value } = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    talign: value
                }
            }
        },
        changeFontFamily: (state, action) => {
            const { id, value } = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    ffamily: value
                }
            }
        },
        updateObjectFit: (state, action) => {
            const { id, value } = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.styles.ofit = value;
            }
        },
        increaseBorderRadius: (state, action) => {
            const id = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    bradius: Math.min(node.styles.bradius + 10, 100)
                }
            }
        },
        decreaseBorderRadius: (state, action) => {
            const id = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    bradius: Math.max(node.styles.bradius - 10, 0)
                }
            }
        },
        increaseBorderRadiusofShapes: (state, action) => {
            const id = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    bradius: node.styles.bradius + 1
                }
            }
        },
        decreaseBorderRadiusofShapes: (state, action) => {
            const id = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    bradius: Math.max(node.styles.bradius - 1, 0)
                }
            }
        },
        changeBackgroundcolorofShape: (state, action) => {
            const { id, value } = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    bgcolor: value
                }
            }
        },
        increaseOpacityofShape: (state, action) => {
            const id = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    opacity: Math.min(node.styles.opacity + 10, 100)
                }
            }
        },
        decreaseOpacityofShape: (state, action) => {
            const id = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    opacity: Math.max(node.styles.opacity - 10, 0)
                }
            }
        },
        changeCompanyLogoforMagicText: (state, action) => {
            const { id, image } = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                node.image = image;
            }
        },
        changeCompanyNameforMagicText: (state, action) => {
            const { id, value } = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                node.text = value;
            }
        },
        makeNameClose: (state, action) => {
            const id = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    mtop: Math.max(node.styles.mtop - 1, -20)
                }
            }
        },
        makeNameFar: (state, action) => {
            const id = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                node.styles = {
                    ...node.styles,
                    mtop: Math.min(node.styles.mtop + 1, 0)
                }
            }
        },
        changeIconofMagicText: (state, action) => {
            const { id, svg, paths, viewbox, fill, type, pathfill } = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                node.icon.svg = svg;
                node.icon.paths = paths;
                node.icon.viewbox = viewbox;
                node.icon.fill = fill;
                node.icon.type = type;
                node.icon.pathfill = pathfill;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addImageNodeToProject.pending, (state) => {
            state.status = 'loading';
        }).addCase(addImageNodeToProject.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data.push(action.payload);
        }).addCase(addImageNodeToProject.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }).addCase(fetchAllNodes.pending, (state) => {
            state.status = 'loading';
        }).addCase(fetchAllNodes.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        }).addCase(fetchAllNodes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }).addCase(addTextNodeToProject.pending, (state) => {
            state.status = 'loading';
        }).addCase(addTextNodeToProject.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data.push(action.payload);
        }).addCase(addTextNodeToProject.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }).addCase(addShapeToProject.pending, (state) => {
            state.status = 'loading';
        }).addCase(addShapeToProject.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data.push(action.payload);
        }).addCase(addShapeToProject.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }).addCase(addLogoText.pending, (state) => {
            state.status = 'loading';
        }).addCase(addLogoText.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data.push(action.payload);
        }).addCase(addLogoText.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }).addCase(addIconText.pending, (state) => {
            state.status = 'loading';
        }).addCase(addIconText.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data.push(action.payload);
        }).addCase(duplicateLayer.pending, (state) => {
            state.status = 'loading';
        }).addCase(duplicateLayer.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data.push(action.payload);
        }).addCase(duplicateLayer.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }).addCase(addQrNode.pending, (state) => {
            state.status = "loading";
        }).addCase(addQrNode.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data.push(action.payload);
        }).addCase(addQrNode.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
    }
});

export const { updateNodePositions, deleteNode, editNodeText, updateNodeWidth, increaseFontsize, decreaseFontSize, changeColor, toogleBold, toogleItalic, toogleTextDecoration, changeTextAlign, increaseletterSpacing, decreaseletterSpacing, changeFontFamily, updateNodeDimension, updateObjectFit, increaseBorderRadius, decreaseBorderRadius, increaseBorderRadiusofShapes, changeBackgroundcolorofShape, increaseOpacityofShape, decreaseOpacityofShape, decreaseBorderRadiusofShapes, changeCompanyLogoforMagicText, changeCompanyNameforMagicText, makeNameClose, makeNameFar, changeIconofMagicText } = nodeSlice.actions; 
export default nodeSlice.reducer;