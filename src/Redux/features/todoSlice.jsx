import { createSlice } from "@reduxjs/toolkit";
import myLocalDB from "../../util/localDB";


const { getTasks } = myLocalDB
const myTasks = getTasks()
const initialState = {
    todo: myTasks?.length > 0 ? myTasks : []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        insertTodo: ((state, action) => {
            state.todo.push(action.payload)
        }),
        handleStatusTodo: (state, action) => {
            const updateTodoStatus = state.todo.find(td => td._id === action.payload?._id)
            updateTodoStatus.status = action.payload?.status
        },
        updateTodo: (state, action) => {
            state.todo = state.todo.map(td=> {
                if(td?._id === action.payload?._id){
                    return {
                        ...td, ...action.payload
                    }
                }
                return td
            })
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


export const { insertTodo, handleStatusTodo, updateTodo, sortTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer