
import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const PrivateRoutes = () => {
    const { user } = useContext(UserContext); 

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
