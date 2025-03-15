import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the dialog state
interface DialogState {
  isOpen: boolean;
  dialogType: string | null;
}

const initialState: DialogState = {
  isOpen: false,
  dialogType: null,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.dialogType = action.payload;
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.dialogType = null;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
