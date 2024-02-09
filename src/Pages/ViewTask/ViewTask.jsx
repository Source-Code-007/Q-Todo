import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import myLocalDB from '../../util/localDB';
import { FaCalendar, FaClock, FaTrash } from 'react-icons/fa';
import { FaRightLong } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, handleStatusTodo, sortTodo } from '../../Redux/features/todoSlice';


const ViewTask = () => {
    const todoList = useSelector(state => state.todo.todo)
    const dispatch = useDispatch()
    const { setTaskStatus, deleteTask } = myLocalDB
    const [sortPriority, setSortPriority] = useState(null)

    // sorting
    const sortingFunc = (type, value) => {
        if (type === 'priority') {
            setSortPriority(value)
            return
        }
        dispatch(sortTodo({ type, value }))

    }

    // set task status func
    const setTaskStatusFunc = (taskId, status) => {
        setTaskStatus(taskId, status)
        dispatch(handleStatusTodo({ _id: taskId, status }))
    }

    // delete task func
    const deleteTaskFunc = (taskId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You can not revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTask(taskId)
                dispatch(deleteTodo(taskId))
            }
        })
    }

    console.log(todoList, 'todoList');

    return (
        <div className='min-h-screen pt-12 bg-slate-900'>
            <div className='w-3/6 mx-auto bg-slate-400 bg-opacity-20 p-4 space-y-5 rounded'>

                {/* sorting btn */}
                <div className='flex flex-col gap-1 items-end'>
                    <h2 className='font-bold text-xl'>Sort</h2>
                    <div className='flex gap-2 w-3/6'>
                        <select className="select my-inp" id='sort-priority' onChange={(e) => sortingFunc('priority', e.target.value)} defaultValue={''}>
                            <option value={''}>Priority</option>
                            <option value={'Low'}>Low</option>
                            <option value={'Medium'}>Medium</option>
                            <option value={'High'}>High</option>
                        </select>
                        <select className="select my-inp" id='sort-priority' onChange={(e) => sortingFunc('order', e.target.value)} defaultValue={''}>
                            <option value={''}>Order</option>
                            <option value={'ascending'}>Ascending</option>
                            <option value={'descending'}>Descending</option>
                        </select>
                    </div>
                </div>
                <Tabs className='w-full p-4 max-h-[500px] overflow-y-scroll view-task-scrollbar'>
                    <TabList className='flex gap-2 mb-4'>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>All</Tab>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>Pending</Tab>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>In Progress</Tab>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>Completed</Tab>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>Clear Completed</Tab>
                    </TabList>

                    {/* All */}
                    <TabPanel>
                        {
                            todoList?.length === 0 ? <div className='min-h-[50vh] flex items-center justify-center'><span className='bg-secondaryTwo p-2 rounded text-white font-bold text-xl'>No task here!</span></div> : sortPriority ? todoList?.filter(tl => tl.priority === sortPriority)?.length === 0 ? <div className='min-h-[50vh] flex items-center justify-center'><span className='bg-secondaryTwo p-2 rounded text-white font-bold text-xl'>No task here!</span></div> : todoList?.filter(tl => tl.priority === sortPriority)?.map((td, ind) => {
                                const isLow = td?.priority === 'Low'
                                const isMedium = td?.priority === 'Medium'
                                const isHigh = td?.priority === 'High'
                                return <div key={ind} className={`rounded p-3 my-2 text-slate-200 bg-slate-900 bg-opacity-40 relative`}>
                                    <h2 className='text-slate-50 font-bold text-xl'>{td.title}</h2>
                                    <p>Status: <span className='font-semibold text-white'>{td.status}</span></p>
                                    <p>Priority: <span className={`font-semibold ${isHigh ? 'text-secondaryTwo' : isMedium ? 'text-secondary' : isLow ? 'text-primary' : ''}`}>{td.priority}</span></p>
                                    <p className='flex gap-2 items-center'>Deadline: <span className='flex gap-1 items-center'><FaCalendar></FaCalendar> {td.deadline?.split('T')[0]}</span> <span className='flex gap-1 items-center'><FaClock></FaClock>{td.deadline?.split('T')[1]}</span></p>
                                    <span className='absolute right-3 hover:scale-110 hover:text-secondaryTwo transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => deleteTaskFunc(td._id)}><FaTrash></FaTrash></span>
                                </div>
                            }) : todoList?.map((td, ind) => {
                                const isLow = td?.priority === 'Low'
                                const isMedium = td?.priority === 'Medium'
                                const isHigh = td?.priority === 'High'
                                return <div key={ind} className={`rounded p-3 my-2 text-slate-200 bg-slate-900 bg-opacity-40 relative`}>
                                    <h2 className='text-slate-50 font-bold text-xl'>{td.title}</h2>
                                    <p>Status: <span className='font-semibold text-white'>{td.status}</span></p>
                                    <p>Priority: <span className={`font-semibold ${isHigh ? 'text-secondaryTwo' : isMedium ? 'text-secondary' : isLow ? 'text-primary' : ''}`}>{td.priority}</span></p>
                                    <p className='flex gap-2 items-center'>Deadline: <span className='flex gap-1 items-center'><FaCalendar></FaCalendar> {td.deadline?.split('T')[0]}</span> <span className='flex gap-1 items-center'><FaClock></FaClock>{td.deadline?.split('T')[1]}</span></p>
                                    <span className='absolute right-3 hover:scale-110 hover:text-secondaryTwo transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => deleteTaskFunc(td._id)}><FaTrash></FaTrash></span>
                                </div>
                            })
                        }
                    </TabPanel>
                    {/* Pending */}
                    <TabPanel>
                        {
                            todoList?.filter(tf => tf.status === 'pending').length === 0 ? <div className='min-h-[50vh] flex items-center justify-center'><span className='bg-secondaryTwo p-2 rounded text-white font-bold text-xl'>No task here!</span></div> : todoList?.filter(tf => tf.status === 'pending')?.map((td, ind) => {
                                return <div key={ind} className='p-3 rounded my-2 text-slate-200 bg-slate-900 bg-opacity-50 relative'>
                                    <h2 className='text-slate-50 font-bold text-xl'>{td.title}</h2>
                                    <p className='flex gap-2 items-center'>Deadline: <span className='flex gap-1 items-center'><FaCalendar></FaCalendar> {td.deadline?.split('T')[0]}</span> <span className='flex gap-1 items-center'><FaClock></FaClock>{td.deadline?.split('T')[1]}</span></p>
                                    <span className='absolute right-2 hover:right-1 transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => setTaskStatusFunc(td._id, 'in progress')}><FaRightLong></FaRightLong></span>
                                    <span className='absolute right-8 hover:scale-110 hover:text-secondaryTwo transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => deleteTaskFunc(td._id)}><FaTrash></FaTrash></span>
                                </div>
                            })
                        }
                    </TabPanel>
                    {/* In progress */}
                    <TabPanel>
                        {
                            todoList?.filter(tf => tf.status === 'in progress').length === 0 ? <div className='min-h-[50vh] flex items-center justify-center'><span className='bg-secondaryTwo p-2 rounded text-white font-bold text-xl'>No task here!</span></div> : todoList?.filter(tf => tf.status === 'in progress')?.map((td, ind) => {
                                return <div key={ind} className='p-3 rounded my-2 text-slate-200 bg-slate-900 bg-opacity-50 relative'>
                                    <h2 className='text-slate-50 font-bold text-xl'>{td.title}</h2>
                                    <p className='flex gap-2 items-center'>Deadline: <span className='flex gap-1 items-center'><FaCalendar></FaCalendar> {td.deadline?.split('T')[0]}</span> <span className='flex gap-1 items-center'><FaClock></FaClock>{td.deadline?.split('T')[1]}</span></p>
                                    <span className='absolute right-2 hover:right-1 transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => setTaskStatusFunc(td._id, 'complete')}><FaRightLong></FaRightLong></span>
                                    <span className='absolute right-8 hover:scale-110 hover:text-secondaryTwo transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => deleteTaskFunc(td._id)}><FaTrash></FaTrash></span>
                                </div>
                            })
                        }
                    </TabPanel>
                    {/* Completed */}
                    <TabPanel>
                        {
                            todoList?.filter(tf => tf.status === 'complete').length === 0 ? <div className='min-h-[50vh] flex items-center justify-center'><span className='bg-secondaryTwo p-2 rounded text-white font-bold text-xl'>No task here!</span></div> : todoList?.filter(tf => tf.status === 'complete')?.map((td, ind) => {
                                return <div key={ind} className='p-3 rounded my-2 text-slate-200 bg-slate-900 bg-opacity-50 relative'>
                                    <h2 className='text-slate-50 font-bold text-xl'>{td.title}</h2>
                                    <p className='flex gap-2 items-center'>Deadline: <span className='flex gap-1 items-center'><FaCalendar></FaCalendar> {td.deadline?.split('T')[0]}</span> <span className='flex gap-1 items-center'><FaClock></FaClock>{td.deadline?.split('T')[1]}</span></p>
                                    <span className='absolute right-2 hover:right-1 transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => setTaskStatusFunc(td._id, 'clear')}><FaRightLong></FaRightLong></span>
                                    <span className='absolute right-8 hover:scale-110 hover:text-secondaryTwo transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => deleteTaskFunc(td._id)}><FaTrash></FaTrash></span>
                                </div>
                            })
                        }
                    </TabPanel>
                    {/* Clear completed */}
                    <TabPanel>
                        {
                            todoList?.filter(tf => tf.status === 'clear').length === 0 ? <div className='min-h-[50vh] flex items-center justify-center'><span className='bg-secondaryTwo p-2 rounded text-white font-bold text-xl'>No task here!</span></div> : todoList?.filter(tf => tf.status === 'clear')?.map((td, ind) => {
                                return <div key={ind} className='p-3 rounded my-2 text-slate-100 bg-red-300 bg-opacity-50 relative'>
                                    <h2 className='text-slate-50 font-bold text-xl'>{td.title}</h2>
                                    <p className='flex gap-2 items-center'>Deadline: <span className='flex gap-1 items-center'><FaCalendar></FaCalendar> {td.deadline?.split('T')[0]}</span> <span className='flex gap-1 items-center'><FaClock></FaClock>{td.deadline?.split('T')[1]}</span></p>
                                    <span className='absolute right-8 hover:scale-110 hover:text-secondaryTwo transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => deleteTaskFunc(td._id)}><FaTrash></FaTrash></span>
                                </div>
                            })
                        }
                    </TabPanel>
                </Tabs>
            </div>

        </div>
    );
};

export default ViewTask;