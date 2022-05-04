import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import {
    Heart, Logo, Menu,
} from 'Icons';
import Cart from 'Icons/Cart';
import User from 'Icons/User';

import { getCartQuantity } from 'Store/Modules/Cart/selectors';
import { getWishlistQuantity } from 'Store/Modules/Wishlist/selectors';

import { useLayout } from 'hooks/useLayout';
import { Link } from '../Link';
import HeaderInput from '../HeaderInput/HeaderInput';
import HeaderListCollectionNews from '../HeaderListCollectionNews/HeaderListCollectionNews';

import './Header.css';

export const Header = ({ setNavigationMenu, handleOpenNavigationModal }) => {
    const [hoverItem, setHoverItem] = useState(false);
    const {
        topNavState: {
            bordered,
            className,
            transparent,
            hamburgerMenu,
            showLogo,
        },
    } = useLayout();
    const cartQuantity = useSelector(getCartQuantity);
    const wishQuantity = useSelector(getWishlistQuantity);

    useEffect(() => {
        if (hamburgerMenu) {
            setNavigationMenu(hamburgerMenu);
        }
    }, [hamburgerMenu]);

    const componentClasses = classNames(
        'lib-header',
        { header_transparent: transparent && !hoverItem },
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
                <ul className="header-list-navigation">
                    <li
                        className="list-group"
                        onMouseEnter={() => setHoverItem(true)}
                        onMouseLeave={() => setHoverItem(false)}
                    >
                        <Link to="/">Whats New</Link>
                        <HeaderListCollectionNews className="header-list-collection" />
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
                <Link to="/" className="header-main-logo">
                    <Logo isTransparent={transparent} />
                </Link>
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
                    {!!wishQuantity && <div className="cart-badge">{wishQuantity}</div>}
                </a>
                <Link to="/cart" className="header-links-icon cart">
                    <Cart
                        width={24}
                        height={24}
                    />
                    {!!cartQuantity && <div className="cart-badge">{cartQuantity}</div>}
                </Link>
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
