import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../shared/hooks/use-auth';
import {AUTH_SIGN_IN_ROUTE} from "../../shared/constants"; // Предполагается, что у вас есть такой хук

interface ProtectedRouteProps {
    redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = AUTH_SIGN_IN_ROUTE}) => {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;