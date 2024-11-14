import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
    name: "dialog",
    initialState: {
        isOpen: false,
        dialogType: null,
    },
    reducers: {
        openDialog: (state, action) => {
            state.isOpen = true;
            state.dialogType = action.payload;
        },
        closeDialog: (state) => {
            state.isOpen = false;
            state.dialogType = null;
        }
    }
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;