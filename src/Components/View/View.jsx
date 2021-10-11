import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './View.css';

export const View = ({
    children,
    style,
    onClick,
    role,
    id,
    className,
    padTiny,
    padHrTiny,
    padVrTiny,
    padTopTiny,
    padRightTiny,
    padBottomTiny,
    padLeftTiny,
    padSmall,
    padHrSmall,
    padVrSmall,
    padTopSmall,
    padRightSmall,
    padBottomSmall,
    padLeftSmall,
    padMid,
    padHrMid,
    padVrMid,
    padTopMid,
    padRightMid,
    padBottomMid,
    padLeftMid,
    padNormal,
    padHrNormal,
    padVrNormal,
    padTopNormal,
    padRightNormal,
    padBottomNormal,
    padLeftNormal,
    padMedium,
    padHrMedium,
    padVrMedium,
    padTopMedium,
    padRightMedium,
    padBottomMedium,
    padLeftMedium,
    ...rest
}) => {
    const componentClasses = classNames(
        'lib-view',
        className,
        {
            'lib-view_pad-tiny': padTiny,
            'lib-view_pad-hrTiny': padHrTiny,
            'lib-view_pad-vrTiny': padVrTiny,
            'lib-view_pad-topTiny': padTopTiny,
            'lib-view_pad-rightTiny': padRightTiny,
            'lib-view_pad-bottomTiny': padBottomTiny,
            'lib-view_pad-leftTiny': padLeftTiny,
            'lib-view_pad-small': padSmall,
            'lib-view_pad-hrSmall': padHrSmall,
            'lib-view_pad-vrSmall': padVrSmall,
            'lib-view_pad-topSmall': padTopSmall,
            'lib-view_pad-rightSmall': padRightSmall,
            'lib-view_pad-bottomSmall': padBottomSmall,
            'lib-view_pad-leftSmall': padLeftSmall,
            'lib-view_pad-mid': padMid,
            'lib-view_pad-hrMid': padHrMid,
            'lib-view_pad-vrMid': padVrMid,
            'lib-view_pad-topMid': padTopMid,
            'lib-view_pad-rightMid': padRightMid,
            'lib-view_pad-bottomMid': padBottomMid,
            'lib-view_pad-leftMid': padLeftMid,
            'lib-view_pad-normal': padNormal,
            'lib-view_pad-hrNormal': padHrNormal,
            'lib-view_pad-vrNormal': padVrNormal,
            'lib-view_pad-topNormal': padTopNormal,
            'lib-view_pad-rightNormal': padRightNormal,
            'lib-view_pad-bottomNormal': padBottomNormal,
            'lib-view_pad-leftNormal': padLeftNormal,
            'lib-view_pad-medium': padMedium,
            'lib-view_pad-hrMedium': padHrMedium,
            'lib-view_pad-vrMedium': padVrMedium,
            'lib-view_pad-topMedium': padTopMedium,
            'lib-view_pad-rightMedium': padRightMedium,
            'lib-view_pad-bottomMedium': padBottomMedium,
            'lib-view_pad-leftMedium': padLeftMedium,
        },
    );

    return (
        // eslint-disable-next-line
        <div
            className={componentClasses}
            style={style}
            id={id}
            onClick={onClick}
            role={role}
            {...rest}
        >
            {children}
        </div>
    );
};

View.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    role: PropTypes.string,
    id: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.any,
    padTiny: PropTypes.bool,
    padHrTiny: PropTypes.bool,
    padVrTiny: PropTypes.bool,
    padTopTiny: PropTypes.bool,
    padRightTiny: PropTypes.bool,
    padBottomTiny: PropTypes.bool,
    padLeftTiny: PropTypes.bool,
    padSmall: PropTypes.bool,
    padHrSmall: PropTypes.bool,
    padVrSmall: PropTypes.bool,
    padTopSmall: PropTypes.bool,
    padRightSmall: PropTypes.bool,
    padBottomSmall: PropTypes.bool,
    padLeftSmall: PropTypes.bool,
    padMid: PropTypes.bool,
    padHrMid: PropTypes.bool,
    padVrMid: PropTypes.bool,
    padTopMid: PropTypes.bool,
    padRightMid: PropTypes.bool,
    padBottomMid: PropTypes.bool,
    padLeftMid: PropTypes.bool,
    padNormal: PropTypes.bool,
    padHrNormal: PropTypes.bool,
    padVrNormal: PropTypes.bool,
    padTopNormal: PropTypes.bool,
    padRightNormal: PropTypes.bool,
    padBottomNormal: PropTypes.bool,
    padLeftNormal: PropTypes.bool,
    padMedium: PropTypes.bool,
    padHrMedium: PropTypes.bool,
    padVrMedium: PropTypes.bool,
    padTopMedium: PropTypes.bool,
    padRightMedium: PropTypes.bool,
    padBottomMedium: PropTypes.bool,
    padLeftMedium: PropTypes.bool,
};

View.defaultProps = {
    children: <></>,
    onClick: () => {},
    className: '',
    role: '',
    id: '',
    style: undefined,
    padTiny: false,
    padHrTiny: false,
    padVrTiny: false,
    padTopTiny: false,
    padRightTiny: false,
    padBottomTiny: false,
    padLeftTiny: false,
    padSmall: false,
    padHrSmall: false,
    padVrSmall: false,
    padTopSmall: false,
    padRightSmall: false,
    padBottomSmall: false,
    padLeftSmall: false,
    padMid: false,
    padHrMid: false,
    padVrMid: false,
    padTopMid: false,
    padRightMid: false,
    padBottomMid: false,
    padLeftMid: false,
    padNormal: false,
    padHrNormal: false,
    padVrNormal: false,
    padTopNormal: false,
    padRightNormal: false,
    padBottomNormal: false,
    padLeftNormal: false,
    padMedium: false,
    padHrMedium: false,
    padVrMedium: false,
    padTopMedium: false,
    padRightMedium: false,
    padBottomMedium: false,
    padLeftMedium: false,
};
