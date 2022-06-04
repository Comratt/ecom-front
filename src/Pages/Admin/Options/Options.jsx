import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useAsync } from 'hooks/useAsync';

import OptionService from 'Services/OptionService';
import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import Modal from 'Components/Modal';
import { Edit, Remove } from 'Icons';
import { usePostOptions } from '../hooks/usePostOptions';
import Layout from '../Layout';
import OptionForm from './OptionForm';
import { ADD_METHOD, UPDATE_METHOD } from '../../../Constants';
import './Option.css';

const Options = () => {
    const [show, setShow] = useState(false);
    const [optionType, setOptionType] = useState(null);
    const {
        register, handleSubmit, errors,
    } = useForm({ mode: 'onChange' });
    const {
        data, loading, error, setData,
    } = useAsync({ method: OptionService.getOptions });
    const {
        data: ovData, loading: ovLoading, error: ovError, fetch: ovFetch,
    } = useAsync({ method: () => OptionService.getOption(show), isPrepare: true, defaultData: {} });
    const toggleModal = () => setShow((a) => !a);
    const [optionValues, setOptionValues] = useState([]);
    const {
        loading: postOptionLoading,
        deleteLoading,
        handleSubmit: postOption,
        deleteOption,
        deleteValueLoading,
        deleteOptionValue,
    } = usePostOptions();

    useEffect(() => {
        if (typeof show === 'number') {
            ovFetch();
        } else {
            setOptionValues([]);
        }
    }, [show]);

    useEffect(() => {
        if (ovData?.values) {
            const modifiedData = ovData?.values?.map((item) => ({
                id: item.option_value_id,
                name: item.name_value,
                image: item.image,
                color: item.color,
            }));

            setOptionValues(modifiedData);
        }
    }, [ovData, setOptionValues]);

    const handleAddOptionValue = () => {
        setOptionValues((prevOptions) => ([
            ...prevOptions,
            {
                id: uuidv4(),
                name: '',
                image: '',
                color: '#cccccc',
            },
        ]));
    };

    const handleDeleteOptionValue = (id) => () => {
        window.confirm('Видалити значення опції?') && deleteOptionValue(id)
            .then(() => {
                setOptionValues((prevOptions) => prevOptions.filter(
                    (item) => item.id !== id,
                ));
            })
            .catch(console.warn);
    };

    const onChangeOptionValueName = (id) => ({ target }) => {
        setOptionValues((prevOptions) => prevOptions.map(
            (item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        name: target.value,
                    };
                }

                return item;
            },
        ));
    };

    const onChangeOptionValueColor = (id) => ({ target }) => {
        setOptionValues((prevOptions) => prevOptions.map(
            (item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        color: target.value,
                    };
                }

                return item;
            },
        ));
    };

    const onChangeOptionValueImage = (id) => ({ target }) => {
        setOptionValues((prevOptions) => prevOptions.map(
            (item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        image: target.files[0],
                        imagePreview: URL.createObjectURL(target.files[0]),
                    };
                }

                return item;
            },
        ));
    };

    const onRemove = (id) => {
        window.confirm('Видалити категорію?') && deleteOption(id)
            .then(() => {
                setData(
                    (prevOptions) => prevOptions.filter(
                        (prevOption) => prevOption.option_id !== id,
                    ),
                );
            })
            .catch(console.warn);
    };

    const onSubmit = ({ name }) => {
        if (optionValues.length === 0) {
            return;
        }

        const type = typeof show === 'number' ? UPDATE_METHOD : ADD_METHOD;

        postOption({
            name,
            values: optionValues,
        }, show, type)
            .then(({ option }) => {
                if (type === UPDATE_METHOD) {
                    setData((prevOptions) => prevOptions.map((prevOption) => {
                        if (prevOption.option_id === option.option_id) {
                            return option;
                        }

                        return prevOption;
                    }));
                } else {
                    setData((prevData) => [
                        ...prevData,
                        option,
                    ]);
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
                    {data.map((option) => (
                        <tr key={option.option_id}>
                            <td>
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={`customCheck-${option.option_id}`}
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor={`customCheck-${option.option_id}`}
                                    />
                                </div>
                            </td>
                            <td>{option.name}</td>
                            <td style={{ display: 'flex', flexWrap: 'nowrap' }}>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary mr-2"
                                    onClick={() => setShow(option.option_id)}
                                    disabled={loading === option.option_id}
                                >
                                    {ovLoading && option.option_id === show ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <Edit
                                            fill="blue"
                                            width={14}
                                            height={14}
                                        />
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => onRemove(option.option_id)}
                                    disabled={deleteLoading === option.option_id}
                                >
                                    {deleteLoading === option.option_id ? (
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
                <h1 className="h2">Опції</h1>
                {show && (
                    <Modal
                        show={show}
                        toggleModal={toggleModal}
                        loadingForm={postOptionLoading}
                        submit
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <OptionForm
                            showColor={data?.find(({ option_id }) => (option_id === show)).option_type === 1}
                            register={register}
                            errors={errors}
                            optionValues={optionValues}
                            handleAddOptionValue={handleAddOptionValue}
                            handleDeleteOptionValue={handleDeleteOptionValue}
                            onChangeOptionValueName={onChangeOptionValueName}
                            onChangeOptionValueColor={onChangeOptionValueColor}
                            onChangeOptionValueImage={onChangeOptionValueImage}
                            defaultValue={typeof show === 'number' ? ovData?.name : ''}
                            deleteValueLoading={deleteValueLoading}
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

export default Layout(Options);
