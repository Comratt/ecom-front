import React from 'react';
import { getValidationMessage } from 'Constants';
import Input from 'Components/Input';
import { FIELDS, VALIDATION_RULES } from './constants';

const CustomerForm = ({ register, errors, show }) => (
    <>
        {FIELDS.map((field) => {
            if ((typeof show === 'number' && field.name === 'password')) {
                return null;
            }
            if (field.type === 'select') {
                return (
                    <div className="form-row mb-2" key={field.name}>
                        <div className="col-12">
                            <label className="my-1 mr-2" htmlFor="roleUser">{field.label}</label>
                            <select
                                name={field.name}
                                ref={register(VALIDATION_RULES[field.name])}
                                className="custom-select my-1 mr-sm-2"
                                id="roleUser"
                            >
                                {field.options.map((role) => (
                                    <option
                                        value={role.value}
                                    >
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                );
            }

            return (
                <div className="form-row mb-2" key={field.name}>
                    <div className="col-12">
                        <Input
                            ref={register(VALIDATION_RULES[field.name])}
                            name={field.name}
                            type={field.type}
                            required={field.required}
                            placeholder={field.placeholder}
                            label={field.label}
                            error={getValidationMessage(errors[field.name])}
                        />
                    </div>
                </div>
            );
        })}
    </>
);

export default CustomerForm;
