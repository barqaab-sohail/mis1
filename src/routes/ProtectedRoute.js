import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('auth_token'));
    useEffect(() => {
        setToken(localStorage.getItem('auth_token'));
    }, []);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
