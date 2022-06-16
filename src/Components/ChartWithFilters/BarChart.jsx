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
import Loader from '../Loader';
import { getFormattedPrice } from '../../Constants';

const CustomTooltip = ({
    active, payload, label, name, ...props
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label lead">{label}</p>
                <p className="label lead">{`${payload[0].value} штук`}</p>
            </div>
        );
    }

    return null;
};

export const BarChart = ({ data, loading, filterBy }) => (
    <ResponsiveContainer width="100%" height={250} className="d-flex justify-content-center align-items-center">
        {loading ? (
            <Loader size={5} center />
        ) : (
            <BarRecharts data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{ stroke: 'grey', strokeWidth: 2 }} content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" fill="#344767" />
            </BarRecharts>
        )}
    </ResponsiveContainer>
);
