import { Outlet } from "react-router-dom";
import FromTop from "../Components/HelpingCompo/FromTop";
import Nav from "../Shared/Nav";
import Sidebar from "../Shared/Sidebar";

const LayoutOne = () => {
    return (
        <div className='overflow-hidden'>
        <Nav></Nav>
        <div className='flex bg-slate-900 text-white'>
            <div className='h-screen w-16 fixed left-0 top-0 z-30'>
                <Sidebar></Sidebar>
            </div>
            <div className='w-full pt-14 pl-16'>
                <FromTop>
                    <Outlet></Outlet>
                </FromTop>
            </div>
        </div>
    </div>
    );
};

export default LayoutOne;