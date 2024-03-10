/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
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

    return result;
};
const HeaderListCollectionNews = () => {
    const { categories } = useCategories();
    const adaptedCategories = buildHierarchy(categories).filter((item) => item.subcategory.length > 0);

    const [selectedCategory, setSelectedCategory] = useState(false);
    const [subCategoryIndex, setSubCategoryIndex] = useState(null);

    const [subCategory, setSubCategory] = useState({ subcategories: [] });

    console.log(adaptedCategories);

    useEffect(() => {
        if (subCategoryIndex === 43) {
            setSubCategory(() => adaptedCategories.find((item) => item.category_id === 36)?.subcategory.find((item) => item.category_id === 43));
        } else {
            setSubCategory(() => adaptedCategories.find((_, index) => index === subCategoryIndex));
        }
    }, [setSubCategoryIndex, subCategoryIndex]);

    const getToCollection = (id) => `/collection/${id}`;

    return (
        <div>
            <div className="header-list-collection">
                <div className="header-list-collection-item">
                    {!selectedCategory && (
                        <ul className="header-list-collection-woman">
                            {adaptedCategories.sort((a, b) => a.sort_order - b.sort_order).map(({ category_name, id }, index) => (
                                <>
                                    <li
                                        key={id}
                                        onClick={() => {
                                            setSelectedCategory(true);
                                            setSubCategoryIndex(index);
                                        }}
                                        className="main"
                                    >
                                        {category_name}
                                        <div className="header-list-collection-woman-arrow">
                                            <AccardionArrow width={20} />
                                        </div>
                                    </li>
                                </>
                            ))}
                            <li>
                                <Link to={getToCollection(31)} className="header-list-collection__item">
                                    Вишиванки
                                </Link>
                            </li>
                            <li>
                                <Link to={getToCollection(46)} className="header-list-collection-woman-sale">
                                    Sale
                                </Link>
                            </li>
                        </ul>
                    )}
                    {selectedCategory && (
                        <ul className="header-list-collection-woman">
                            <li
                                className="main"
                                onClick={() => {
                                    setSelectedCategory(false);
                                    setSubCategoryIndex(null);
                                }}
                            >
                                <div className="header-list-collection-woman-arrow-btn">
                                    <AccardionArrow
                                        transform="rotate(30deg)"
                                        width={20}
                                    />
                                </div>
                            </li>
                            <>
                                {subCategory?.subcategory?.filter(({ category_id }) => category_id !== 31).map(
                                    ({ category_id, category_name }) => (
                                        <li
                                            className="main"
                                            onClick={() => {
                                                if (category_id === 43) {
                                                    setSubCategoryIndex(category_id);
                                                }
                                            }}
                                        >
                                            <Link to={getToCollection(category_id)}>
                                                {category_name}
                                            </Link>
                                            {category_id === 43 && (
                                                <div className="header-list-collection-woman-arrow">
                                                    <AccardionArrow width={20} />
                                                </div>
                                            )}
                                        </li>
                                    ),
                                )}
                            </>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderListCollectionNews;
