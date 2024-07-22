import { useContext } from 'react';
import UserContext from '../UserContext';
import { NavLink } from 'react-router-dom';
import { useCart } from '../CartContext'; 

export default function Navigation() {
    const { user, logout } = useContext(UserContext);
    const { cart } = useCart(); // Access cart from CartContext

    // Calculate the total number of items in the cart
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://www.jimphicdesigns.com/imgs/designs/portfolio/lion-logo-3.png" className="h-10 w-10 rounded-full" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">YanevShop</span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
                                <li>
                                    <NavLink
                                        to="cart"
                                        className={({ isActive }) =>
                                            `flex items-center py-1 px-2 rounded ${isActive ? 'text-blue-700 !important' : 'hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                        }
                                    >
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2001/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.6 2.3L6.3 6h12.4l.7-2.7L21 3h2m-5 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6 15h12v-2H6v2zm0 4h12v-2H6v2z" />
                                        </svg>
                                        {totalItems > 0 && (
                                            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{totalItems}</span>
                                        )}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="profile"
                                        className={({ isActive }) =>
                                            `flex items-center py-1 px-2 rounded ${isActive ? 'text-blue-700 !important' : 'hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                        }
                                    >
                                        <img
                                            src={`http://yanevshop.test/storage/${user.image}`}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full"
                                        />
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
