import React from 'react';
import {
    Bar,
    BarChart as BarRecharts,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from 'recharts';

import moment from 'moment';
import Loader from '../Loader';
import { getFormattedPrice } from '../../Constants';

const CustomTooltip = ({
    active, payload, label, text, ...props
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label lead">{text(label)}</p>
                <p className="label lead">{getFormattedPrice(payload[0].value)}</p>
            </div>
        );
    }

    return null;
};

export const BarChart = ({ data, loading, filterBy }) => {
    const getTooltipLabel = (label) => {
        switch (filterBy) {
        case 'year':
            return `Місяць: ${label}/${moment().format('YY')}`;
        case 'month':
            return `День: ${label}/${moment().format('MM')}`;
        case 'day':
            return `Година: ${label}:00`;
        default:
            return '';
        }
    };

    return (
        <ResponsiveContainer width="100%" height={250} className="d-flex justify-content-center align-items-center">
            {loading ? (
                <Loader size={5} center />
            ) : (
                <BarRecharts data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="value" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip text={getTooltipLabel} />} />
                    <Legend />
                    <Bar dataKey="total" fill="#82ca9d" />
                </BarRecharts>
            )}
        </ResponsiveContainer>
    );
};
