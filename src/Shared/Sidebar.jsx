import { FaHome, FaPlus, FaTasks } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='space-y-4 py-5 bg-slate-900 border-r border-slate-700 h-full pt-24'>
            <ul className='w-full py-14 pl-2 space-y-2'>
                <li className='font-bold text-3xl  rounded'><NavLink to='/' className={({ isActive }) => `py-3 px-1 flex items-center justify-center ${isActive ? 'bg-primary border-l-4 border-primary' : 'text-slate-50'}`}> <FaHome></FaHome> </NavLink></li>
                <li className='font-bold text-3xl  rounded'><NavLink to='/add-task' className={({ isActive }) => `py-3 px-1 flex items-center justify-center ${isActive ? 'bg-primary border-l-4 border-primary' : 'text-slate-50'}`}> <FaPlus></FaPlus> </NavLink></li>
                <li className=' font-bold text-3xl  rounded'><NavLink to='/view-task' className={({ isActive }) => `py-3 px-1 flex items-center justify-center ${isActive ? 'bg-primary border-l-4 border-primary' : 'text-slate-50'}`}> <FaTasks></FaTasks> </NavLink></li>
            </ul>
        </div>
    );
};

export default Sidebar;