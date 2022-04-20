import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import classNames from 'classnames';
import './CheckboxFilterItem.css';
import PropTypes from 'prop-types';
import { AccardionArrow } from '../../Icons';

const PriceRange = () => {
    const STEP = 1;
    const MIN = 0;
    const MAX = 100;
    const [values, setValues] = useState([25, 75]);

    return (
        <div>
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => {
                    console.log(values);
                    setValues(values);
                }}
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
const CheckboxFilterItem = (
    className,
) => {
    const initialData = [
        {
            name: 'Color',
            id: 1,
            text: [
                'green',
                'red',
                'blue',
                'dark',
                'green',
                'red',
                'blue',
                'dark',
                'green',
                'red',
                'blue',
                'dark',
                'green',
                'red',
                'blue',
                'dark',
            ],
        },
        {
            name: 'Stock',
            id: 2,
            text: [
                'In Stock',
            ],
        },
        {
            name: 'Price',
            id: 3,
            text: [
                <PriceRange />,
            ],
        },
        {
            name: 'Size',
            id: 4,
            text: [
                'xs',
                's',
                'm',
                'l',
                'xl',
                'xs',
                's',
                'm',
                'l',
                'xl',
                'xs',
                's',
                'm',
                'l',
                'xl',
                'xs',
                's',
                'm',
                'l',
                'xl',
            ],
        },
        {
            name: 'Sort by',
            id: 5,
            text: [
                'Relevance',
                'Title A-Z',
                'Title Z-A',
                'Date | Old to New',
                'Date | New to Old',
                'Price | Low to high',
            ],
        },
    ];

    const componentClasses = classNames(
        'lib-checkboxFilterItem',
        className,
    );

    return (
        <>
            <div className={componentClasses}>
                <div className="filters__items">
                    {initialData.map((list) => (
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
                                {list.text.map((item) => (
                                    <li className="filters__item__checkbox_list">
                                        <label className="checkbox" htmlFor="1">
                                            <input id="1" type="checkbox" />
                                            <span>{item}</span>
                                        </label>
                                    </li>
                                ))}
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
