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
import HeaderInput from '../HeaderInput/HeaderInput';

import { useLayout } from '../../hooks/useLayout';

import './SideBar.css';
import { Link } from '../Link';
import { Accordion, AccordionItem } from '../Accordion';
import { Title } from '../Title';
import HeaderListCollectionNews from 'Components/HeaderListCollectionNews/HeaderListCollectionNews';
import AccardionArrow from 'Icons/AccardionArrow';

const adaptParentCategories = (data = []) => {
    if (!Array.isArray(data)) {
        return { withSub: [], withoutSub: [] };
    }

    return data.reduce(
        (acc, item) => {
            if (item?.subcategories?.length) {
                return {
                    ...acc,
                    withSub: [...acc.withSub, item],
                };
            }

            return {
                ...acc,
                withoutSub: [...acc.withoutSub, item],
            };
        },
        { withSub: [], withoutSub: [] },
    );
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
    const adaptedCategories = adaptParentCategories(adaptCategories(categories));

    const [selectedCategory, setSelectedCategory] = useState(false);
    const [subCategoryIndex, setSubCategoryIndex] = useState(null);
    const getToCollection = (id) => `/collection/${id}`;

    const [subCategory, setSubCategory] = useState({ subcategories: [] });

    useEffect(() => {
        setSubCategory(() => adaptedCategories.withSub.find((_, index) => index === subCategoryIndex));
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
                                <li>
                                    <Link to={getToCollection(34)} className="header-list-collection-woman-sale">
                                        Sale
                                    </Link>
                                </li>
                                {adaptedCategories.withSub.map(({ name, id }, index) => (
                                    <>
                                        <li
                                            key={id}
                                            onClick={() => {
                                                setSelectedCategory(true);
                                                setSubCategoryIndex(index);
                                            }}
                                            className="main"
                                        >
                                            {name}
                                            <div className="header-list-collection-woman-arrow">
                                                <AccardionArrow width={20} />
                                            </div>
                                        </li>
                                    </>
                                ))}
                            </ul>
                        )}
                        {selectedCategory && (
                            <ul className="header-list-collection-woman">
                                <li className="main">
                                    <div className="header-list-collection-woman-arrow-btn">
                                        <AccardionArrow
                                            transform="rotate(30deg)"
                                            width={20}
                                            onClick={() => {
                                                setSelectedCategory(false);
                                                setSubCategoryIndex(null);
                                            }}
                                        />
                                    </div>
                                </li>
                                <>
                                    {subCategory?.subcategories?.map(
                                        ({ category_id, category_name }) => (
                                            <li className="main">
                                                <Link to={getToCollection(category_id)}>
                                                    {category_name}
                                                </Link>
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
                                    <span>Хто ми</span>
                                </label>
                            </div>
                            <div className="lib-sidebar__item">
                                <label className="checkbox">
                                    <span>Де нас знайти</span>
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
                            {/* <li>
                                <a className="sidebar-social__facebook" rel="noreferrer" target="_blank" href="https://www.facebook.com/Kostumchek/">
                                    <Facebook height="18" width="18" />
                                </a>
                            </li> */}
                            <li>
                                <a className="sidebar-social__instagram" rel="noreferrer" target="_blank" href="https://www.instagram.com/pulse.cv/">
                                    <Instagram height="18" width="18" />
                                </a>
                            </li>
                            <li>
                                <a className="sidebar-social__telegram" rel="noreferrer" target="_blank" href="https://t.me/+1cik1Q3L0rxiNGQ6">
                                    <Telegram height="18" width="18" />
                                </a>
                            </li>
                            {/* <li>
                                <a className="sidebar-social__viber" href="#">
                                    <Viber height="18" width="18" />
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};
