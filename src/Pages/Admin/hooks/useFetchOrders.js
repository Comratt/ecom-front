import { useMemo, useState } from 'react';
import moment from 'moment';
import { useAsync } from 'react-async-hook';

import OrderService from 'Services/OrderService';
import {
    SHIPPING_CODES,
    DATE_FORMAT,
    DATEDDMMYYYY,
} from 'Constants';
import { useParams } from 'react-router-dom';
import { useFetchCustomers } from './useFetchCustomers';

const adapt = (order = {}) => ({
    ...order,
    promoName: order?.promocode_name || null,
    discount: order?.promocode_discount || 0,
    customer: `${order.first_name} ${order.last_name}`,
    totalPrice: order.order_total_sum,
    id: order.order_id,
    manager: order?.manager_id ? `${order?.managerFirstName} ${order?.managerLastName}` : '-',
    status: SHIPPING_CODES[order.status_id],
    dateAdd: moment(order.created_at, DATE_FORMAT).format(DATEDDMMYYYY),
    dateUpdate: moment(order.updated_at, DATE_FORMAT).format(DATEDDMMYYYY),
    history: order.history?.map((orderHistory) => ({
        ...orderHistory,
        dateAdd: moment(orderHistory.created_at, DATE_FORMAT).format(DATEDDMMYYYY),
        status: SHIPPING_CODES[orderHistory.history_status],
        notify: orderHistory.notify_customer ? 'Yes' : 'No',
        manager: orderHistory?.manager_id ? `${orderHistory?.first_name} ${orderHistory?.last_name}` : '-',
    })) || [],
});

const defaultFilters = {
    page: 1,
    status: '',
    orderId: '',
    createdAt: '',
    updatedAt: '',
    managerId: null,
};

export const useFetchOrders = () => {
    const { executeManagers } = useFetchCustomers();
    const [filters, setFilters] = useState(defaultFilters);
    const handleFilter = (name, value) => setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
        page: 1,
    }));
    const handleChangePage = (pageNumber) => setFilters((prevFilters) => ({
        ...prevFilters,
        page: pageNumber,
    }));
    const resetFilters = () => setFilters(defaultFilters);
    const { loading, error, result } = useAsync(OrderService.getAll, [filters]);

    return useMemo(() => ({
        loading,
        error,
        result: result?.data?.map(adapt),
        totalPages: result?.last_page,
        page: filters.page,
        filters,
        setPage: handleChangePage,
        handleFilter,
        resetFilters,
        executeManagers,
    }), [
        loading,
        error,
        result,
        filters,
        handleChangePage,
        handleFilter,
        resetFilters,
        executeManagers,
    ]);
};

export const useFetchOrder = () => {
    const { id } = useParams();
    const {
        result, loading, error, set,
    } = useAsync(OrderService.getById, [id]);

    return useMemo(() => ({
        loading,
        error,
        result: adapt(result),
        orderId: id,
        setResult: set,
    }), [
        loading,
        error,
        result,
        set,
        id,
    ]);
};
