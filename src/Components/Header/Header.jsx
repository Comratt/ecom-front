import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import HeaderHeart from 'Icons/HeaderHeart';
import Menu from 'Icons/Menu';
import Cart from 'Icons/Cart';
import User from 'Icons/User';
import { getCartQuantity } from 'Store/Modules/Cart/selectors';
import { getWishlistQuantity } from 'Store/Modules/Wishlist/selectors';

import { useLayout } from 'hooks/useLayout';
import imgBlack from '../../assets/img/logoblack.png';
import img from '../../assets/img/logo.png';
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
                <button
                    aria-label="Відкрити меню"
                    onClick={handleOpenNavigationModal}
                    type="button"
                    className="lib-header__btn menu header-links-icon"
                >
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
                        <Link to="/">
                            Одяг та взуття
                        </Link>
                        <HeaderListCollectionNews className="header-list-collection" />
                    </li>
                    <li className="list-group">
                        <Link to="/collection">Всі товари</Link>
                    </li>
                    <li className="list-group">
                        <Link to="/aboutcompany">Про нас</Link>
                    </li>
                </ul>
            </div>
            {showLogo && (
                <Link title="До головної сторінки" to="/" className="header-main-logo">
                    <h1>
                        {' '}
                        <img width={200} src={!transparent ? imgBlack : img} alt="kostumchek" className="header-main-logo-img" />
                    </h1>
                </Link>
            )}
            <div className="header-right-menu">
                <HeaderInput />
                <div
                    className="header-links-icon dollar"
                    style={{
                        fontSize: 'var(--fz-normal)',
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        UAH
                    </span>
                </div>
                <Link
                    title="Вподобані товари"
                    aria-label="Вподобані товари"
                    to="/wishlist"
                    className="header-links-icon heart"
                >
                    <HeaderHeart
                        width={20}
                        height={20}
                    />
                    {!!wishQuantity && <span className="cart-badge" aria-label={`Вподобаних товарів - ${wishQuantity}`}>{wishQuantity}</span>}
                </Link>
                <Link
                    title="Перейти в кошик"
                    aria-label="Перейти в кошик"
                    to="/cart"
                    className="header-links-icon cart"
                >
                    <Cart
                        width={26}
                        height={26}
                    />
                    {!!cartQuantity && <span className="cart-badge" aria-label={`Доданих в кошик товарів - ${cartQuantity}`}>{cartQuantity}</span>}
                </Link>
                <Link
                    title="Особистий кабінет"
                    aria-label="Особистий кабінет"
                    to="/account"
                    className="header-links-icon user"
                >
                    <User
                        width={24}
                        height={24}
                    />
                </Link>
            </div>
        </header>
    );
};
