import React from 'react';
import Input from 'Components/Input';
import { getValidationMessage } from 'Constants';
import { Plus, Remove } from 'Icons';
import { getImage } from 'API';
import {
    VALIDATION_RULES,
    OPTION_NAME_FIELD,
    OPTION_VALUE_NAME,
    OPTION_VALUE_IMAGE,
} from './constants';

const OptionForm = ({
    register,
    errors,
    optionValues,
    onChangeOptionValueName,
    onChangeOptionValueImage,
    handleDeleteOptionValue,
    handleAddOptionValue,
    defaultValue,
    deleteValueLoading,
}) => (
    <div>
        <div className="form-row mb-2">
            <div className="col-12">
                <Input
                    defaultValue={defaultValue}
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
                            <div className="media d-flex flex-column">
                                {optionValue.image && (
                                    <img
                                        src={(
                                            optionValue.imagePreview || getImage(optionValue.image)
                                        )}
                                        alt="Option describer"
                                        style={{ maxWidth: 128, maxHeight: 128 }}
                                    />
                                )}
                                <input
                                    type="file"
                                    name={OPTION_VALUE_IMAGE}
                                    onChange={onChangeOptionValueImage(optionValue.id)}
                                />
                            </div>
                        </td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={handleDeleteOptionValue(optionValue.id)}
                            >
                                {deleteValueLoading === optionValue.id ? (
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
                <tr>
                    <td />
                    <td />
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={handleAddOptionValue}
                        >
                            <PlusIcon
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

export default OptionForm;
