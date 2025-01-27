import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiAccountBoxLine } from "react-icons/ri";
import { LuHouse } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { LuMessageCircleCode } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

const SideBar = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        // Clear user data and handle logout
        dispatch(logout()); 
        navigate('/signin'); // Navigate to the sign-in page
    };
    return (
        <div className="lg:min-w-64 w-64   hidden pt-4 lg:w-64 md:w-1/4 ml-6 mt-6 bg-[#FBFBFB] shadow-md mb-6 rounded-lg lg:px-0 px-2 h-screen sticky top-0 md:flex gap-4 flex-col">
            <div className="w-full flex items-center justify-center">
                <div className="w-[200px] h-[200px]">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1673829957651-fd7070baac4f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="User Avatar"
                        className="h-full w-full object-cover rounded-full"
                    />
                </div>
            </div>
            <div className="pl-7 flex items-center justify-center w-full">
                <nav className="flex flex-col gap-6 space-y-4 md:p-4 sm:p-2 lg:p-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 text-blue-600 hover:text-blue-500 p-2 rounded ${isActive ? 'bg-[#DAE9FD] text-blue-600' : ''
                            }`
                        }
                    >
                        <RiAccountBoxLine size={28} />
                        <span>Students</span>
                    </NavLink>
                    <button
                       onClick={handleLogout}
                        className="flex cursor-pointer items-center space-x-2 hover:bg-[#DAE9FD]  hover:text-blue-500 p-2 rounded bg-white text-[#6A7A87]"
                    >
                        <TbLogout size={28} />
                        <span>Log Out</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
