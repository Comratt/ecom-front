import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import classNames from 'classnames';
import './CheckboxFilterItem.css';
import PropTypes from 'prop-types';
import { AccardionArrow, Close } from '../../Icons';

export const PriceRange = ({
    min, max, onFinalChange, current, maxWidth = 210,
}) => {
    const STEP = 25;
    let MIN = parseFloat(min) || 0;
    let MAX = parseFloat(max) || 0;

    if (MIN === MAX) {
        MIN = 0;
        MAX += STEP + 100;
    }
    const [values, setValues] = useState([MIN, MAX]);

    useEffect(() => {
        if (current?.length) {
            if (current[0] === MIN && current[1] === MAX) {
                onFinalChange('price', []);
            }
            if ((current[0] >= MIN || current[0] < MAX) && (current[1] >= MIN || current[1] <= MAX)) {
                setValues(current);
            }
        } else {
            setValues([MIN, MAX]);
        }
    }, [current, min, max]);

    return (
        <div
            style={{
                position: 'relative',
                maxWidth: `${maxWidth}px`,
                margin: '0 auto',
                marginTop: 20,
            }}
        >
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
                            height: '10px',
                            margin: '0 auto',
                            marginBottom: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: `${maxWidth}px`,
                            padding: '0 10px',
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: '2px',
                                width: '100%',
                                borderRadius: '4px',
                                background: 'var(--color-accent)',
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
                            height: '20px',
                            width: '20px',
                            border: '1px solid transparent',
                            borderRadius: '50%',
                            borderColor: 'var(--color-accent)',
                            background: 'var(--color-accent-light)',
                            color: 'var(--color-accent)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px var(--color-accent)',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                overflow: 'hidden',
                                background: 'var(--color-accent-light)',
                                height: '20px',
                                width: '20px',
                                backgroundColor: isDragged ? 'var(--color-accent' : 'var(--color-accent-light)',
                            }}
                        />
                    </div>
                )}
            />
            <div>
                <output
                    type="text"
                    style={{
                        borderRadius: '4px',
                        border: '1px solid var(--color-accent)',
                        color: 'var(--color-accent)',
                        padding: '7px',
                        position: 'absolute',
                        fontSize: '12px',
                        left: '0',
                    }}
                    id="output"
                >
                    {values[0].toFixed(1)}
                </output>
                <output
                    type="text"
                    style={{
                        borderRadius: '4px',
                        border: '1px solid var(--color-accent)',
                        color: 'var(--color-accent)',
                        padding: '7px',
                        position: 'absolute',
                        right: '0',
                        fontSize: '12px',
                    }}
                    id="output"
                >
                    {values[1].toFixed(1)}
                </output>
            </div>
        </div>
    );
};
const getColorStyles = (color) => ({
    width: 12,
    height: 12,
    marginRight: 10,
    backgroundColor: color,
    borderRadius: '50%',
});
const colorWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
};
const CheckboxFilterItem = ({
    className,
    handleSortBy,
    handleFilterBy,
    handleAvailable,
    filters,
    minMaxPrice,
    colors,
    resetFilters,
    isFiltered,
}) => {
    const [staticFilters, setStaticFilters] = useState([
        { name: 'Колір', id: 1, text: [{ name: 'color' }] },
        { name: 'Розмір', id: 2, text: [{ name: '', value: 'ad' }] },
        { name: 'Ціна', id: 3, text: [{ name: 'price' }] },
        {
            name: 'Наявність',
            id: 4,
            text: [
                { value: 'available', name: 'available', text: 'В наявності' },
            ],
        },
        {
            name: 'Сортування',
            id: 5,
            text: [
                { value: 'relevance', name: 'sortBy', text: 'Найпопулярніші' },
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
                            name: 'price',
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
                        text: colors?.map(({ id, name, color }) => ({
                            value: id,
                            name: 'color',
                            text: (
                                <div style={colorWrapperStyles}>
                                    <div style={getColorStyles(color)} />
                                    {name}
                                </div>
                            ),
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
            if (filters?.color?.includes(+target.value)) {
                handleFilterBy('color', filters?.color?.filter((colorId) => colorId != target.value));
            } else {
                const colores = filters?.color || [];

                handleFilterBy('color', [...colores, +target.value]);
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
            return filters?.color?.includes(+value);
        }
    };

    const checkIsFiltered = ({ name }) => {
        if (filters[name]?.length || filters[name] === true) {
            return ' filtered';
        }

        return '';
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
                                    <button className={`filters__text${ checkIsFiltered(list.text[0])}`}>{list.name}</button>
                                    <AccardionArrow
                                        className={classNames('filters__chevron', {
                                            rotate: open,
                                        })}
                                        fill="#887568"
                                        width={20}
                                    />
                                </div>
                            )}
                            position="bottom left"
                            className="filter-popup"
                            repositionOnResize
                        >
                            <ul>
                                {list.text.map((data) => (data?.value ? (
                                    <li className="filters__item__checkbox_list" key={data.value}>
                                        <label className="checkbox">
                                            <input
                                                onClick={handleInputChange(+list.id)}
                                                name={data.name}
                                                value={data.value}
                                                checked={isChecked(list.id, data.value)}
                                                type={list.id === 1 ? 'checkbox' : 'radio'}
                                            />
                                            <span>{data.text}</span>
                                        </label>
                                    </li>
                                ) : (
                                    <div className="popup-price">
                                        <PriceRange
                                            onFinalChange={handleFilterBy}
                                            min={data.min}
                                            max={data.max}
                                            current={filters?.price}
                                        />
                                    </div>
                                )))}
                            </ul>
                        </Popup>
                    ))}
                    {isFiltered && (
                        <button
                            className="filters__text filter-wrapper"
                            type="button"
                            onClick={resetFilters}
                        >
                            Скинути
                            <Close width={12} height={12} />
                        </button>
                    )}
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
