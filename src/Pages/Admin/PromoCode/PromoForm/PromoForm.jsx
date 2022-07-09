import React from 'react';
import { getValidationMessage } from 'Constants';
import Input from 'Components/Input';
import { FIELDS, VALIDATION_RULES, PREFIX_FIELD } from './constants';

const PromoForm = ({ register, errors }) => (
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
        <div className="form-row mb-2">
            <div className="col-12">
                <label htmlFor="inputState">Тип знижки</label>
                <select ref={register(VALIDATION_RULES[PREFIX_FIELD])} name={PREFIX_FIELD} className="form-control">
                    <option value="0">Гривні</option>
                    <option value="1">Процент від суми (%)</option>
                </select>
            </div>
        </div>
    </>
);

export default PromoForm;
