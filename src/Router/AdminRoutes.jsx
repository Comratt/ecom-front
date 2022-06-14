import React, { lazy, useEffect } from 'react';
import {
    Route,
    Redirect,
    Switch,
    useRouteMatch,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getIsAdmin, getUserExpireDate } from 'Store/Modules/LocalSettings/selectors';
import { logout } from 'Store/Modules/LocalSettings/localSettingsActions';

const AdminDashboard = lazy(() => import('Pages/Admin/Dashboard'));
const AdminBanners = lazy(() => import('Pages/Admin/Banners'));
const AdminProductList = lazy(() => import('Pages/Admin/Products'));
const AdminProductEdit = lazy(() => import('Pages/Admin/ProductAddEdit'));
const AdminCategories = lazy(() => import('Pages/Admin/Categories'));
const AdminOptions = lazy(() => import('Pages/Admin/Options'));
const AdminOrder = lazy(() => import('Pages/Admin/Order'));
const AdminOrderProduct = lazy(() => import('Pages/Admin/OrderProduct'));
const AdminViewProducts = lazy(() => import('Pages/Admin/ViewProducts'));

export const AdminRoutes = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/dashboard`} component={AdminDashboard} />
            <Route path={`${path}/category`} component={AdminCategories} />
            <Route path={`${path}/banner`} component={AdminBanners} />
            <Route exact path={`${path}/products`} component={AdminProductList} />
            <Route path={`${path}/products/:id`} component={AdminProductEdit} />
            <Route path={`${path}/product/add`} component={(props) => <AdminProductEdit isFromAdd {...props} />} />
            <Route path={`${path}/option`} component={AdminOptions} />
            <Route exact path={`${path}/order`} component={AdminOrder} />
            <Route path={`${path}/order/:id`} component={AdminOrderProduct} />
            <Route path={`${path}/viewproducts`} component={AdminViewProducts} />
            <Route
                path="*"
                component={() => (
                    <Redirect
                        to={{
                            pathname: '/admin/dashboard',
                        }}
                    />
                )}
            />
        </Switch>
    );
};

export const PrivateAdminRoutes = ({ children, ...rest }) => {
    const isAdmin = useSelector(getIsAdmin);
    const userExpiredDate = useSelector(getUserExpireDate);
    const isNotExpired = userExpiredDate > moment();

    return (
        <Route
            {...rest}
            render={({ location }) => ((isAdmin && isNotExpired) ? (
                children
            ) : <RedirectAndLogout location={location} />)}
        />
    );
};

export const RedirectAndLogout = ({ location }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    }, []);

    return (
        <Redirect
            to={{
                pathname: '/admin/login',
                state: { from: location },
            }}
        />
    );
};
