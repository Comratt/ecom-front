import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAsync } from 'hooks/useAsync';
import OptionService from 'Services/OptionService';
import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import Modal from 'Components/Modal';
import { Edit, Remove } from 'Icons';
import Layout from '../Layout';
import OptionForm from './OptionForm';

const Options = () => {
    const [show, setShow] = useState(false);
    const {
        register, handleSubmit, errors, setValue,
    } = useForm({ mode: 'onChange' });
    const { data, loading, error } = useAsync({ method: OptionService.getOptions });
    const toggleModal = () => setShow((a) => !a);

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
                        <th scope="col">Название категории</th>
                        <th scope="col" style={{ width: '10%' }}>Действие</th>
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
                                    <Edit
                                        fill="blue"
                                        width={14}
                                        height={14}
                                    />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    // onClick={() => onRemove(option.option_id)}
                                    // disabled={deleteLoading === option.option_id}
                                >
                                    {/*{deleteLoading === option.option_id ? (*/}
                                    {/*    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />*/}
                                    {/*) : (*/}
                                        <Remove
                                            fill="red"
                                            width={14}
                                            height={14}
                                        />
                                    {/*)}*/}
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
                <h1 className="h2">Опции</h1>
                {show && (
                    <Modal
                        show={show}
                        toggleModal={toggleModal}
                        // loadingForm={postCategoryLoading}
                        submit
                        // onSubmit={handleSubmit(onSubmit)}
                    >
                        <OptionForm
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

export default Layout(Options);
