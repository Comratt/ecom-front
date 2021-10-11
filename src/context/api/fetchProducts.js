import ProductsService from 'Services/ProductsService';

export const fetchProducts = () => ProductsService.getAll();

export const fetchProduct = (id) => ProductsService.getById(id);
