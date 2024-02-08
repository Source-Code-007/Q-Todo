import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, insertTodo } from '../../Redux/features/todo/todoSlice';
import { FaCheck, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Provider/authProvider';
import MyLoading from '../../Components/HelpingCompo/MyLoading';
import myLocalDB from '../../util/localDB';
import { v4 as uuidv4 } from 'uuid';


const AddTask = () => {
    const todoList = useSelector(state => state.todo.value)
    const { user, authLoading } = useAuth()
    const dispatch = useDispatch()
    const [insertTaskLoading, setInsertTaskLoading] = useState(false)
    const [tasksLoading, setTasksLoading] = useState(true)
    const [tasks, setTasks] = useState([])
    const { getMyTeams, storeTasks } = myLocalDB
    const myTeams = getMyTeams(user?.email)


    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = form => {
        // setInsertTaskLoading(true)
        const { title, dateTime, priority, teamMember } = form
        const task = {_id: uuidv4(), title, deadline: dateTime, status: 'pending', priority, user: teamMember? teamMember : user?.email}


        // insert task to local state by redux
        dispatch(insertTodo(task))
        
        // insert task to localStorage
        storeTasks(task)

        toast('Task added!', {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
            reset()
        };


    if (authLoading) {
        return <div className='h-screen flex items-center justify-center'>
            <MyLoading className={'h-14 w-14'} />
        </div>
    }

    return (
        <div className='min-h-screen pt-12 bg-slate-900'>
            <div className='w-3/6 mx-auto bg-slate-400 bg-opacity-20 p-4 space-y-5 rounded'>
                <div>
                    <h2 className='font-bold text-3xl text-white'>Today's TODO!</h2>
                    <h2 className='font-semibold text-lg text-slate-300'>Create a list of task.</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4 text-slate-700'>

                    {/* Tasks */}
                    <div>
                        <label className='text-white' htmlFor="task">Tasks</label>
                        <input type="text" id='task' placeholder="Your task here" className="my-inp" {...register("title", { required: true })} />
                        {errors.title && <span className='text-red-500 block font-semibold'>Task is required!</span>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className='text-white' htmlFor="descripion">Description</label>
                        <input type="text" id='descripion' placeholder="Your description here" className="my-inp" {...register("description", { required: true })} />
                        {errors.description && <span className='text-red-500 block font-semibold'>Description is required!</span>}
                    </div>

                    {/* Due date */}
                    <div>
                        <label className='text-white' htmlFor="due-date">Due Date</label>
                        <input className='my-inp' id='due-date' type="datetime-local" {...register("dateTime", { required: true })} />
                        {errors.dateTime && <span className='text-red-500 block font-semibold'>Date and time are required!</span>}
                    </div>

                    {/* Priority level */}
                    <div>
                        <label className='text-white' htmlFor="priority-level">Priority Level</label>
                        <select className="select my-inp w-full" id='priority-level' defaultValue={''} {...register("priority", { required: true })}>
                            <option value={''} disabled>Priority</option>
                            <option value={'Low'}>Low</option>
                            <option value={'Medium'}>Medium</option>
                            <option value={'High'}>High</option>
                        </select>
                        {errors.priority && <span className='text-red-500 block font-semibold'>Priority is required!</span>}
                    </div>
                    {/* team member */}
                    <div>
                        <label className='text-white' htmlFor="team">Team Member</label>
                        <select className="select my-inp w-full" id='team' defaultValue={''} {...register("teamMember")}>
                            <option value={''} disabled>Team Member</option>
                            {
                                myTeams?.map(mt=> mt.member?.map((teamMember, ind) => <option key={ind} value={teamMember}>{teamMember}</option>))
                            }
                        </select>
                    </div>

                    <button className={`my-btn-one !flex items-center gap-2 ${insertTaskLoading ? 'opacity-40 !cursor-auto' : 'opacity-100 !cursor-pointer'}`} disabled={insertTaskLoading} type='submit'> <span><FaPlus></FaPlus></span> Add Task</button>
                </form>

            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default AddTask;