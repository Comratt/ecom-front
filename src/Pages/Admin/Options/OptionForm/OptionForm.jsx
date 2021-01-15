import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from 'Components/Input';
import { getValidationMessage } from 'Constants';
import { Plus, Remove } from 'Icons';
import {
    VALIDATION_RULES,
    OPTION_NAME_FIELD,
    OPTION_VALUE_NAME,
    OPTION_VALUE_IMAGE,
} from './constants';

const OptionForm = ({ register, errors }) => {
    const [optionValues, setOptionValues] = useState([]);

    const handleAddOptionValue = () => {
        setOptionValues((prevOptions) => ([
            ...prevOptions,
            {
                id: uuidv4(),
                name: '',
                image: '',
            },
        ]));
    };

    const handleDeleteOptionValue = (id) => () => {
        setOptionValues((prevOptions) => prevOptions.filter(
            (item) => item.id !== id,
        ));
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

    const onChangeOptionValueImage = (id) => ({ target }) => {
        setOptionValues((prevOptions) => prevOptions.map(
            (item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        image: target.files[0],
                    };
                }

                return item;
            },
        ));
    };

    return (
        <div>
            <div className="form-row mb-2">
                <div className="col-12">
                    <Input
                        ref={register(VALIDATION_RULES[OPTION_NAME_FIELD])}
                        name={OPTION_NAME_FIELD}
                        type="text"
                        required
                        placeholder="Название опции"
                        label="Введите название опции"
                        error={getValidationMessage(errors[OPTION_NAME_FIELD])}
                    />
                </div>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Значение опции</th>
                        <th scope="col">Изображение</th>
                        <th scope="col" style={{ width: '2%' }} />
                    </tr>
                </thead>
                <tbody>
                    {optionValues.map((optionValue) => (
                        <tr key={optionValue.id}>
                            <td>
                                <Input
                                    value={optionValue.name}
                                    onChange={onChangeOptionValueName(optionValue.id)}
                                    name={OPTION_VALUE_NAME}
                                    type="text"
                                    placeholder="Название опции"
                                    error={getValidationMessage(errors[OPTION_VALUE_NAME])}
                                />
                            </td>
                            <td>
                                <input
                                    type="file"
                                    name={OPTION_VALUE_IMAGE}
                                    onChange={onChangeOptionValueImage(optionValue.id)}
                                />
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={handleDeleteOptionValue(optionValue.id)}
                                >
                                    <Remove
                                        fill="red"
                                        width={14}
                                        height={14}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td />
                        <td />
                        <td>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={handleAddOptionValue}
                            >
                                <Plus
                                    fill="blue"
                                    width={14}
                                    height={14}
                                />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OptionForm;
