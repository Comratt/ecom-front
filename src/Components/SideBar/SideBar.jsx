import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Close } from 'Icons';
import { useCategories } from 'context/CategoriesWrapper/useCategories';
import { adaptCategories } from 'context/adapters';
import { clearFilters } from 'Store/Modules/Filters/filtersActions';
import HeaderInput from '../HeaderInput/HeaderInput';

import { useLayout } from '../../hooks/useLayout';

import './SideBar.css';
import { Link } from '../Link';
import { Accordion, AccordionItem } from '../Accordion';

export const SideBar = ({ className }) => {
    const dispatch = useDispatch();
    const {
        navigationOverlayOpened,
        handleCloseNavigationModal,
    } = useLayout();
    const {
        categories,
    } = useCategories();

    const componentClasses = classNames('lib-sidebar', className, { open: navigationOverlayOpened });
    const onLinkClick = () => {
        handleCloseNavigationModal();
        dispatch(clearFilters());
    };

    return (
        <div className={componentClasses}>
            <div className="lib-sidebar__header">
                <div className="header-search-field">
                    <HeaderInput />
                </div>
                <button type="button" className="lib-sidebar__header-close">
                    <Close fill="var(--color-accent-light)" width={25} height={25} onClick={onLinkClick} />
                </button>
            </div>
            <div className="lib-sidebar__content">
                <div className="lib-sidebar__content-wrapper">
                    <Accordion>
                        <AccordionItem
                            label={(
                                <Link
                                    to="/collection"
                                    className="lib-sidebar__item"
                                    onClick={onLinkClick}
                                >
                                    <span>Всі товари</span>
                                </Link>
                            )}
                            hideArrow
                        />
                        {adaptCategories(categories).map(({ id, name }) => (
                            <AccordionItem
                                label={(
                                    <Link
                                        to={`/collection/${id}`}
                                        className="lib-sidebar__item"
                                        onClick={onLinkClick}
                                    >
                                        <span>{name}</span>
                                    </Link>
                                )}
                                key={id}
                                index={id}
                                hideArrow
                            />
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
                                <Link to="/account" onClick={onLinkClick}>
                                    Вхід в кабінет
                                </Link>
                            </div>
                            <div className="lib-sidebar__item">
                                <Link to="/sign" onClick={onLinkClick}>
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
