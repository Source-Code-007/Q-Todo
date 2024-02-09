
import { FaChartLine, FaTasks } from 'react-icons/fa';
import { CgGoogleTasks } from "react-icons/cg";
import { MdOutlinePendingActions } from "react-icons/md";


const Homepage = () => {


    return (
        <div className='min-h-screen pt-16 px-2 sm:px-6 md:px-10 bg-slate-900 space-y-10'>
                {/* tasks box */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                    {/* Total tasks */}
                    <div className='bg-neutral flex flex-col justify-between rounded-sm'>

                        <div className='py-10 px-5 flex items-center justify-between gap-5'>
                            <div>
                                <h2 className='font-semibold md:font-bold text-xl md:text-2xl text-primary'>4000</h2>
                                <p>Total tasks</p>
                            </div>
                            <span><FaTasks /></span>
                        </div>
                        <div className='bg-primary py-4 px-2 flex justify-between rounded-b-sm'>
                            <span className='font-semibold'>55% changes</span>
                            <span><FaChartLine /></span>
                        </div>
                    </div>
                    {/* Completed tasks */}
                    <div className='bg-neutral flex flex-col justify-between rounded-sm'>

                        <div className='py-10 px-5 flex items-center justify-between gap-5'>
                            <div>
                                <h2 className='font-semibold md:font-bold text-xl md:text-2xl text-secondary'>2000</h2>
                                <p>Total completed tasks</p>
                            </div>
                            <span><CgGoogleTasks /></span>
                        </div>
                        <div className='bg-secondary py-4 px-2 flex justify-between rounded-b-sm'>
                            <span className='font-semibold'>25% changes</span>
                            <span><FaChartLine /></span>
                        </div>
                    </div>
                    {/* Pending tasks */}
                    <div className='bg-neutral flex flex-col justify-between rounded-sm'>

                        <div className='py-10 px-5 flex items-center justify-between gap-5'>
                            <div>
                                <h2 className='font-semibold md:font-bold text-xl md:text-2xl text-secondary'>3500</h2>
                                <p>Total pending tasks</p>
                            </div>
                            <span><MdOutlinePendingActions /></span>
                        </div>
                        <div className='bg-secondaryTwo py-4 px-2 flex justify-between rounded-b-sm'>
                            <span className='font-semibold'>25% changes</span>
                            <span><FaChartLine /></span>
                        </div>
                    </div>
                </div>

                {/* All tasks */}
                <div className='mt-10'>
                    There is no tasks
                </div>

        </div>
    );
};

export default Homepage;