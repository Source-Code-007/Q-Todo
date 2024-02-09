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
        })
    }
})


export const { insertTodo } = todoSlice.actions

export default todoSlice.reducer