import { createSlice } from "@reduxjs/toolkit";
import myLocalDB from "../../util/localDB";


const { getTasks } = myLocalDB
const initialState = {
    todo: getTasks?.length > 0 ? getTasks : []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        insertTodo: ((state, action) => {
            state.todo = action.payload
        }),
        handleStatusTodo: (state, action) => {
            const updateTodoStatus = state.value.find(td => td._id === action.payload?._id)
            updateTodoStatus.status = action.payload?.status
        },
        sortTodo: (state, action) => {
            // For ascending or descending
            const {type, value} =action.payload
            if (type === 'order') {
                if (action.payload?.value === 'ascending') {
                    state.todo.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
                }
                else if (value === 'descending') {
                    state.todo.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
                }
            }
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter(td => td._id !== action.payload)
        },
    }
})


export const { insertTodo, handleStatusTodo, sortTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer