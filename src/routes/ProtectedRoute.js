import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('userName'));
    useEffect(() => {
        setUser(localStorage.getItem('userName'));
    }, []);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
