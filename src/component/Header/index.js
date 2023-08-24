import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
export default function Header() {
    const [showDropdown, setShowDropDown] = useState(false);
    const [showNav, isShowNav] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { userLogin } = useSelector(state => state.loginReducer);
    useEffect(() => {
        setShowDropDown(false);
    }, [location])
    return (
        <header className='shadow-md py-4 fixed z-20 top-0 w-full bg-white'>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 md:p-4">
                    <NavLink to="/" className="flex items-center">
                        <img src="../img/logoMovie.png" className="h-10 mr-3 bg-white" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CyberMovie</span>
                    </NavLink>
                    <div className={`flex items-center gap-3`}>
                        <div className={`${userLogin ? 'flex md:hidden' : 'hidden'} flex items-center gap-3`}>
                            <button className='hover:scale-105 duration-300' onClick={() => {
                                navigate('/info/dashboard')
                            }}
                            ><FontAwesomeIcon icon={faUser} /></button>
                            <button className='underline' onClick={() => {
                                localStorage.clear();
                                navigate('/login');
                                window.location.reload();
                            }}>Đăng xuất</button>
                        </div>
                        <button data-collapse-toggle="navbar-dropdown" type="button"
                            onClick={() => isShowNav(!showNav)}
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className={`${!showNav ? 'hidden' : ''} w-full md:block md:w-auto`} id="navbar-dropdown">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:flex-row md:items-center md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li className='relative'>
                                <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between font-bold text-lg w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                    onClick={() => setShowDropDown(!showDropdown)}
                                >Phim<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                                    </svg></button>
                                {/* Dropdown menu */}
                                <div id="dropdownNavbar" onBlur={() => setShowDropDown(false)} className={`${!showDropdown ? 'hidden' : ''} z-10 top-8 font-normal bg-white divide-y divide-gray-100 md:rounded-md shadow-md border w-full md:absolute md:w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                                    <ul className="text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                        <li>
                                            <NavLink to="/showtime/dangChieu" className="block px-4 py-3 text-lg cursor-pointer hover:bg-gray-100 font-bold dark:hover:bg-gray-600 dark:hover:text-white">Phim đang chiếu</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/showtime/sapChieu" className="block px-4 py-3 text-lg cursor-pointer hover:bg-gray-100 font-bold dark:hover:bg-gray-600 dark:hover:text-white">Phim sắp chiếu</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <NavLink to="/about" className="block py-2 pl-3 pr-4 font-bold text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 cursor-pointer dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Tin tức</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="block py-2 pl-3 pr-4 font-bold text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 cursor-pointer dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Liên hệ</NavLink>
                            </li>
                            {userLogin ?
                                <div className='flex items-center gap-3'>
                                    <button className='hover:scale-105 duration-300' onClick={() => {
                                        navigate('/info/dashboard')
                                    }}
                                    ><FontAwesomeIcon icon={faUser} /></button>
                                    <button className='hidden md:block underline' onClick={() => {
                                        localStorage.clear();
                                        navigate('/login');
                                        window.location.reload();
                                    }}>Đăng xuất</button>
                                </div> :
                                <Fragment>
                                    <li>
                                        <NavLink to="login" className="block py-2 pl-3 pr-4 font-bold text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 cursor-pointer dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Đăng nhập</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="register" className="block py-2 pl-3 pr-4 font-bold text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 cursor-pointer dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Đăng ký</NavLink>
                                    </li>
                                </Fragment>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
