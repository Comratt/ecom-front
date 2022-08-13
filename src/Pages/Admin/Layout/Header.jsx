import React from 'react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from 'Store/Modules/LocalSettings/localSettingsActions';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    const dispatch = useDispatch();
    const logout = () => dispatch(logoutAction());

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Ecommerce</a>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Поиск..." aria-label="Search" />
            <button
                onClick={toggleSidebar}
                className="navbar-toggler px-3 d-md-none collapsed ml-2"
                type="button"
                data-toggle="collapse"
                data-target="#sidebarMenu"
                aria-controls="sidebarMenu"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <ul className="ml-2 navbar-nav px-3 d-none d-md-block">
                <li className="nav-item text-nowrap">
                    <button className="nav-link logout-btn-admin" type="button" onClick={logout}>Вихід</button>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
