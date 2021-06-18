import React from 'react';
import classNames from 'classnames';

import { Close, Search } from 'Icons';
import { useLayout } from '../../hooks/useLayout';

import './SideBar.css';

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
                    <input placeholder="Search" className="header-search-field__input" type="text" />
                </div>
                <button type="button" className="lib-sidebar__header-close">
                    <Close fill="var(--color-accent-light)" width={25} height={25} onClick={handleCloseNavigationModal} />
                </button>
            </div>
            <div className="lib-sidebar__content">
            </div>
        </div>
    );
};
