import { createSelector } from 'reselect';

const getFilters = (state) => state.filters;

export const getAllFilters = createSelector(
    [getFilters], (filters) => filters || {},
);
