import { useDispatch } from 'react-redux';
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import myLocalDB from '../../util/localDB';
import { v4 as uuidv4 } from 'uuid';
import { insertTodo } from '../../Redux/features/todoSlice';


const AddTask = () => {
    const dispatch = useDispatch()
    const { storeTasks } = myLocalDB


    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = form => {
        // setInsertTaskLoading(true)
        const { title, dateTime, description, priority } = form
        const task = { _id: uuidv4(), title, deadline: dateTime, description, status: 'incomplete', priority }


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


    return (
        <div className='min-h-screen pt-12 bg-slate-900 px-4 md:px-0'>
            <div className='w-full md:w-5/6 mx-auto md:mx-auto bg-slate-400 bg-opacity-20 p-4 space-y-5 rounded'>
                <div>
                    <h2 className='font-bold text-3xl text-white'>Q Todo!</h2>
                    <h2 className='font-semibold text-lg text-slate-300'>Create a list of task.</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4 text-slate-700'>

                    {/* Tasks title */}
                    <div>
                        <label className='text-white' htmlFor="taskTitle">Task title</label>
                        <input type="text" id='taskTitle' placeholder="Your task title here" className="my-inp" {...register("title", { required: true })} />
                        {errors.title && <span className='text-secondaryTwo block font-semibold'>*Task is required!</span>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className='text-white' htmlFor="description">Description</label>
                        <textarea id='description' placeholder="Your description here" className="my-inp !min-h-[150px] !max-h-[300px]" {...register("description", { required: true })}></textarea>
                        {errors.description && <span className='text-secondaryTwo block font-semibold'>*Description is required!</span>}
                    </div>

                    {/* Due date */}
                    <div>
                        <label className='text-white' htmlFor="due-date">Due Date</label>
                        <input className='my-inp' id='due-date' type="datetime-local" {...register("dateTime", {
                            required: '*Date and time are required!', validate: value => {
                                if(!value) return '*Date and time are required!';
                                const selectedDateTime = new Date(value);
                                const currentDateTime = new Date();
                                return selectedDateTime > currentDateTime || "*Date and time must be in the future!";
                            }
                        })} />
                        {/* {errors.dateTime && <span className='text-secondaryTwo block font-semibold'>Date and time are required!</span>} */}
                        {errors.dateTime && <span className='text-secondaryTwo block font-semibold'>{errors.dateTime.message}</span>}
                    </div>

                    {/* Priority level */}
                    <div>
                        <label className='text-white' htmlFor="priority-level">Priority Level</label>
                        <select className="select my-inp w-full" id='priority-level' defaultValue={''} {...register("priority", { required: true })}>
                            <option value={''}>Priority</option>
                            <option value={'Low'}>Low</option>
                            <option value={'Medium'}>Medium</option>
                            <option value={'High'}>High</option>
                        </select>
                        {errors.priority && <span className='text-secondaryTwo block font-semibold'>*Priority is required!</span>}
                    </div>

                    <button className={`my-btn-one !flex items-center gap-2 opacity-100 !cursor-pointer`} type='submit'> <span><FaPlus></FaPlus></span> Add Task</button>
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