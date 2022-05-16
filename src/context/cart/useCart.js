import { useMemo } from 'react';
import { useCartData } from './useCartData';
import { useCartLayout } from './useCartLayout';

export const useCart = () => {
    const cartData = useCartData();

    useCartLayout();

    return useMemo(() => cartData, [cartData]);
};
