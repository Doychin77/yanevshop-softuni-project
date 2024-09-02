import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CartDropdown from './CartDropdown';
import CategoriesDropdown from './CategoriesDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faRightToBracket, faHouse, faAddressBook, faTag, faCircleInfo, faSquarePlus, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
    const { user } = useContext(UserContext);
    const { cart } = useCart();
    const [categories, setCategories] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [dropdownTimer, setDropdownTimer] = useState(null);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://yanevshop.test/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleMouseEnter = () => {
        if (dropdownTimer) {
            clearTimeout(dropdownTimer);
        }
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownTimer(setTimeout(() => {
            setIsDropdownVisible(false);
        }, 400));
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-black">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://www.jimphicdesigns.com/imgs/designs/portfolio/lion-logo-3.png" className="h-10 w-10 rounded-full" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold text-white hover:text-orange-500 transition duration-300">YanevShop</span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-orange-500 md:dark:bg-black dark:border-gray-700">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'is-active' : ''}`
                                }
                            >
                                <FontAwesomeIcon icon={faHouse} className="text-xl" /> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="contacts"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'is-active' : ''}`
                                }
                            >
                                <FontAwesomeIcon icon={faAddressBook} className="text-xl" /> Contacts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="about"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'is-active' : ''}`
                                }
                            >
                                <FontAwesomeIcon icon={faCircleInfo} className="text-xl" /> About
                            </NavLink>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <NavLink
                                        to="products"
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'is-active' : ''}`
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTag} className="text-xl" /> Products
                                    </NavLink>
                                </li>
                                <li>
                                    {/* <FontAwesomeIcon icon={faLayerGroup} /> */}
                                    <CategoriesDropdown categories={categories} />
                                </li>
                                <li>
                                    <NavLink
                                        to="/favorites"
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'is-active' : ''}`
                                        }
                                    >
                                        <FontAwesomeIcon icon={faHeart} size='lg' />
                                    </NavLink>
                                </li>
                                <li
                                    style={{ position: 'relative' }}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="relative"
                                >
                                    <NavLink
                                        to="/cart"
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'is-active' : ''}`
                                        }
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} size='' />
                                        {totalItems > 0 && (
                                            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{totalItems}</span>
                                        )}
                                    </NavLink>
                                    {isDropdownVisible && <CartDropdown />}
                                </li>
                                <li>
                                    <NavLink
                                        to="profile"
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'is-active' : ''}`
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
                                            `nav-link ${isActive ? 'is-active' : ''}`
                                        }
                                    >
                                        <FontAwesomeIcon icon={faSquarePlus} className="text-xl" /> Register
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="login"
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'is-active' : ''}`
                                        }
                                    >
                                        <FontAwesomeIcon icon={faRightToBracket} className="text-xl" /> Log In
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
