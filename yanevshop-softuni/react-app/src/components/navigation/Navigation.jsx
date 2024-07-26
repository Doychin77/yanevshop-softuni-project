import { useContext, useState, useRef } from 'react';
import UserContext from '../UserContext';
import { NavLink } from 'react-router-dom';
import { useCart } from '../CartContext';
import CartDropdown from './CartDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
    const { user, logout } = useContext(UserContext);
    const { cart } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const timeoutRef = useRef(null); // Ref to store timeout ID

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleMouseEnter = () => {
        // Clear any existing timeout and show the dropdown immediately
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsCartOpen(true);
    };

    const handleMouseLeave = () => {
        // Set a timeout to hide the dropdown after 0.5 second
        timeoutRef.current = setTimeout(() => {
            setIsCartOpen(false);
        }, 500);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-black">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://www.jimphicdesigns.com/imgs/designs/portfolio/lion-logo-3.png" className="h-10 w-10 rounded-full" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">YanevShop</span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-orange-500 md:dark:bg-black dark:border-gray-700">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `block rounded ${isActive ? 'text-orange-500 !important' : ' transition-colors duration-400 dark:text-white md:dark:hover:text-orange-500'}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="contacts"
                                className={({ isActive }) =>
                                    `block rounded ${isActive ? 'text-orange-500 !important' : ' transition-colors duration-400 dark:text-white md:dark:hover:text-orange-500'}`
                                }
                            >
                                Contacts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="about"
                                className={({ isActive }) =>
                                    `block rounded ${isActive ? 'text-orange-500 !important' : ' transition-colors duration-400 dark:text-white md:dark:hover:text-orange-500'}`
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
                                            `block rounded ${isActive ? 'text-orange-500 !important' : ' transition-colors duration-400 dark:text-white md:dark:hover:text-orange-500'}`
                                        }
                                    >
                                        Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="categories"
                                        className={({ isActive }) =>
                                            `block rounded ${isActive ? 'text-orange-500 !important' : ' transition-colors duration-400 dark:text-white md:dark:hover:text-orange-500'}`
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
                                            `block rounded ${isActive ? 'text-orange-500 !important' : ' transition-colors duration-400 dark:text-white md:dark:hover:text-orange-500'}`
                                        }
                                    >
                                        Log out
                                    </NavLink>
                                </li>
                                <li
                                    style={{ position: 'relative' }}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <NavLink
                                        to="cart"
                                        className={({ isActive }) =>
                                            `block rounded ${isActive ? 'text-orange-500 !important' : ' transition-colors duration-400 dark:text-white md:dark:hover:text-orange-500'}`
                                        }
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                        {totalItems > 0 && (
                                            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{totalItems}</span>
                                        )}
                                    </NavLink>
                                    {isCartOpen && (
                                        <CartDropdown cart={cart} totalItems={totalItems} />
                                    )}
                                </li>
                                <li>
                                    <NavLink
                                        to="profile"
                                        className={({ isActive }) =>
                                            `block rounded ${isActive ? 'text-orange-500 !important' : ' transition-colors duration-400 dark:text-white md:dark:hover:text-orange-500'}`
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
                                            `block rounded ${isActive ? 'text-orange-500 !important' : ' transition-colors duration-400 dark:text-white md:dark:hover:text-orange-500'}`
                                        }
                                    >
                                        Register
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="login"
                                        className={({ isActive }) =>
                                            `block rounded ${isActive ? 'text-orange-500 !important' : ' transition-colors duration-400 dark:text-white md:dark:hover:text-orange-500'}`
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
