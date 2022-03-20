import React from 'react';
import classNames from 'classnames';
import { Close, Search } from 'Icons';
import HeaderInput from '../HeaderInput/HeaderInput';

import { useLayout } from '../../hooks/useLayout';

import './SideBar.css';
import AccardionArrow from '../../Icons/AccardionArrow';

export const SideBar = ({ className }) => {
    const {
        navigationOverlayOpened,
        handleCloseNavigationModal,
    } = useLayout();

    const componentClasses = classNames('lib-sidebar', className, { open: navigationOverlayOpened });

    return (
        <div className={componentClasses}>
            <div className="lib-sidebar__header">
                <div className="header-search-field">
                    <Search width={25} height={25} />
                    <HeaderInput />
                    {/* <input placeholder="Search" className="header-search-field__input" type="text" /> */}
                </div>
                <button type="button" className="lib-sidebar__header-close">
                    <Close fill="var(--color-accent-light)" width={25} height={25} onClick={handleCloseNavigationModal} />
                </button>
            </div>
            <div className="lib-sidebar__content">
                <div className="lib-sidebar__content-wrapper">
                    <div className="lib-sidebar__item">
                        <div className="lib-sidebar__item-text">
                            <a href="#">
                                Sale
                            </a>
                        </div>
                        <div className="lib-sidebar__item-arrow">
                            <AccardionArrow fill="#887569" />
                        </div>
                    </div>
                </div>
                <div className="lib-sidebar__divide-block">
                    <div className="lib-sidebar__line" />
                </div>

                <div className="lib-sidebar__content-wrapper">
                    <div className="lib-sidebar__item">
                        <div className="lib-sidebar__item-text">
                            <a href="#">
                                Clothing & Shoes
                            </a>
                        </div>
                        <div className="lib-sidebar__item-arrow">
                            <AccardionArrow fill="#887569" />
                        </div>
                    </div>
                </div>
                <div className="lib-sidebar__divide-block">
                    <div className="lib-sidebar__line" />
                </div>

                <div className="lib-sidebar__content-wrapper">
                    <div className="lib-sidebar__item">
                        <div className="lib-sidebar__item-text">
                            <a href="#">
                                What's New
                            </a>
                        </div>
                        <div className="lib-sidebar__item-arrow">
                            <AccardionArrow fill="#887569" />
                        </div>
                    </div>
                </div>
                <div className="lib-sidebar__divide-block">
                    <div className="lib-sidebar__line" />
                </div>

                <div className="lib-sidebar__content-wrapper">
                    <div className="lib-sidebar__item">
                        <div className="lib-sidebar__item-text">
                            <a href="#">
                                About
                            </a>
                        </div>
                        <div className="lib-sidebar__item-arrow">
                            <AccardionArrow fill="#887569" />
                        </div>
                    </div>
                </div>
                <div className="lib-sidebar__divide-block">
                    <div className="lib-sidebar__line" />
                </div>

                <div className="lib-sidebar__content-wrapper">
                    <div className="lib-sidebar__item">
                        <div className="lib-sidebar__item-text">
                            <a href="#">
                                EUR
                            </a>
                        </div>
                        <div className="lib-sidebar__item-arrow">
                            <AccardionArrow fill="#887569" />
                        </div>
                    </div>
                </div>
                <div className="lib-sidebar__divide-block">
                    <div className="lib-sidebar__line" />
                </div>
            </div>
        </div>
    );
};
