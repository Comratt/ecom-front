import React, {
    Suspense, memo, lazy,
} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import history from 'Services/history';
import { AdminRoutes, PrivateAdminRoutes } from './AdminRoutes';
import { Layout } from '../Components/Layout';
import { ThreeDots } from '../Components/SkeletonLoader';

const NotFoundPage = () => <Redirect to="/" />;
const Header = lazy(() => import('Components/Header/Header'));
const CheckboxFilter = lazy(() => import('Components/CheckboxFilter/CheckboxFilter'));
const OrderForm = lazy(() => import('Pages/Site/OrderForm'));
const Login = lazy(() => import('Pages/Site/Login'));
const SignUp = lazy(() => import('Pages/Site/SignUp'));
const SiteHome = lazy(() => import('Pages/Site/Home'));
const SiteProductDetails = lazy(() => import('Pages/Site/ProductDetails'));
const CardPopUp = lazy(() => import('Components/CardPopUp'));
const SearchResults = lazy(() => import('Components/SearchResults/searchResults'));
const Cart = lazy(() => import('Pages/Site/Cart'));
const UserAccount = lazy(() => import('Pages/Site/UserAccount/UserAccount'));
const CollectionList = lazy(() => import('Pages/Site/collection'));
const WishList = lazy(() => import('Pages/Site/Wishlist'));
const AdminLogin = lazy(() => import('Pages/Admin/Login'));

const RouterComponent = () => (
    <Router history={history}>
        <Suspense fallback={<ThreeDots />}>
            <Switch>
                <Route exact path="/admin/login" component={() => <AdminLogin />} />
                <PrivateAdminRoutes path="/admin">
                    <AdminRoutes />
                </PrivateAdminRoutes>
                <Layout>
                    <Route exact path="/" component={SiteHome} />
                    <Route path="/products/:id" component={SiteProductDetails} />
                    <Route path="/cart" component={() => <Cart />} />
                    <Route path="/order" component={() => <OrderForm />} />
                    <Route path="/sign" component={() => <SignUp />} />
                    <Route path="/login" component={() => <Login />} />
                    <Route path="/searchResult" component={() => <SearchResults />} />
                    <Route path="/checkboxfilter" component={() => <CheckboxFilter />} />
                    <Route path="/account" component={() => <UserAccount />} />
                    <Route path="/collection/:id?" component={() => <CollectionList />} />
                    <Route path="/wishlist" component={() => <WishList />} />
                </Layout>

                <Route exact path="/orderForm" component={() => <OrderForm />} />
                <Route exact path="/" component={() => <Header />} />
                <Route exact path="/cardPopUp" component={() => <CardPopUp />} />

                <Route path="*" component={NotFoundPage} />
            </Switch>
        </Suspense>
    </Router>
);

export default memo(
    RouterComponent,
    (prevProps, nextProps) => isEqual(prevProps, nextProps),
);
