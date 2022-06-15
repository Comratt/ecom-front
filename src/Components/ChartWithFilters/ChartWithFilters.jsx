import React from 'react';
import { BarChart } from './BarChart';
import './ChartWithFilters.css';

const Chart = ({
    type, data, loading, filterBy,
}) => {
    switch (type) {
    case 'bar':
        return <BarChart filterBy={filterBy} data={data} loading={loading} />;
    default:
        return <BarChart filterBy={filterBy} data={data} loading={loading} />;
    }
};

export const ChartWithFilters = ({
    type, data, loading, onChange, filterBy, title,
}) => (
    <div className="w-100 charts-wrapper">
        <div className="d-flex justify-content-between px-lg-3 mb-3">
            <h3 style={{ textAlign: 'center' }}>{title}</h3>
            <select value={filterBy} onChange={onChange} className="form-control w-25" name="filterBy">
                <option selected disabled value="0">Фільтри</option>
                <option value="year">Рік</option>
                <option value="month">Місяць</option>
                <option value="day">День</option>
            </select>
        </div>
        <Chart filterBy={filterBy} data={data} type={type} loading={loading} />
    </div>
);
