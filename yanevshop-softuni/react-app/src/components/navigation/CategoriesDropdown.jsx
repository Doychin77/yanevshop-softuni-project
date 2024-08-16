import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const CategoriesDropdown = ({ categories }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownTimeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 400); 
    };

    return (
        <div 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
        >
            <NavLink
                to="categories"
                className={({ isActive }) =>
                    `nav-link ${isActive ? 'is-active' : ''}`
                }
            >
                Categories
            </NavLink>
            {isDropdownOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 22px)',
                    left: '-50px',
                    width: '180px', 
                    textAlign: 'center',
                    // backgroundColor: '#242629',
                    border: '1px solid #F97316',
                    borderRadius: '0.9rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#ebf1f7' }}>
                        {categories.map(category => (
                            <li key={category.id} style={{
                                padding: '0.5rem 0',
                                borderBottom: '1px solid #333',
                            }}>
                                <NavLink
                                    to={`/categories/${category.id}/products`}
                                    style={{ color: '#ebf1f7', textDecoration: 'none' }}
                                    className="block"
                                >
                                    <p className="hover:text-orange-500">{category.name}</p>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoriesDropdown;
