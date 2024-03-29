import React, {
    Suspense, memo, lazy, Component,
} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import history from 'Services/history';
import { Layout } from '../Components/Layout';

const NotFoundPage = () => <Redirect to="/" />;
const AdminLogin = lazy(() => import('Pages/Admin/Login'));
const AdminDashboard = lazy(() => import('Pages/Admin/Dashboard'));
const AdminBanners = lazy(() => import('Pages/Admin/Banners'));
const AdminCategories = lazy(() => import('Pages/Admin/Categories'));
const AdminOptions = lazy(() => import('Pages/Admin/Options'));
const CheckboxFilter = lazy(() => import('Components/CheckboxFilter/CheckboxFilter'));
const OrderForm = lazy(() => import('Components/OrderForm/OrderForm'));
const SiteHome = lazy(() => import('Pages/Site/Home'));
const CardPopUp = lazy(() => import('Components/CardPopUp/CardPopUp'));
const SearchResults = lazy(() => import('Components/SearchResults/searchResults'));

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
                    <Route path="/" component={SiteHome} />
                </Layout>

                <Route exact path="/" component={() => <ProductInfo />} />
                <Route exact path="/orderForm" component={() => <OrderForm />} />
                <Route exact path="/" component={() => <Header />} />
                <Route exact path="/orderForm" component={() => <OrderForm />} />
                <Route exact path="/cardPopUp" component={() => <CardPopUp />} />
                <Route exact path="/" component={() => <ProductInfo />} />
                <Route exact path="/checkboxfilter" component={() => <CheckboxFilter />} />
                <Route exact path="/orderForm" component={() => <OrderForm />} />
                <Route exact path="/searchResult" component={() => <SearchResults />} />

                <Route component={NotFoundPage} />
            </Switch>
        </Suspense>
    </Router>
);

export default memo(
    RouterComponent,
    (prevProps, nextProps) => isEqual(prevProps, nextProps),
);
