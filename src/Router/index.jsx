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
import { Layout } from '../Components/Layout';

const NotFoundPage = () => <Redirect to="/" />;
const AdminLogin = lazy(() => import('Pages/Admin/Login'));
const AdminDashboard = lazy(() => import('Pages/Admin/Dashboard'));
const AdminBanners = lazy(() => import('Pages/Admin/Banners'));
const AdminProductList = lazy(() => import('Pages/Admin/Products'));
const AdminProductEdit = lazy(() => import('Pages/Admin/ProductEdit'));
const AdminCategories = lazy(() => import('Pages/Admin/Categories'));
const AdminOptions = lazy(() => import('Pages/Admin/Options'));
const AdminOrder = lazy(() => import('Pages/Admin/Order'));
const AdminOrderProduct = lazy(() => import('Pages/Admin/OrderProduct'));
const Header = lazy(() => import('Components/Header/Header'));
const CheckboxFilter = lazy(() => import('Components/CheckboxFilter/CheckboxFilter'));
const OrderForm = lazy(() => import('Pages/Site/OrderForm'));
const Login = lazy(() => import('Components/Login/Login'));
const SignUp = lazy(() => import('Components/SignUp/SignUp'));
const SiteHome = lazy(() => import('Pages/Site/Home'));
const SiteProductDetails = lazy(() => import('Pages/Site/ProductDetails'));
const CardPopUp = lazy(() => import('Components/CardPopUp'));
const SearchResults = lazy(() => import('Components/SearchResults/searchResults'));
const Cart = lazy(() => import('Pages/Site/Cart'));
const UserAccount = lazy(() => import('Pages/UserAccount/UserAccount'));
const CheckboxFilterItem = lazy(() => import('Components/CheckboxFilterItem/CheckboxFilterItem'));
const CollectionList = lazy(() => import('Components/CollectionList'));
const CategoriesDetails = lazy(() => import('Pages/Site/CategoriesDetails'));

const RouterComponent = () => (
    <Router history={history}>
        <Suspense fallback={<h1>LOADING...</h1>}>
            <Switch>
                <Route path="/admin/dashboard" component={AdminDashboard} />
                <Route path="/admin/category" component={AdminCategories} />
                <Route path="/admin/banner" component={AdminBanners} />
                <Route exact path="/admin/products" component={AdminProductList} />
                <Route path="/admin/products/:id" component={AdminProductEdit} />
                <Route path="/admin/option" component={AdminOptions} />
                <Route path="/admin/order" component={AdminOrder} />
                <Route path="/admin/orderproduct" component={AdminOrderProduct} />
                <Route path="/admin/login" component={AdminLogin} />
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
                    <Route exact path="/collection" component={() => <CollectionList />} />
                    <Route exact path="/categoriesdetails" component={() => <CategoriesDetails />} />
                </Layout>

                <Route exact path="/orderForm" component={() => <OrderForm />} />
                <Route exact path="/" component={() => <Header />} />
                <Route exact path="/cardPopUp" component={() => <CardPopUp />} />

                <Route component={NotFoundPage} />
            </Switch>
        </Suspense>
    </Router>
);

export default memo(
    RouterComponent,
    (prevProps, nextProps) => isEqual(prevProps, nextProps),
);
