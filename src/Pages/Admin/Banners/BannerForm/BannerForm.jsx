import React from 'react';
import { getValidationMessage } from 'Constants';
import Input from 'Components/Input';
import { FIELDS, VALIDATION_RULES } from './constants';
import { useFetchCategories } from '../../hooks/useFetchCategories';

const BannerForm = ({ register, errors, link }) => {
    const {
        loading, error, categories, setCategories,
    } = useFetchCategories();

    return (
        <>
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
                                    <option value={0} disabled>Категория</option>
                                    {categories.map((category) => (
                                        <option
                                            value={`/collection/${category.category_id}`}
                                            selected={`/collection/${category.category_id}` === link}
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
        </>
    );
};

export default BannerForm;
