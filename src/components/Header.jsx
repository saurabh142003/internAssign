import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useState,useEffect } from 'react';
function Header() {

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu
    const [user, setUser] = useState(null);
    //   useEffect(() => {
    //     const userData = localStorage.getItem("user");
    //     if (userData) {
    //       setUser(JSON.parse(userData)); // Parse and update state
    //     }
    //   }, []);
    // function slideToHome() {
    //     navigate('/');
    // }

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    return (
        <div className='h-[85px] bg-[#FFFFFF] relative flex justify-between px-4 md:pr-4 sm:pr-20 pr-16 sm:px-12 items-center w-full'>
            <div>
                <div className='text-base px-6 py-2 font-medium bg-[#253046] text-white rounded-full'>
                    Logo
                </div>

            </div>
            <div>
                <ul className='text-[#333333] hidden md:flex text-base font-medium gap-8'>
                    <NavLink to={'/'} className="cursor-pointer">Home</NavLink>
                    <NavLink to={'/about'} className="cursor-pointer">About</NavLink>
                    <NavLink to={'/blog'} className="cursor-pointer">Blog</NavLink>
                </ul>

            </div>
            {/* Dropdown Menu for Small Screens */}
            {isMenuOpen && (
                <div className="absolute top-[80px] right-0 w-52 bg-[#FFFFFF] shadow-lg p-5 transition-transform duration-300 transform translate-x-0 z-20">
                    <nav className="flex flex-col items-start space-y-4">
                        <NavLink onClick={toggleMenu} to="/" className="text-lg font-medium">
                            Home
                        </NavLink>
                        <NavLink onClick={toggleMenu} to="/about" className="text-lg font-medium">
                            About
                        </NavLink>
                        <NavLink onClick={toggleMenu} to="/blog" className="text-lg font-medium ">
                            Blog
                        </NavLink>
                        <NavLink onClick={toggleMenu} to="/my-account" className="text-lg font-medium ">
                            Profile
                        </NavLink>
                        <NavLink onClick={toggleMenu} to="/my-houses" className="text-lg font-medium ">
                            My Houses
                        </NavLink>

                    </nav>
                </div>
            )}
            {user ?
                <NavLink to='/my-account' className='w-12 md:mr-10 h-12'>
                    <img alt='User Avatar' className='w- rounded-full h-full object-cover' src='https://druyp.com/assets/user-b2d5ce69.png'></img>

                </NavLink> :
                <div className='flex gap-2 sm:gap-4'>
                    <NavLink to={'/signup'} className='sm:px-6 sm:py-2 p-3 rounded-full text-white bg-[#0D28AB] text-sm sm:text-base font-medium'>
                        Sign Up
                    </NavLink>
                    <NavLink to={'/signin'} className='sm:px-6 sm:py-2 p-3 rounded-full text-[#0D28AB] text-sm sm:text-base font-medium border border-[#0D28AB] '>
                        Log In
                    </NavLink>
                </div>}
            <button onClick={toggleMenu} className='absolute top-7 right-6'>
                {isMenuOpen ? <IoMdClose size={25} /> : <IoIosMenu size={28} />}
            </button>
        </div>
    )
}

export default Header