import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { View } from '../View';
import { Header } from '../Header';
import { SideBar } from '../SideBar';

import { useLayout } from '../../hooks/useLayout';

import './Layout.css';

export const Layout = ({ children }) => {
    const {
        layoutState: { className },
        navigationOverlayOpened,
        handleCloseNavigationModal,
        handleOpenNavigationModal,
        navigationMenu,
        setNavigationMenu,
    } = useLayout();

    const componentClasses = classNames(
        'layout',
        className,
    );

    return (
        <View className="layout-wrapper">
            <section className={componentClasses}>
                <Header
                    handleOpenNavigationModal={handleOpenNavigationModal}
                    setNavigationMenu={setNavigationMenu}
                />
                <SideBar />
                <main className="layout__content-wrapper">
                    <View className="layout__content">
                        {children}
                    </View>
                </main>
            </section>

            <View id="modal-root" />
            <View id="tooltip-root" />
        </View>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
