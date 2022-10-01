import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import Remove from 'Icons/Remove';
import Edit from 'Icons/Edit';
import Layout from '../Layout';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { usePostCategory } from '../hooks/usePostCategory';
import { ADD_METHOD, UPDATE_METHOD } from '../../../Constants';
import Modal from '../../../Components/Modal';
import CategoryForm from './CategoryForm';

const Categories = () => {
    const [show, setShow] = useState(false);
    const {
        register, handleSubmit, errors, setValue,
    } = useForm({ mode: 'onChange' });
    const {
        loading, error, categories, setCategories,
    } = useFetchCategories();
    const toggleModal = () => setShow((a) => !a);
    const {
        loading: postCategoryLoading,
        deleteLoading,
        handleSubmit: postCategory,
        deleteCategory,
    } = usePostCategory(toggleModal);

    useEffect(() => {
        if (typeof show === 'number') {
            const cat = categories.find((category) => category.category_id === show);

            Object.keys(cat).forEach((key) => {
                if (key !== 'image') {
                    setValue(key, cat[key]);
                }
            });
        }
    }, [show]);

    const onRemove = (id) => {
        window.confirm('Удалить категорию?') && deleteCategory(id)
            .then(() => {
                setCategories(
                    (prevCategories) => prevCategories.filter(
                        (prevCategory) => prevCategory.category_id !== id,
                    ),
                );
            })
            .catch(console.warn);
    };

    const getParentName = (id, prevCategories) => {
        // eslint-disable-next-line max-len
        const findCategory = prevCategories.find((categoryP) => +categoryP.category_id === +id);

        if (findCategory) {
            return `${findCategory.category_name} > `;
        }

        return '';
    };

    const onSubmit = (data) => {
        const type = typeof show === 'number' ? UPDATE_METHOD : ADD_METHOD;

        postCategory(data, show, type)
            .then((category) => {
                if (type === UPDATE_METHOD) {
                    setCategories((prevCategories) => prevCategories.map((prevCategory) => {
                        if (+prevCategory.category_id === +category.category_id) {
                            return category;
                        }

                        return prevCategory;
                    }));
                } else {
                    setCategories((prevCategories) => [...prevCategories, category]);
                }
                toggleModal();
            })
            .catch(console.warn);
    };

    const renderContent = () => {
        if (loading) {
            return <Loader size={7} center />;
        }
        if (!loading && error) {
            return <Alert type="warning" text={error.message} />;
        }

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <th scope="col" style={{ width: '3%' }} />
                        <th scope="col">Назва категорії</th>
                        <th scope="col" style={{ width: '10%' }}>Дія</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.category_id}>
                            <td>
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={`customCheck-${category.category_id}`}
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor={`customCheck-${category.category_id}`}
                                    />
                                </div>
                            </td>
                            <td>{category.name}</td>
                            <td style={{ display: 'flex', flexWrap: 'nowrap' }}>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary mr-2"
                                    onClick={() => setShow(category.category_id)}
                                    disabled={loading === category.category_id}
                                >
                                    <Edit
                                        fill="blue"
                                        width={14}
                                        height={14}
                                    />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => onRemove(category.category_id)}
                                    disabled={deleteLoading === category.category_id}
                                >
                                    {deleteLoading === category.category_id ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <Remove
                                            fill="red"
                                            width={14}
                                            height={14}
                                        />
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
                <h1 className="h2">Категорії</h1>
                {show && (
                    <Modal
                        show={show}
                        toggleModal={toggleModal}
                        loadingForm={postCategoryLoading}
                        submit
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <CategoryForm
                            selectedId={show}
                            categories={categories}
                            register={register}
                            errors={errors}
                        />
                    </Modal>
                )}
                <div className="btn-toolbar mb-2 mb-md-0">
                    <button
                        onClick={toggleModal}
                        type="button"
                        className="btn btn-primary px-3 py-1 mr-0"
                        style={{ fontSize: 22 }}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

export default Layout(Categories);
