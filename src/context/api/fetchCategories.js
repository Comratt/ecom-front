import CategoryService from 'Services/CategoryService';

export const fetchCategories = () => CategoryService.getAll();
