import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useDetectedMobileDevice } from 'hooks/useDetectMobileDevice';
import { menuItems } from './constants';

const SideBar = ({ isSidebarOpen }) => {
    const { isTabletSize } = useDetectedMobileDevice();

    return (
        <nav id="sidebarMenu" className={classNames('col-md-3 col-lg-2 bg-light sidebar', { open: (isSidebarOpen || !isTabletSize), close: (!isSidebarOpen && isTabletSize) })}>
            <div className="sidebar-sticky pt-3">
                <ul className="nav flex-column">
                    {menuItems.map((menuItem) => (
                        <li key={menuItem.key} className="nav-item">
                            <NavLink activeClassName="active" to={menuItem.link} className="nav-link">
                                <span data-feather="home" />
                                {menuItem.name}
                                {' '}
                                <span className="sr-only">(current)</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Saved reports</span>
                    <a
                        className="d-flex align-items-center text-muted"
                        href="#"
                        aria-label="Add a new report"
                    >
                        <span data-feather="plus-circle" />
                    </a>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span data-feather="file-text" />
                            Current month
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span data-feather="file-text" />
                            Last quarter
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span data-feather="file-text" />
                            Social engagement
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span data-feather="file-text" />
                            Year-end sale
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default SideBar;
