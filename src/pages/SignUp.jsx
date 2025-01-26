import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice.jsx'; // Import the login action from your userSlice
import { auth } from '../Firebase.jsx'; // Import Firebase authentication methods
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase signup method

function SignUp() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function changeHandler(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    async function submitHandler(e) {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            alert('You are missing details');
            return;
        }

        try {
          

            // Use Firebase Authentication to create a new user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            // Dispatch the login action to store user data in Redux state
            dispatch(login({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName, // Add any other properties you need
            }));

            // Redirect to the home page after successful signup
            setTimeout(() => {
                navigate('/');
            }, 500);

         
        } catch (err) {
           
            console.log('Error:', err);
           
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <form onSubmit={submitHandler} className='w-full max-w-md p-6 bg-white shadow-2xl rounded-md flex flex-col items-center gap-4 sm:p-8'>
                <div className='w-full'>
                    <input 
                        type="email" 
                        onChange={changeHandler} 
                        placeholder='Your E-mail' 
                        id='email' 
                        className='w-full text-base mt-3 outline-none border border-gray-300 rounded-md p-4 focus:border-blue-500' 
                    />
                </div>
                <div className='w-full'>
                    <input 
                        type="password" 
                        onChange={changeHandler} 
                        placeholder='Your Password' 
                        id='password' 
                        className='w-full text-base mt-3 outline-none border border-gray-300 rounded-md p-4 focus:border-blue-500' 
                    />
                </div>
                <div className='w-full'>
                    <button className='w-full uppercase bg-blue-800 p-3 mt-4 text-white rounded-md shadow-lg hover:bg-blue-700'>
                        {"Sign Up"}
                    </button>
                </div>
                <div className='flex gap-2 mt-5'>
                    <p className="text-base font-thin">Already have an account?</p>
                    <NavLink className="text-blue-800 underline hover:text-blue-600" to="/signin">Sign In</NavLink>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
