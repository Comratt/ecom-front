import React, { useState } from 'react';
import classNames from 'classnames';
import { StickyContainer } from 'react-sticky';
import { useParams } from 'react-router-dom';
import { useCategories } from 'context/CategoriesWrapper/useCategories';
import { Link } from '../Link';
import { Accordion, AccordionItem } from '../Accordion';

import './CollectionList.css';
import AccardionArrow from 'Icons/AccardionArrow';

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
const CollectionList = ({
    className,
    children,
    data,
    onChange,
    filtered,
}) => {
    const componentClassNames = classNames('lib-collection-list', className);
    const adaptedCatIds = filtered?.map((catId) => +catId);
    const { categories } = useCategories();
    const adaptedCategories = buildHierarchy(categories).filter((item) => item.subcategory.length > 0);

    const [selectedCategory, setSelectedCategory] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const handleCategoryClick = (category) => {
        if (category.subcategory.length !== 0) {
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
            {categoryList.sort((a, b) => b.subcategory.length - a.subcategory.length).map((category) => (
                <li
                    key={category.category_id}
                    onClick={() => handleCategoryClick(category)}
                    className={`${selectedCategory ? 'header-list-collection-woman-small' : ''}`}
                >
                    {category.subcategory.length === 0 ? (
                        <label className="checkbox" htmlFor={+category.category_id}>
                            <input
                                onChange={onChange}
                                checked={(
                                    adaptedCatIds?.includes(+category.category_id)
                                )}
                                type="checkbox"
                                id={+category.category_id}
                            />
                            <span>{category.category_name}</span>
                        </label>
                    ) : (
                        <span className="lib-link">
                            {category.category_name}
                        </span>
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
        <div className={componentClassNames}>
            <aside>
                <div className="header-list-collection-item">
                    {!selectedCategory && renderCategories(adaptedCategories)}
                    {selectedCategory && (
                        <ul className="side-list-collection-woman-role-back">
                            <li onClick={handleBackClick}>
                                <div className="side-list-collection-woman-arrow-btn">
                                    <AccardionArrow transform="rotate(30deg)" width={20} />
                                </div>
                                <span>Повернутись</span>
                            </li>
                            {currentCategory && renderCategories(currentCategory.subcategory)}
                        </ul>
                    )}
                </div>
            </aside>
            <StickyContainer className="lib-collection-list__container">
                {children}
            </StickyContainer>
        </div>
    );
};

export default CollectionList;
