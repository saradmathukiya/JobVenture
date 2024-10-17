import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle function for mobile menu

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6 lg:px-8'> {/* Adjusted padding here */}
                <div>
                    <NavLink to="/">
                        <h1 className='text-2xl lg:text-3xl font-bold'>Job<span className='text-[#3770ff]'>Venture</span></h1>
                    </NavLink>
                </div>
                
                <div className='hidden lg:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <NavLink 
                                        to="/admin/companies" 
                                        className={({ isActive }) => isActive ? 'text-[#3770ff] underline' : 'text-black hover:text-[#3770ff]'}
                                    >
                                        Companies
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/admin/jobs" 
                                        className={({ isActive }) => isActive ? 'text-[#3770ff] underline' : 'text-black hover:text-[#3770ff]'}
                                    >
                                        Jobs
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink 
                                        to="/" 
                                        className={({ isActive }) => isActive ? 'text-[#3770ff] underline' : 'text-black hover:text-[#3770ff]'}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/jobs" 
                                        className={({ isActive }) => isActive ? 'text-[#3770ff] underline' : 'text-black hover:text-[#3770ff]'}
                                    >
                                        Jobs
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/browse" 
                                        className={({ isActive }) => isActive ? 'text-[#3770ff] underline' : 'text-black hover:text-[#3770ff]'}
                                    >
                                        Browse
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <NavLink to="/login">
                                <Button variant="outline" className="bg-[#daf2ff] text-[#3770ff] hover:bg-[#3770ff] hover:text-[#daf2ff]">Login</Button>
                            </NavLink>
                            <NavLink to="/signup">
                                <Button className="bg-[#3770ff] hover:bg-[#daf2ff] hover:text-[#3770ff]">Signup</Button>
                            </NavLink>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div>
                                    <div className='flex gap-2 space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {user && user.role === 'student' && (
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <NavLink to="/profile">
                                                    <Button variant="link">View Profile</Button>
                                                </NavLink>
                                            </div>
                                        )}
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Hamburger Menu for mobile */}
                <div className="lg:hidden">
                    <button className="text-black" aria-label="Open Menu" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white lg:hidden">
                        <ul className='flex flex-col font-medium items-center gap-5 py-4'>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <NavLink 
                                            to="/admin/companies" 
                                            className={({ isActive }) => isActive ? 'text-[#3770ff] underline' : 'text-black hover:text-[#3770ff]'}
                                        >
                                            Companies
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/admin/jobs" 
                                            className={({ isActive }) => isActive ? 'text-[#3770ff] underline' : 'text-black hover:text-[#3770ff]'}
                                        >
                                            Jobs
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink 
                                            to="/" 
                                            className={({ isActive }) => isActive ? 'text-[#3770ff] underline' : 'text-black hover:text-[#3770ff]'}
                                        >
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/jobs" 
                                            className={({ isActive }) => isActive ? 'text-[#3770ff] underline' : 'text-black hover:text-[#3770ff]'}
                                        >
                                            Jobs
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/browse" 
                                            className={({ isActive }) => isActive ? 'text-[#3770ff] underline' : 'text-black hover:text-[#3770ff]'}
                                        >
                                            Browse
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            {!user ? (
                                <div className='flex flex-col items-center gap-2'>
                                    <NavLink to="/login">
                                        <Button variant="outline" className="bg-[#daf2ff] text-[#3770ff] hover:bg-[#3770ff] hover:text-[#daf2ff]">Login</Button>
                                    </NavLink>
                                    <NavLink to="/signup">
                                        <Button className="bg-[#3770ff] hover:bg-[#daf2ff] hover:text-[#3770ff]">Signup</Button>
                                    </NavLink>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center'>
                                    <NavLink to="/profile">
                                        <Button variant="link">View Profile</Button>
                                    </NavLink>
                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                </div>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
