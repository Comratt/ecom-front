import React, { useState, useCallback } from 'react';
import classNames from 'classnames';

import { useProduct } from 'context/product/hooks/useProduct';
import Loader from 'Components/Loader';
import Alert from 'Components/Alert';

import { Tab, Tabs, Content } from './ProductTab';
import Layout from '../Layout';
import './ProductEdit.css';
import { items } from './constants';

const ProductEdit = () => {
    const { result, error, loading } = useProduct();
    const [active, setActive] = useState(0);
    const handleClick = (id) => () => {
        const index = parseInt(id, 10);

        if (index !== active) {
            setActive(index);
        }
    };

    const renderContent = useCallback(() => {
        if (loading) {
            return <Loader size={7} center />;
        }
        if (!loading && error) {
            return <Alert type="warning" text={error.message} />;
        }

        return (
            <>
                <Tabs className="nav nav-tabs">
                    {items.map(({ id, name }) => (
                        <Tab key={id} onClick={handleClick(id)} className="nav-item">
                            <a className={classNames('nav-link', { active: active === id })}>{name}</a>
                        </Tab>
                    ))}
                </Tabs>
                {items.map(({ id, content }) => (
                    <Content key={id} active={active === id}>
                        {content}
                    </Content>
                ))}
            </>
        );
    }, [loading, error, handleClick, active, items]);

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
                <h1>Products</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <button
                        // onClick={toggleModal}
                        type="button"
                        className="btn btn-primary px-3 py-1 mr-0"
                        style={{ fontSize: 22 }}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="row d-block">
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

export default Layout(ProductEdit);
