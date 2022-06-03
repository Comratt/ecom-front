import React from 'react';
import Input from 'Components/Input';
import { getValidationMessage } from 'Constants';
import { Remove, PlusIcon } from 'Icons';
import { getImage } from 'API';
import {
    VALIDATION_RULES,
    OPTION_NAME_FIELD,
    OPTION_VALUE_NAME,
    OPTION_VALUE_IMAGE,
    OPTION_VALUE_COLOR,
} from './constants';

const OptionForm = ({
    register,
    errors,
    optionValues,
    showColor,
    onChangeOptionValueName,
    onChangeOptionValueColor,
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
                    placeholder="Назва опції"
                    label="Введіть назву опції"
                    error={getValidationMessage(errors[OPTION_NAME_FIELD])}
                />
            </div>
        </div>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Значення опції</th>
                    {showColor && <th scope="col" style={{ width: '30%' }}>Колір</th>}
                    <th scope="col" style={{ maxWidth: '50px' }}>Зображення</th>
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
                                placeholder="Назва опції"
                                error={getValidationMessage(errors[OPTION_VALUE_NAME])}
                            />
                        </td>
                        {showColor && (
                            <td>
                                <Input
                                    value={optionValue.color}
                                    onChange={onChangeOptionValueColor(optionValue.id)}
                                    name={OPTION_VALUE_COLOR}
                                    type="color"
                                    placeholder="Колір"
                                    error={getValidationMessage(errors[OPTION_VALUE_COLOR])}
                                />
                            </td>
                        )}
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
                    {showColor && <td />}
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
