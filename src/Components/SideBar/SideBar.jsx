import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import Close from 'Icons/Close';
import Facebook from 'Icons/Facebook';
import Instagram from 'Icons/Instagram';
import Telegram from 'Icons/Telegram';
import Viber from 'Icons/Viber';
import { useCategories } from 'context/CategoriesWrapper/useCategories';
import { adaptCategories } from 'context/adapters';
import { clearFilters } from 'Store/Modules/Filters/filtersActions';
import { isLoggedIn } from 'Store/Modules/LocalSettings/selectors';
import AccardionArrow from 'Icons/AccardionArrow';
import HeaderInput from '../HeaderInput/HeaderInput';
import { useLayout } from '../../hooks/useLayout';

import './SideBar.css';
import { Link } from '../Link';
import { Accordion, AccordionItem } from '../Accordion';
import { Title } from '../Title';

const buildHierarchy = (data, parentId = null) => {
    const result = [];

    for (const key in data) {
        const category = data[key];

        if (category.parent_id === parentId) {
            const subcategories = buildHierarchy(data, category.category_id);
            const newCategory = {
                ...category,
                subcategory: subcategories,
            };

            result.push(newCategory);
        }
    }

    return result.sort((a, b) => a.sort_order - b.sort_order);
};

export const SideBar = ({ className }) => {
    const dispatch = useDispatch();
    const isLogged = useSelector(isLoggedIn);
    const {
        navigationOverlayOpened,
        handleCloseNavigationModal,
    } = useLayout();
    const {
        categories,
    } = useCategories();
    const adaptedCategories = buildHierarchy(categories).filter((item) => item.subcategory.length > 0);

    const [selectedCategory, setSelectedCategory] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const getToCollection = (id) => `/collection/${id}`;

    const onLinkClick = () => {
        handleCloseNavigationModal();
        dispatch(clearFilters());
    };

    const handleCategoryClick = (category) => {
        if (category.subcategory.length === 0) {
            setSelectedCategory(false);
            setCurrentCategory(null);
            onLinkClick();
        } else {
            setSelectedCategory(true);
            setCurrentCategory(category);
        }
    };

    const handleBackClick = () => {
        setSelectedCategory(false);
        setCurrentCategory(null);
    };

    const renderCategories = (categoryList) => (
        <ul className="header-list-collection-woman">
            {categoryList.map((category) => (
                <li key={category.category_id} className="main" onClick={() => handleCategoryClick(category)}>
                    {category.subcategory.length === 0 ? (
                        <Link to={getToCollection(category.category_id)}>
                            {category.category_name}
                        </Link>
                    ) : (
                        <span className="lib-link">{category.category_name}</span>
                    )}
                    {category.subcategory.length > 0 && (
                        <div className="header-list-collection-woman-arrow">
                            <AccardionArrow width={20} />
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    const componentClasses = classNames('lib-sidebar', className, { open: navigationOverlayOpened });

    return (
        <aside className={componentClasses}>
            <div className="lib-sidebar__header">
                <div className="header-search-field">
                    <HeaderInput />
                </div>
                <button aria-label="Закрити меню" type="button" className="lib-sidebar__header-close">
                    <Close fill="var(--color-accent-light)" width={25} height={25} onClick={onLinkClick} />
                </button>
            </div>
            <div className="lib-sidebar__content">
                <div className="lib-sidebar__content-wrapper">
                    <div className="header-list-collection-item">
                        {!selectedCategory && renderCategories(adaptedCategories)}
                        {selectedCategory && (
                            <ul className="header-list-collection-woman">
                                <li className="main" onClick={handleBackClick}>
                                    <div className="header-list-collection-woman-arrow-btn">
                                        <AccardionArrow transform="rotate(30deg)" width={20} />
                                    </div>
                                </li>
                                {currentCategory && renderCategories(currentCategory.subcategory)}
                            </ul>
                        )}
                    </div>
                    <ul className="header-list-collection-woman">
                        <li>
                            <Link to={getToCollection(31)} onClick={onLinkClick}>
                                Вишиванки
                            </Link>
                        </li>
                        <li>
                            <Link to={getToCollection(46)} onClick={onLinkClick}>
                                Sale
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="lib-sidebar__content-wrapper">
                    <Accordion>
                        <AccordionItem
                            label={(
                                <span className="lib-sidebar__item">
                                    Про нас
                                </span>
                            )}
                            index={1}
                        >
                            <div className="lib-sidebar__item">
                                <label className="checkbox">
                                    <Link to="/aboutcompany" onClick={onLinkClick}>Хто ми</Link>
                                </label>
                            </div>
                            <div className="lib-sidebar__item">
                                <label className="checkbox">
                                    <Link to="contacts" onClick={onLinkClick}>Де нас знайти</Link>
                                </label>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="lib-sidebar__content-wrapper">
                    <Accordion>
                        <AccordionItem
                            label={(
                                <span className="lib-sidebar__item">
                                    Кабінет користувача
                                </span>
                            )}
                            index={1}
                        >
                            {isLogged ? (
                                <>
                                    <div className="lib-sidebar__item">
                                        <Link to="/account" onClick={onLinkClick}>
                                            Мій аккаунт
                                        </Link>
                                    </div>
                                    <div className="lib-sidebar__item">
                                        <Link to="/account#orders" onClick={onLinkClick}>
                                            Мої замовлення
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="lib-sidebar__item">
                                        <Link to="/account" onClick={onLinkClick}>
                                            Вхід в кабінет
                                        </Link>
                                    </div>
                                    <div className="lib-sidebar__item">
                                        <Link to="/sign" onClick={onLinkClick}>
                                            Реєстрація
                                        </Link>
                                    </div>
                                </>
                            )}
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="lib-sidebar__content-wrapper">
                    <div className="lib-sidebar__item">
                        <div className="lib-sidebar__item-text">
                            <a href="#">
                                UAH
                            </a>
                        </div>
                    </div>
                </div>
                <div className="lib-sidebar__content-wrapper">
                    <div className="lib-sidebar__item sidebar-social__wrapper">
                        <Title type={3}>Ми в соціальних мережах</Title>
                        <ul className="sidebar-social">
                            <li>
                                <a className="sidebar-social__facebook" rel="noreferrer" target="_blank" href="https://www.facebook.com/Kostumchek/">
                                    <Facebook height="18" width="18" />
                                </a>
                            </li>
                            <li>
                                <a className="sidebar-social__instagram" rel="noreferrer" target="_blank" href="https://instagram.com/kostumchek_official?igshid=YmMyMTA2M2Y=">
                                    <Instagram height="18" width="18" />
                                </a>
                            </li>
                            <li>
                                <a className="sidebar-social__telegram" rel="noreferrer" target="_blank" href="https://t.me/kostumchek_official">
                                    <Telegram height="18" width="18" />
                                </a>
                            </li>
                            <li>
                                <a className="sidebar-social__viber" href="#">
                                    <Viber height="18" width="18" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};
