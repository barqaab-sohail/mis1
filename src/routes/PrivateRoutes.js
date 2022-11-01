import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    let auth = { token: false };
    return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

// const PrivateRoutes = ({ children, ...rest }) => {
//     let auth = { token: false };
//     return <Route {...rest}>{!auth.token ? <Navigate to="/login" /> : children}</Route>;
// };

export default PrivateRoutes;
