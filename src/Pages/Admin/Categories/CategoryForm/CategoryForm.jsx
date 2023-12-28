import React from 'react';
import { getValidationMessage } from 'Constants';
import Input from 'Components/Input';
import { FIELDS, SEO_FIELDS, VALIDATION_RULES } from './constants';

const CategoryForm = ({
    register, errors, categories, active,
}) => (
    <div>
        {FIELDS.map((field) => {
            if (field.type === 'select') {
                return (
                    <div className="form-row mb-2" key={field.name}>
                        <div className="col-12">
                            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">{field.label}</label>
                            <select
                                name={field.name}
                                ref={register(VALIDATION_RULES[field.name])}
                                className="custom-select my-1 mr-sm-2"
                                id="inlineFormCustomSelectPref"
                            >
                                <option value={0} disabled selected>Категория</option>
                                {categories.filter((cat) => cat.category_id !== active).map((category) => (
                                    <option
                                        value={category.category_id}
                                    >
                                        {category.name}
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
        {SEO_FIELDS.map((field) => (
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
    </div>
);

export default CategoryForm;
