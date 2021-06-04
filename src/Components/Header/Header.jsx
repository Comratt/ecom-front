import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    Heart, Logo, Menu, Search,
} from 'Icons';
import './Header.css';
import Cart from '../../Icons/Cart';
import User from '../../Icons/User';
import HeaderInput from '../HeaderInput/HeaderInput';

const Header = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-header',
        className,
    );

    return (
        <div className="content">
            <header className={componentClasses}>
                <div className="header-left-navigation">
                    <Menu
                        className="menu"
                        width={24}
                        height={24}
                    />
                    <Search
                        className="header-search-second"
                        width={24}
                        height={24}
                    />
                    <ul className="header-list-navigation">
                        <li className="list-group">
                            Whats New
                        </li>
                        <li className="list-group">
                            Clothing & Shoes
                        </li>
                        <li className="list-group">
                            Coming Soon
                        </li>
                        <li className="list-group">
                            About
                        </li>
                    </ul>
                </div>
                <div className="header-main-logo">
                    <Logo />
                </div>
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
                    <a href="/" className="header-links-icon">
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
        </div>
    );
};

export default Header;
