import { useMemo, useState, useCallback } from 'react';
import { useAsync } from 'react-async-hook';
import OrderService from 'Services/OrderService';

export const usePostOrders = () => {
    const addStatus = useCallback((params) => {
        const { result, loading, error } = useAsync(OrderService.addHistoryStatus, [params]);
    }, [useAsync]);
};
