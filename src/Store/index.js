import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalActive: false,
  modalData: [],
  editState: false,
  listData: [],
  empId: 1,
};

const dataSlice = createSlice({
  name: "serviceState",
  initialState,
  reducers: {
    setModalActive: (state) => {
      state.modalActive = !state.modalActive;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
    setListData: (state, action) => {
      if (state.editState) {
        state?.listData?.forEach((x) => {
          if (x.id === action.payload.id) {
            x.name = action?.payload?.name;
            x.age = action?.payload?.age;
            x._id = action?.payload?._id;
          }
        });
        return;
      }
      state.listData.push(action.payload);
    },
    initListData: (state, action) => {
      action.payload.forEach((el) => {
        state.listData.push(el);
      });
    },
    setEditState: (state, action) => {
      state.editState = action.payload;
    },
    deleteData: (state, action) => {
      state?.listData?.forEach((x, index) => {
        if (x.id === action.payload) {
          state.listData.splice(index, 1);
        }
      });
    },
  },
});

export const dataActions = dataSlice.actions;

export const store = configureStore({
  reducer: dataSlice.reducer,
});
