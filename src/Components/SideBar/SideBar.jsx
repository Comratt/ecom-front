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

    return result;
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
    const [subCategoryIndex, setSubCategoryIndex] = useState(null);
    const getToCollection = (id) => `/collection/${id}`;

    const [subCategory, setSubCategory] = useState({ subcategories: [] });

    useEffect(() => {
        if (subCategoryIndex === 43) {
            setSubCategory(() => adaptedCategories.find((item) => item.category_id === 36)?.subcategory.find((item) => item.category_id === 43));
        } else {
            setSubCategory(() => adaptedCategories.find((_, index) => index === subCategoryIndex));
        }
    }, [setSubCategoryIndex, subCategoryIndex]);

    const componentClasses = classNames('lib-sidebar', className, { open: navigationOverlayOpened });
    const onLinkClick = () => {
        handleCloseNavigationModal();
        dispatch(clearFilters());
    };

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
                        {!selectedCategory && (
                            <ul className="header-list-collection-woman">
                                {adaptedCategories.map(({ category_name, id }, index) => (
                                    <>
                                        <li
                                            key={id}
                                            onClick={() => {
                                                setSelectedCategory(true);
                                                setSubCategoryIndex(index);
                                            }}
                                            className="main"
                                        >
                                            {category_name}
                                            <div className="header-list-collection-woman-arrow">
                                                <AccardionArrow width={20} />
                                            </div>
                                        </li>
                                    </>
                                ))}
                                <li>
                                    <Link
                                        to={getToCollection(34)}
                                        className="header-list-collection-woman-sale"
                                        onClick={onLinkClick}
                                    >
                                        Sale
                                    </Link>
                                </li>
                            </ul>
                        )}
                        {selectedCategory && (
                            <ul className="header-list-collection-woman">
                                <li
                                    className="main"
                                    onClick={() => {
                                        setSelectedCategory(false);
                                        setSubCategoryIndex(null);
                                    }}
                                >
                                    <div className="header-list-collection-woman-arrow-btn">
                                        <AccardionArrow
                                            transform="rotate(30deg)"
                                            width={20}
                                        />
                                    </div>
                                </li>
                                <>
                                    {subCategory?.subcategory?.map(
                                        ({ category_id, category_name }) => (
                                            <li
                                                className="main"
                                                onClick={() => {
                                                    if (category_id === 43) {
                                                        setSubCategoryIndex(category_id);
                                                    }
                                                }}
                                            >
                                                <Link
                                                    to={getToCollection(category_id)}
                                                    onClick={onLinkClick}
                                                >
                                                    {category_name}
                                                </Link>
                                                {category_id === 43 && (
                                                    <div className="header-list-collection-woman-arrow">
                                                        <AccardionArrow width={20} />
                                                    </div>
                                                )}
                                            </li>
                                        ),
                                    )}
                                </>
                            </ul>
                        )}
                    </div>
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
