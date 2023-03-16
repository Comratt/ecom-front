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
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

import CardPopUp from 'Components/CardPopUp';
import { CategoriesWrapperProvider } from 'context/CategoriesWrapper/categoriesWrapperContext';
import { AdminRoutes, PrivateAdminRoutes } from './AdminRoutes';
import { Layout } from '../Components/Layout';
import { ThreeDots } from '../Components/SkeletonLoader';

const NotFoundPage = () => <Redirect to="/" />;
const CheckboxFilter = lazy(() => import('Components/CheckboxFilter/CheckboxFilter'));
const OrderForm = lazy(() => import('Pages/Site/OrderForm'));
const Login = lazy(() => import('Pages/Site/Login'));
const SignUp = lazy(() => import('Pages/Site/SignUp'));
const SiteHome = lazy(() => import('Pages/Site/Home'));
const SiteProductDetails = lazy(() => import('Pages/Site/ProductDetails'));
const SearchResults = lazy(() => import('Components/SearchResults/searchResults'));
const Cart = lazy(() => import('Pages/Site/Cart'));
const UserAccount = lazy(() => import('Pages/Site/UserAccount/UserAccount'));
const CollectionList = lazy(() => import('Pages/Site/collection'));
const WishList = lazy(() => import('Pages/Site/Wishlist'));
const OrderFinaly = lazy(() => import('Pages/Site/OrderFinaly'));
const AdminLogin = lazy(() => import('Pages/Admin/Login'));
const AboutCompany = lazy(() => import('Pages/Site/AboutCompany'));
const AboutCompanyDelivery = lazy(() => import('Pages/Site/AboutCompany/Delivery'));
const AboutCompanyReturns = lazy(() => import('Pages/Site/AboutCompany/Returns'));
const Contact = lazy(() => import('Pages/Site/Contacts/Contacts'));

const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '5px',
    transition: transitions.SCALE,
};
const containerStyle = {
    marginTop: 60,
    zIndex: 999,
};

const RouterComponent = () => (
    <Router>
        <AlertProvider template={CardPopUp} {...options} containerStyle={containerStyle}>
            <Suspense fallback={<ThreeDots />}>
                <Switch>
                    <Route exact path="/admin/login" component={() => <AdminLogin />} />
                    <PrivateAdminRoutes path="/admin">
                        <AdminRoutes />
                    </PrivateAdminRoutes>
                    <CategoriesWrapperProvider>
                        <Layout>
                            <Route exact path="/" component={SiteHome} />
                            <Route path="/products/:id" component={SiteProductDetails} />
                            <Route exact path="/collection/:id?" component={() => <CollectionList />} />
                            <Route path="/cart" component={() => <Cart />} />
                            <Route path="/order" component={() => <OrderForm />} />
                            <Route path="/sign" component={() => <SignUp />} />
                            <Route path="/login" component={() => <Login />} />
                            <Route path="/searchResult" component={() => <SearchResults />} />
                            <Route path="/checkboxfilter" component={() => <CheckboxFilter />} />
                            <Route path="/account" component={() => <UserAccount />} />
                            <Route path="/wishlist" component={() => <WishList />} />
                            <Route path="/orderfinaly" component={() => <OrderFinaly />} />
                            <Route path="/aboutcompany" component={() => <AboutCompany />} />
                            <Route path="/delivery" component={() => <AboutCompanyDelivery />} />
                            <Route path="/returns" component={() => <AboutCompanyReturns />} />
                            <Route path="/contacts" component={() => <Contact />} />
                        </Layout>
                    </CategoriesWrapperProvider>
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </Suspense>
        </AlertProvider>
    </Router>
);

export default memo(
    RouterComponent,
    (prevProps, nextProps) => isEqual(prevProps, nextProps),
);
