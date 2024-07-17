import { useContext } from 'react';
import UserContext from '../UserContext';
import { NavLink } from 'react-router-dom';


export default function Navigation() {
    const { user, logout } = useContext(UserContext);


    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">YanevShop</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `block p-1 px-2 rounded ${isActive ? 'text-blue-700 !important' : 'hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                }
                            >
                                Home
                            </NavLink>

                        </li>
                        <li>
                            <NavLink
                                to="contacts"
                                className={({ isActive }) =>
                                    `block py-1 px-2 rounded ${isActive ? 'text-blue-700 !important' : 'hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                }
                            >
                                Contacts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="about"
                                className={({ isActive }) =>
                                    `block py-1 px-2 rounded ${isActive ? 'text-blue-700 !important' : 'hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                }
                            >
                                About
                            </NavLink>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <NavLink
                                        to="products"
                                        className={({ isActive }) =>
                                            `block py-1 px-2 rounded ${isActive ? 'text-blue-700 !important' : 'hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                        }
                                    >
                                        Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="categories"
                                        className={({ isActive }) =>
                                            `block py-1 px-2 rounded ${isActive ? 'text-blue-700 !important' : 'hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                        }
                                    >
                                        Categories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="login"
                                        onClick={logout}
                                        className={({ isActive }) =>
                                            `block py-1 px-2 rounded ${isActive ? 'text-blue-700 !important' : 'hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                        }
                                    >
                                        Log out
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink
                                        to="register"
                                        className={({ isActive }) =>
                                            `block py-1 px-2 rounded ${isActive ? 'text-blue-700 !important' : 'hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                        }
                                    >
                                        Register
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="login"
                                        className={({ isActive }) =>
                                            `block py-1 px-2 rounded ${isActive ? 'text-blue-700 !important' : 'hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                        }
                                    >
                                        Log In
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
