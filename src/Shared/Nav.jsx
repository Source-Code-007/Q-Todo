import { Link } from 'react-router-dom';

const Nav = () => {
   

    return (
        <div className="navbar bg-slate-900 text-slate-50 border-b border-slate-700 fixed top-0 w-full z-40 justify-between">
            <div className="navbar-start">
                <Link className="btn btn-ghost normal-case text-xl" to={'/'}>My Planner</Link>
            </div>
            <div className="navbar-end gap-3 w-80">
               
                <Link to={'/add-task'}><button className='my-btn-one'>Add task</button></Link>
                
            </div>
        </div>
    );
};

export default Nav;