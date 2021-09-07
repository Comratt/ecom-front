import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    Heart, Logo, Menu, Search,
} from 'Icons';
import Cart from 'Icons/Cart';
import User from 'Icons/User';
import { useLayout } from 'hooks/useLayout';
import { Link } from '../Link';
import HeaderInput from '../HeaderInput/HeaderInput';

import './Header.css';

export const Header = ({ setNavigationMenu, handleOpenNavigationModal }) => {
    const {
        topNavState: {
            bordered,
            className,
            transparent,
            showMenuButton,
            hamburgerMenu,
            showLogo,
            title,
        },
    } = useLayout();

    useEffect(() => {
        if (hamburgerMenu) {
            setNavigationMenu(hamburgerMenu);
        }
    }, [hamburgerMenu]);

    const componentClasses = classNames(
        'lib-header',
        { header_transparent: transparent },
        { 'line-bottom': bordered },
        className,
    );

    return (
        <header className={componentClasses}>
            <div className="header-left-navigation">
                <button onClick={handleOpenNavigationModal} type="button" className="lib-header__btn menu">
                    <Menu
                        width={24}
                        height={24}
                    />
                </button>
                <button type="button" className="lib-header__btn header-search-second">
                    <Search
                        width={24}
                        height={24}
                    />
                </button>
                <ul className="header-list-navigation">
                    <li className="list-group">
                        <Link to="/">Whats New</Link>
                    </li>
                    <li className="list-group">
                        <Link to="/">Clothing & Shoes</Link>
                    </li>
                    <li className="list-group">
                        <Link to="/">Coming Soon</Link>
                    </li>
                    <li className="list-group">
                        <Link to="/">About</Link>
                    </li>
                </ul>
            </div>
            {showLogo && (
                <div className="header-main-logo">
                    <Logo isTransparent={transparent} />
                </div>
            )}
            <div className="header-right-menu">
                <HeaderInput />
                <div
                    className="header-links-icon dollar"
                    style={{
                        fontSize: '16px',
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        UAH
                    </span>
                </div>
                <a href="/" className="header-links-icon heart">
                    <Heart
                        width={24}
                        height={24}
                    />
                </a>
                <a href="/" className="header-links-icon">
                    <Cart
                        width={24}
                        height={24}
                    />
                </a>
                <a href="/" className="header-links-icon user">
                    <User
                        width={24}
                        height={24}
                    />
                </a>
            </div>
        </header>
    );
};
