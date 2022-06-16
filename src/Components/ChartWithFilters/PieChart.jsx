import React from 'react';
import {
    ResponsiveContainer, PieChart as PieRechart, Pie, Legend, Tooltip,
} from 'recharts';
import Loader from '../Loader';
import { getFormattedPrice } from '../../Constants';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
}) => {
    console.log({ name });
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            style={{ fontSize: 14 }}
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomTooltip = ({
    active, payload, name, label, text, ...props
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label lead">{payload[0].name}</p>
                <p className="label lead">{getFormattedPrice(payload[0].value)}</p>
            </div>
        );
    }

    return null;
};

export const PieChart = ({ data, loading }) => (
    <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer className="d-flex justify-content-center align-items-center">
            {loading ? (
                <Loader size={5} center />
            ) : (
                <PieRechart>
                    <Tooltip content={<CustomTooltip />} />
                    <Pie
                        isAnimationActive={false}
                        dataKey="value"
                        data={data}
                        fill="#344767"
                        label={renderCustomizedLabel}
                        labelLine={false}
                    />
                </PieRechart>
            )}
        </ResponsiveContainer>
    </div>
);
