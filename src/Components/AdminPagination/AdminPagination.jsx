import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap-4-pagination';

export const AdminPagination = ({
    total,
    current,
    onChange,
    showMax,
    loading,
}) => {
    if (total <= 1 || loading) {
        return null;
    }

    return (
        <Pagination
            threeDots
            totalPages={total}
            currentPage={current}
            showMax={showMax}
            prevNext
            onClick={onChange}
        />
    );
};

AdminPagination.propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    showMax: PropTypes.number,
    loading: PropTypes.bool,
};

AdminPagination.defaultProps = {
    showMax: 7,
    loading: false,
};
