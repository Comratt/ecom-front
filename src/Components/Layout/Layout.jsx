import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Phone from 'Icons/Phone';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { View } from '../View';
import { Header } from '../Header';
import { SideBar } from '../SideBar';
import { Footer } from '../Footer';

import { useLayout } from '../../hooks/useLayout';

import './Layout.css';

export const Layout = ({ children }) => {
    const history = useHistory();
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
            <div className="call-menu-wrapper">
                <button className="call-menu" type="button">
                    <a href="tel:+380 (68) 807 12 47" className="call-menu-animation">
                        <Phone width={30} />
                    </a>
                </button>
            </div>
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
                <Footer />
            </section>

            <View id="modal-root" />
            <View id="tooltip-root" />
        </View>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
