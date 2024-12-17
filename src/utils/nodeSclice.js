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

const nodeSlice = createSlice({
    name: "node",
    initialState: {
        data: [],
        status: "idle",
        error: null
    },
    reducers: {
        addNode: (state, action) => {
            const { cardside, nodetype } = action.payload;
            const newNode = {
                id: Date.now(),
                cardside: cardside,
                nodetype: nodetype,
                x: 50,
                y: 50,
                width: 200,
                height: 44,
                styles: {
                    color: "#000000",
                    ffamily: "Open Sans",
                    fsize: 14,
                    fweight: 400,
                    lheight: 18,
                    lspacing: 0,
                    fstyle: "normal",
                    tdecoration: 'none',
                    talign: "left",
                    zindex: 1
                },
                text: "Your Text Field"
            };
            state.data.push(newNode);
        },
        addImageNode: (state, action) => {
            const { cardside, image, width, height } = action.payload;
            const newNode = {
                id: Date.now(),
                cardside: cardside,
                nodetype: "image",
                x: 50,
                y: 50,
                width: width,
                height: height,
                styles: {
                    ofit: "cover",
                    bradius: 0,
                    bwidth: 0,
                    bcolor: "#000000",
                    bstyle: "solid"
                },
                image: image,
            }
            state.data.push(newNode);
        },
        updateNodePositions: (state, action) => {
            const { updates } = action.payload;
            updates.forEach((update) => {
                const node = state.data.find((node) => node.id === update.id);
                if (node) {
                    node.x = update.newX;
                    node.y = update.newY;
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
            const id = action.payload;
            const node = state.data.find((item) => item.id === id);
            if (node) {
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
            const id = action.payload;        
            const node = state.data.find((item) => item.id === id);
            if (node) {
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
                    lspacing: node.styles.lspacing > -1 ? node.styles.lspacing - 1 : -1 ,
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
        addASquareShape: (state, action) => {
            const cardside = action.payload;
            const newNode = {
                id: Date.now(),
                cardside: cardside,
                nodetype: "shape",
                x: 50,
                y: 50,
                width: 100,
                height: 100,
                styles: {
                    bradius: 0,
                    bwidth: 0,
                    bcolor: "#000000",
                    bstyle: "solid",
                    bgcolor: "#dddddd",
                    opacity: 100
                },
                shapetype: "square",
            }
            state.data.push(newNode);
        },
        addARectangleShape: (state, action) => {
            const cardside = action.payload;
            const newNode = {
                id: Date.now(),
                cardside: cardside,
                nodetype: "shape",
                x: 50,
                y: 50,
                width: 300,
                height: 100,
                styles: {
                    bradius: 0,
                    bwidth: 0,
                    bcolor: "#000000",
                    bstyle: "solid",
                    bgcolor: "#dddddd",
                    opacity: 100
                },
                shapetype: "rectangle",
            }
            state.data.push(newNode);
        },
        addACircleShape: (state, action) => {
            const cardside = action.payload;
            const newNode = {
                id: Date.now(),
                cardside: cardside,
                nodetype: "shape",
                x: 50,
                y: 50,
                width: 100,
                height: 100,
                styles: {
                    bradius: 100,
                    bwidth: 0,
                    bcolor: "#000000",
                    bstyle: "solid",
                    bgcolor: "#dddddd",
                    opacity: 100
                },
                shapetype: "circle",
            }
            state.data.push(newNode);
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
        addCompanylogoNode: (state, action) => {
            const cardside = action.payload;
            const newObj = {
                id: Date.now(),
                cardside: cardside,
                nodetype: "magictext",
                x: 50,
                y: 50,
                width: 210,
                height: 150,
                image: "",
                text: "Your Company Name",
                styles: {
                    fsize: 20,
                    fweight: 700,
                    ffamily: "Open Sans",
                    lheight: 24,
                    color: "#000000",
                    lspacing: 0,
                    fstyle: "normal",
                    tdecoration: 'none',
                    mtop: 0
                },
                textposition: "bottom-center",
                type: "logo-text",
            }
            state.data.push(newObj);
        },
        addMagicContact: (state, action) => {
            const cardside = action.payload;
            const newObj = {
                id: Date.now(),
                cardside: cardside,
                nodetype: "magictext",
                x: 50,
                y: 50,
                width: 210,
                height: 66,
                icon: {
                    svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                </svg>`,
                    width: 45,
                    height: 45,
                    color: '#000000',
                    bwidth: 0,
                    bstyle: "solid",
                    bcolor: "#000000",
                    bradius: 0

                },
                text: "Your contact",
                styles: {
                    fsize: 20,
                    fweight: 400,
                    ffamily: "Open Sans",
                    lheight: 24,
                    color: "#000000",
                    lspacing: 0,
                    fstyle: "normal",
                    tdecoration: 'none',
                },
                textposition: "right-center",
                type: "icon-text",
            }
            state.data.push(newObj);
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
            const { id, svg } = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                node.icon.svg = svg;
            }
        },
        duplicateLayerFront: (state, action) => {
            const id = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                const newNode = {
                    ...node,
                    id: Date.now(),
                    cardside: 'front'
                }
                state.push(newNode);
            }
        },
        duplicateLayerBack: (state, action) => {
            const id = action.payload;
            const node = state.data.find(item => item.id === id);
            if (node) {
                const newNode = {
                    ...node,
                    id: Date.now(),
                    cardside: 'back'
                }
                state.push(newNode);
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
        })
    }
});

export const { addNode, updateNodePositions, deleteNode, editNodeText, updateNodeWidth, increaseFontsize, decreaseFontSize, changeColor, toogleBold, toogleItalic, toogleTextDecoration, changeTextAlign, increaseletterSpacing, decreaseletterSpacing, changeFontFamily, addImageNode, updateNodeDimension, updateObjectFit, increaseBorderRadius, decreaseBorderRadius, addASquareShape, addARectangleShape, increaseBorderRadiusofShapes, changeBackgroundcolorofShape, increaseOpacityofShape, decreaseOpacityofShape, decreaseBorderRadiusofShapes, addACircleShape, addCompanylogoNode, changeCompanyLogoforMagicText, changeCompanyNameforMagicText, makeNameClose, makeNameFar, addMagicContact, changeIconofMagicText, duplicateLayerFront, duplicateLayerBack } = nodeSlice.actions; 
export default nodeSlice.reducer;