import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const GuardedRoutes = ({ component: Component, auth, ...rest }) => (
    <Routes>
        <Route {...rest} render={(props) => (auth === true ? <Component {...props} /> : <Navigate to="/login" />)} />
    </Routes>
);

export default GuardedRoutes;
