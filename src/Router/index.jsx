import React, { Suspense, memo, lazy } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import history from 'Services/history';
import { Layout } from '../Components/Layout';
import { Card } from '../Components/Card';

const NotFoundPage = () => <Redirect to="/" />;
const AdminLogin = lazy(() => import('Pages/Admin/Login'));
const AdminDashboard = lazy(() => import('Pages/Admin/Dashboard'));
const AdminBanners = lazy(() => import('Pages/Admin/Banners'));
const AdminCategories = lazy(() => import('Pages/Admin/Categories'));
const AdminOptions = lazy(() => import('Pages/Admin/Options'));

const RouterComponent = () => (
    <Router history={history}>
        <Suspense fallback={<h1>LOADING...</h1>}>
            <Switch>
                <Route path="/admin/dashboard" component={AdminDashboard} />
                <Route path="/admin/category" component={AdminCategories} />
                <Route path="/admin/banner" component={AdminBanners} />
                <Route path="/admin/option" component={AdminOptions} />
                <Route path="/admin/login" component={AdminLogin} />
                <Layout>
                    <Route path="/" component={() => <Card />} />
                </Layout>
                <Route component={NotFoundPage} />
            </Switch>
        </Suspense>
    </Router>
);

export default memo(
    RouterComponent,
    (prevProps, nextProps) => isEqual(prevProps, nextProps),
);
