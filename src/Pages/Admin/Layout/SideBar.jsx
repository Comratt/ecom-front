import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useDetectedMobileDevice } from 'hooks/useDetectMobileDevice';
import { menuItems } from './constants';

const SideBar = ({ isSidebarOpen }) => {
    const { isTabletSize } = useDetectedMobileDevice();

    return (
        <nav id="sidebarMenu" className={classNames('nav__cont', { open: (isSidebarOpen || !isTabletSize), close: (!isSidebarOpen && isTabletSize) })}>
            <ul className="nav">
                {menuItems.map((menuItem) => (
                    <li key={menuItem.key} className="nav__items ">
                        {menuItem.icon}
                        <NavLink to={menuItem.link}>{menuItem.name}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SideBar;
