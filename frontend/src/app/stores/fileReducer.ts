import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FileState {
  activeFileKey: string | null;
}

const initialState: FileState = {
  activeFileKey: null,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setActiveFileKey: (state, action: PayloadAction<string>) => {
      state.activeFileKey = action.payload;
    },
  },
});

export const { setActiveFileKey } = fileSlice.actions;
export const getActiveFileKey = (state: { file: FileState }) =>
  state.file.activeFileKey;
export const fileReducer = fileSlice.reducer;
