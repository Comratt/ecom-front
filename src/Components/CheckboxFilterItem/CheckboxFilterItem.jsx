import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { Range, getTrackBackground } from 'react-range';
import Popup from 'reactjs-popup';
import { useAsync } from 'react-async-hook';
import 'reactjs-popup/dist/index.css';
import classNames from 'classnames';
import './CheckboxFilterItem.css';
import PropTypes from 'prop-types';
import { AccardionArrow } from '../../Icons';
import ProductsService from '../../Services/ProductsService';

export const PriceRange = ({
    min, max, onFinalChange, current,
}) => {
    const STEP = 25;
    const MIN = parseFloat(min);
    const MAX = parseFloat(max);
    const [values, setValues] = useState([MIN, MAX]);

    useEffect(() => {
        if (current?.length) {
            setValues(current);
        }
    }, [current]);

    return (
        <div>
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(val) => {
                    setValues(val);
                }}
                onFinalChange={(val) => onFinalChange('price', val)}
                renderTrack={({ props, children }) => (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '36px',
                            marginTop: '30px',
                            marginBottom: '30px',
                            display: 'flex',
                            justifyContent: 'center',
                            width: '210px',
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: '2px',
                                width: '100%',
                                borderRadius: '4px',
                                background: getTrackBackground({
                                    values,
                                    colors: ['#e5e5e5', 'rgb(51, 51, 51)', '#e5e5e5'],
                                    min: MIN,
                                    max: MAX,
                                }),
                                alignSelf: 'center',
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged, index }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '24px',
                            width: '24px',
                            border: '1px solid transparent',
                            borderRadius: '50%',
                            borderColor: 'rgb(51, 51, 51)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px #AAA',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                overflow: 'hidden',
                                height: '24px',
                                width: '24px',
                                backgroundColor: isDragged ? '#548BF4' : '#CCC',
                            }}
                        />
                    </div>
                )}
            />
            <div>
                <output
                    type="text"
                    style={{
                        borderRadius: '4px', border: '1px solid  #e4e4e4', padding: '9px 21px', position: 'absolute', bottom: '75%',
                    }}
                    id="output"
                >
                    {values[0].toFixed(1)}
                </output>
                <output
                    type="text"
                    style={{
                        borderRadius: '4px',
                        border: '1px solid  #e4e4e4',
                        padding: '9px 21px',
                        position: 'absolute',
                        bottom: '75%',
                        left: '65%',
                    }}
                    id="output"
                >
                    {values[1].toFixed(1)}
                </output>
            </div>
        </div>
    );
};
const CheckboxFilterItem = ({
    className,
    handleSortBy,
    handleFilterBy,
    handleAvailable,
    filters,
    minMaxPrice,
    colors,
}) => {
    const [staticFilters, setStaticFilters] = useState([
        { name: 'Color', id: 1, text: [] },
        { name: 'Size', id: 2, text: [] },
        { name: 'Price', id: 3, text: [] },
        {
            name: 'Stock',
            id: 4,
            text: [
                { value: 'stock', name: 'stock', text: 'In stock' },
            ],
        },
        {
            name: 'Sort by',
            id: 5,
            text: [
                { value: 'relevance', name: 'sortBy', text: 'Relevance' },
                { value: 'dateAsc', name: 'sortBy', text: 'Дата | Від нового до старого' },
                { value: 'dateDesc', name: 'sortBy', text: 'Дата | Від старого до нового' },
                { value: 'priceAsc', name: 'sortBy', text: 'Ціна | Від низького до високого' },
                { value: 'priceDesc', name: 'sortBy', text: 'Ціна | Від високого до низького' },
            ],
        },
    ]);

    useEffect(() => {
        if (minMaxPrice?.length) {
            setStaticFilters((prev) => prev.map((item) => {
                if (item.id === 3) {
                    return ({
                        ...item,
                        text: [{
                            min: minMaxPrice[0],
                            max: minMaxPrice[1],
                        }],
                    });
                }

                return item;
            }));
        }
    }, [minMaxPrice]);

    useEffect(() => {
        if (colors?.length) {
            setStaticFilters((prev) => prev.map((item) => {
                if (item.id === 1) {
                    return ({
                        ...item,
                        text: colors?.map(({ id, name }) => ({
                            value: id,
                            name: 'color',
                            text: name,
                        })),
                    });
                }

                return item;
            }));
        }
    }, [colors]);

    const componentClasses = classNames(
        'lib-checkboxFilterItem',
        className,
    );

    const handleInputChange = (filterId) => ({ target }) => {
        if (filterId === 4) {
            handleAvailable();
        }
        if (filterId === 1) {
            if (filters?.color?.includes(target.value)) {
                handleFilterBy('color', filters?.color?.filter((colorId) => colorId !== target.value));
            } else {
                const colores = filters?.color || [];

                handleFilterBy('color', [...colores, target.value]);
            }
        }
        if (filterId === 5) {
            if (filters.sortBy === target.value) {
                return handleSortBy('');
            }
            handleSortBy(target.value);
        }
    };

    const isChecked = (filterId, value) => {
        if (filterId === 5) {
            return filters.sortBy === value;
        } if (filterId === 4) {
            return filters.available;
        } if (filterId === 1) {
            return filters?.color?.includes(value?.toString());
        }
    };

    return (
        <>
            <div className={componentClasses}>
                <div className="filters__items">
                    {staticFilters.map((list) => (
                        <Popup
                            arrow={false}
                            trigger={(open) => (
                                <div className="filters__item" key={list.id}>
                                    <button className="filters__text">{list.name}</button>
                                    <AccardionArrow
                                        className={classNames('filters__chevron', {
                                            rotate: open,
                                        })}
                                        fill="#887568"
                                        width={20}
                                    />
                                </div>
                            )}
                            position="bottom center"
                        >
                            <ul>
                                {list.text.map((data) => (data?.value ? (
                                    <li className="filters__item__checkbox_list" key={data.value}>
                                        <label className="checkbox" htmlFor={data.value}>
                                            <input
                                                onClick={handleInputChange(list.id)}
                                                name={data.name}
                                                id={data.value}
                                                value={data.value}
                                                checked={isChecked(list.id, data.value)}
                                                type={list.id === 1 ? 'checkbox' : 'radio'}
                                            />
                                            <span>{data.text}</span>
                                        </label>
                                    </li>
                                ) : (
                                    <PriceRange
                                        onFinalChange={handleFilterBy}
                                        min={data.min}
                                        max={data.max}
                                        current={filters?.price}
                                    />
                                )))}
                            </ul>
                        </Popup>
                    ))}
                </div>
            </div>
        </>
    );
};

CheckboxFilterItem.propTypes = {
    className: PropTypes.string,
};

CheckboxFilterItem.defaultProps = {
    className: '',
};

export default CheckboxFilterItem;
