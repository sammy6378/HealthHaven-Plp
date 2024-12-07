import { Link, useRouteError, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { ArrowLeft } from 'lucide-react';
import { RootState } from "../../../store/Store";
import { logout } from "../../../forms/Auth/UserSlice";
import { clearAdmin } from "../../../forms/Auth/AdminSlice";

function Error() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error: { statusText?: string, message?: string } = useRouteError() as { statusText?: string, message?: string };

    const { isAuthenticated: isUserAuthenticated } = useSelector((state: RootState) => state.auth);
    const { isAuthenticated: isAdminAuthenticated } = useSelector((state: RootState) => state.adminAuth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearAdmin());
        navigate('/login');
    };

    const goBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            navigate('/');
        }
    };

    return (
        <div className="py-10 bg-base-100">
            <div className="text-center">
                <p className="text-base font-semibold text-red-500">404</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-green-300 sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-600">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <p>{error?.statusText || error.message}</p>
                <div className="mt-4 flex items-center justify-center gap-x-3">
                    <button
                        onClick={goBack}
                        className="inline-flex items-center btn btn-sm btn-info text-sm font-semibold"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Go back
                    </button>
                    <Link to="/contact-us" className="rounded-md btn btn-primary btn-sm text-sm font-semibold">
                        Contact us
                    </Link>
                    {isUserAuthenticated || isAdminAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="rounded-md btn btn-warning btn-sm text-sm font-semibold"
                        >
                            Logout
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Error;
