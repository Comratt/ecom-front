import React from 'react';
import { getValidationMessage } from 'Constants';
import Input from 'Components/Input';
import { FIELDS, VALIDATION_RULES } from './constants';

const BannerForm = ({ register, errors }) => (
    <>
        {FIELDS.map((field) => (
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
        ))}
    </>
);

export default BannerForm;
