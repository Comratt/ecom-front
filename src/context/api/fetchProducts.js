import ProductsService from 'Services/ProductsService';

export const fetchProducts = (filters) => ProductsService.getAll(filters);

export const fetchProduct = (id) => ProductsService.getById(id);
