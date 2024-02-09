/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import myLocalDB from "../../util/localDB";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../Redux/features/todoSlice";

const EditTaskModal = ({ taskEditActiveId }) => {
    const dispatch = useDispatch
    console.log(taskEditActiveId, 3);
    const { getExpectedTask, updateTask } = myLocalDB
    const task = getExpectedTask(taskEditActiveId)
    console.log(task);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = form => {
        // setInsertTaskLoading(true)
        const { title, dateTime, priority } = form
        const task = { ...task, title, deadline: dateTime, priority }


        // insert task to local state by redux
        dispatch(updateTodo(task))

        // modify task to localStorage
        updateTask(task)

        toast('Task modified!', {
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
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-neutral border border-primary">
                <h3 className="font-bold text-lg">Hello {taskEditActiveId}!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>

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
                                    if (!value) return '*Date and time are required!';
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
            </div>
        </dialog>
    );
};

export default EditTaskModal;