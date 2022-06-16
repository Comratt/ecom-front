import React from 'react';
import {
    AreaChart as AreaRechart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
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

export const AreaChart = ({ data, loading, filterBy }) => {
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
        <ResponsiveContainer width="100%" height={300} className="d-flex justify-content-center align-items-center">
            {loading ? (
                <Loader size={5} center />
            ) : (
                <AreaRechart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="value" />
                    <YAxis />
                    <Tooltip cursor={{ stroke: 'grey', strokeWidth: 2 }} content={<CustomTooltip text={getTooltipLabel} />} />
                    <Legend />
                    <Area type="monotone" dataKey="total" stroke="#344767" fill="#344767" />
                </AreaRechart>
            )}
        </ResponsiveContainer>
    );
};
