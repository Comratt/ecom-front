import React, { useState } from 'react';
import { useCategories } from 'context/CategoriesWrapper/useCategories';
import AccardionArrow from 'Icons/AccardionArrow';
import { Link } from '../Link';
import './HeaderListCollectionNews.css';

const buildHierarchy = (data, parentId = null) => {
    const result = [];

    for (const key in data) {
        const category = data[key];

        if (category.parent_id === parentId) {
            const subcategories = buildHierarchy(data, category.category_id);
            const newCategory = {
                ...category,
                subcategory: subcategories,
            };

            result.push(newCategory);
        }
    }

    return result.sort((a, b) => a.sort_order - b.sort_order);
};

const HeaderListCollectionNews = () => {
    const { categories } = useCategories();
    const adaptedCategories = buildHierarchy(categories).filter((item) => item.subcategory.length > 0);

    const [selectedCategory, setSelectedCategory] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const getToCollection = (id) => `/collection/${id}`;

    const handleCategoryClick = (category) => {
        if (category.subcategory.length === 0) {
            setSelectedCategory(false);
            setCurrentCategory(null);
        } else {
            setSelectedCategory(true);
            setCurrentCategory(category);
        }
    };

    const handleBackClick = () => {
        setSelectedCategory(false);
        setCurrentCategory(null);
    };

    const renderCategories = (categoryList) => (
        <ul className="header-list-collection-woman">
            {categoryList.map((category) => (
                <li key={category.category_id} className="main" onClick={() => handleCategoryClick(category)}>
                    {category.subcategory.length === 0 ? (
                        <Link to={getToCollection(category.category_id)}>
                            {category.category_name}
                        </Link>
                    ) : (
                        <span className="lib-link">{category.category_name}</span>
                    )}
                    {category.subcategory.length > 0 && (
                        <div className="header-list-collection-woman-arrow">
                            <AccardionArrow width={20} />
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            <div className="header-list-collection">
                <div className="header-list-collection-item">
                    {!selectedCategory && renderCategories(adaptedCategories)}
                    {selectedCategory && (
                        <ul className="header-list-collection-woman">
                            <li className="main" onClick={handleBackClick}>
                                <div className="header-list-collection-woman-arrow-btn">
                                    <AccardionArrow transform="rotate(30deg)" width={20} />
                                </div>
                            </li>
                            {currentCategory && renderCategories(currentCategory.subcategory)}
                        </ul>
                    )}
                </div>
                <ul className="header-list-collection-woman">
                    <li>
                        <Link to={getToCollection(31)}>
                            Вишиванки
                        </Link>
                    </li>
                    <li>
                        <Link to={getToCollection(46)}>
                            Sale
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HeaderListCollectionNews;
