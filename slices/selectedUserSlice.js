import { createSlice } from "@reduxjs/toolkit";

const initialSelectedUserState = {
  selectedUserName: null,
  selectedUserId: null,
};

export const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState: initialSelectedUserState,
  reducers: {
    selectUser(state, action) {
      (state.selectedUserName = action.payload.userName),
        (state.selectedUserId = action.payload.id);
    },
    todoAdded(state, action) {
      state.push(action.payload)
    },
    todoDeleted(state, action) {
      // Construct a new array immutably
      const newTodos = state.todos.filter(todo => todo.id !== action.payload)
      // "Mutate" the existing state to save the new array
      state.todos = newTodos
    },
  },
});

export const { selectUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;