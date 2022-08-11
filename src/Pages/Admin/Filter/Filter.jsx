import React from 'react';
import debounce from 'lodash/debounce';

import './Filter.css';
import Filters from '../../../Icons/Filters';

const Filter = ({
    filters, handleFilter, fields, resetFilters,
}) => {
    const onInputChange = ({ target: { name, value } }) => {
        handleFilter(name, value);
    };
    const onInputDateChange = ({ target: { name, value } }) => {
        handleFilter(name, value);
    };

    const debouncedChange = debounce(onInputChange, 500);

    const handleResetFilters = () => {
        const inputs = document.querySelectorAll('.text-input');

        inputs.forEach((input) => input.value = '');

        resetFilters();
    };

    return (
        <div className="orderListFilter">
            <div className="orderListFilter-title">
                <h5>
                    <Filters />
                    {' '}
                    Фільтри
                </h5>
            </div>
            <form className="orderListFilter-form">
                {fields?.map((field) => {
                    if (field.type === 'text') {
                        return (
                            <div key={field.name}>
                                <label className="orderListFilter-label" htmlFor={field.name}>
                                    <b>{field.label}</b>
                                </label>
                                <input
                                    className="orderListFilter-input form-control text-input"
                                    type="text"
                                    name={field.name}
                                    onChange={debouncedChange}
                                    id={field.name}
                                    placeholder={field.label}
                                />
                            </div>
                        );
                    } if (field.type === 'select') {
                        return (
                            <>
                                <label className="orderListFilter-label" htmlFor={field.name}>
                                    <b>{field.label}</b>
                                </label>
                                <select
                                    className="form-select form-control"
                                    name={field.name}
                                    id={field.name}
                                    onChange={debouncedChange}
                                >
                                    <option selected value="">Select</option>
                                    {field.options?.map((option) => (
                                        <option
                                            value={option.value}
                                            selected={filters[field.name] === option.value}
                                        >
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </>
                        );
                    } if (field.type === 'date') {
                        return (
                            <div key={field.name}>
                                <label className="orderListFilter-label" htmlFor={field.name}>
                                    <b>{field.label}</b>
                                </label>
                                <input
                                    className="orderListFilter-input form-control"
                                    type="date"
                                    value={filters[field.name]}
                                    name={field.name}
                                    onChange={onInputDateChange}
                                    id={field.name}
                                    placeholder={field.label}
                                />
                            </div>
                        );
                    }
                })}
                <button
                    className="btn btn-primary mt-2"
                    type="button"
                    onClick={handleResetFilters}
                >
                    Очистити
                </button>
            </form>
        </div>
    );
};

export default Filter;
