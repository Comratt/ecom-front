import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Swatches.css';

export const Swatches = ({
    className,
    data,
    active,
    setActive,
}) => {
    const componentClassNames = classNames('lib-swatches', className);
    const itemClassNames = (id) => (
        classNames(
            'lib-swatches__item',
            { active: id === active },
        )
    );

    return (
        <ul className={componentClassNames}>
            {data.map((item) => (
                <li
                    key={item.id}
                    className={itemClassNames(item.id)}
                >
                    <button
                        style={{ backgroundColor: item.color }}
                        type="button"
                        aria-label="Option"
                        onClick={() => setActive(item)}
                    />
                </li>
            ))}
        </ul>
    );
};

Swatches.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string, PropTypes.number,
        ]),
        color: PropTypes.string,
    })),
    className: PropTypes.string,
    active: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number,
    ]),
    setActive: PropTypes.func,
};

Swatches.defaultProps = {
    data: [],
    className: '',
    active: 0,
    setActive: () => {},
};
