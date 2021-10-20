import API from 'API';
import CategoryService from 'Services/CategoryService';

export const fetchCategories = () => CategoryService.getAll();
