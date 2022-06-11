import React from 'react';
import classNames from 'classnames';
import { Close } from 'Icons';
import { useCategories } from 'context/CategoriesWrapper/useCategories';
import { adaptCategories } from 'context/adapters';
import HeaderInput from '../HeaderInput/HeaderInput';

import { useLayout } from '../../hooks/useLayout';

import './SideBar.css';
import { Link } from '../Link';
import { Accordion, AccordionItem } from '../Accordion';

export const SideBar = ({ className }) => {
    const {
        navigationOverlayOpened,
        handleCloseNavigationModal,
    } = useLayout();
    const {
        categories,
    } = useCategories();

    const componentClasses = classNames('lib-sidebar', className, { open: navigationOverlayOpened });

    return (
        <div className={componentClasses}>
            <div className="lib-sidebar__header">
                <div className="header-search-field">
                    <HeaderInput />
                </div>
                <button type="button" className="lib-sidebar__header-close">
                    <Close fill="var(--color-accent-light)" width={25} height={25} onClick={handleCloseNavigationModal} />
                </button>
            </div>
            <div className="lib-sidebar__content">
                <div className="lib-sidebar__content-wrapper">
                    <Accordion>
                        {adaptCategories(categories).map(({ id, name, subcategories }) => (
                            <AccordionItem
                                label={subcategories?.length ? (
                                    <span className="lib-sidebar__item">
                                        {name}
                                    </span>
                                ) : (
                                    <Link
                                        to={`/collection/${id}`}
                                        className="lib-sidebar__item"
                                        onClick={handleCloseNavigationModal}
                                    >
                                        <span>{name}</span>
                                    </Link>
                                )}
                                key={id}
                                index={id}
                                hideArrow={!subcategories?.length}
                            >
                                {subcategories.map((subcategory) => (
                                    <Link
                                        to={`/collection/${id}?category[]=${subcategory.category_id}`}
                                        key={subcategory.category_id}
                                        className="lib-sidebar__item"
                                        onClick={handleCloseNavigationModal}
                                    >
                                        <span>{subcategory.category_name}</span>
                                    </Link>
                                ))}
                            </AccordionItem>
                        ))}
                    </Accordion>
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
                            <div className="lib-sidebar__item">
                                <Link to="/account" onClick={handleCloseNavigationModal}>
                                    Вхід в кабінет
                                </Link>
                            </div>
                            <div className="lib-sidebar__item">
                                <Link to="/signup" onClick={handleCloseNavigationModal}>
                                    Реєстрація
                                </Link>
                            </div>
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
            </div>
        </div>
    );
};
