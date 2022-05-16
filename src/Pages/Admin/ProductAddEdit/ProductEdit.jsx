import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { useProduct } from 'context/product/hooks/useProduct';
import { useAddProduct } from 'context/addProduct/useAddProduct';
import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import ProductsService from 'Services/ProductsService';

import { Tab, Tabs, Content } from './ProductTab';
import Layout from '../Layout';
import './ProductEdit.css';
import { items } from './constants';

const ProductEdit = ({ isFromAdd = false }) => {
    const successText = isFromAdd ? 'Товар успешно добавлен!' : 'Товар успешно обновлен!';
    const errorText = isFromAdd ? 'Ошибка при добавлении товара!' : 'Ошибка при обновлении товара!';
    const { result, error, loading } = useProduct(false);
    const history = useHistory();
    const {
        setProduct,
        options,
        values,
        mainImage,
        images,
        selectedCategories,
        relatedProducts,
        discounts,
    } = useAddProduct();
    const [active, setActive] = useState(0);
    const [formState, setFormState] = useState('INITIAL');
    const [loadingForm, setLoadingForm] = useState(false);
    const [errorForm, setErrorForm] = useState(null);
    const handleClick = (id) => () => {
        const index = parseInt(id, 10);

        if (index !== active) {
            setActive(index);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (formState === 'SUCCESS' && isFromAdd) return;

        setLoadingForm(true);
        setFormState('INITIAL');

        if (isFromAdd) {
            ProductsService.store({
                options,
                product: values,
                mainImage,
                images,
                selectedCategories,
                relatedProducts,
                discounts,
            })
                .then(() => {
                    setFormState('SUCCESS');
                    setLoadingForm(false);
                    setErrorForm(null);

                    setTimeout(() => {
                        history.push('/admin/products');
                    }, 3000);
                })
                .catch((err) => {
                    setFormState('ERROR');
                    setLoadingForm(false);
                    setErrorForm(err);
                });
        } else {
            ProductsService.update({
                options,
                product: values,
                mainImage,
                images,
                selectedCategories,
                relatedProducts,
                discounts,
            }, result?.id)
                .then(() => {
                    setFormState('SUCCESS');
                    setLoadingForm(false);
                    setErrorForm(null);
                })
                .catch((err) => {
                    setFormState('ERROR');
                    setLoadingForm(false);
                    setErrorForm(err);
                });
        }
    };

    const renderContent = useCallback(() => {
        if (loading) {
            return <Loader size={7} center />;
        }
        if (!loading && error && !isFromAdd) {
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

    useEffect(() => {
        if (isFromAdd) {
            setProduct({});

            return;
        }
        if (Object.keys(result).length) {
            setProduct(result);
        }
    }, [result]);

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
                {!isFromAdd
                    ? <h1>{!loading ? `${result.model} - ${result.name}` : 'Редактор товару'}</h1>
                    : <h1>Додавання товару</h1>}
            </div>
            <div className="container">
                {formState === 'SUCCESS' && <Alert type="success" text={successText} />}
                {formState === 'ERROR' && <Alert type="warning" text={errorText} />}
                <div className="row d-block">
                    {renderContent()}
                    {!loading && (
                        <button onClick={onSubmit} type="submit" className="btn btn-primary" disabled={loadingForm}>
                            {loadingForm && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                            <span className="ml-1">Зберегти</span>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Layout(ProductEdit);
