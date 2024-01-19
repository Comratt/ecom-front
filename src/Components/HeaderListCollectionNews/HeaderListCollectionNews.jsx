/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useCategories } from 'context/CategoriesWrapper/useCategories';
import { adaptCategories } from 'context/adapters';
import AccardionArrow from 'Icons/AccardionArrow';
import { Link } from '../Link';
import './HeaderListCollectionNews.css';

const adaptParentCategories = (data = []) => {
    if (!Array.isArray(data)) {
        return { withSub: [], withoutSub: [] };
    }

    return data.reduce(
        (acc, item) => {
            if (item?.subcategories?.length) {
                return {
                    ...acc,
                    withSub: [...acc.withSub, item],
                };
            }

            return {
                ...acc,
                withoutSub: [...acc.withoutSub, item],
            };
        },
        { withSub: [], withoutSub: [] },
    );
};

const HeaderListCollectionNews = () => {
    const { categories } = useCategories();
    const adaptedCategories = adaptParentCategories(adaptCategories(categories));

    const [selectedCategory, setSelectedCategory] = useState(false);
    const [subCategoryIndex, setSubCategoryIndex] = useState(null);

    const [subCategory, setSubCategory] = useState({ subcategories: [] });

    useEffect(() => {
        setSubCategory(() => adaptedCategories.withSub.find((_, index) => index === subCategoryIndex));
    }, [setSubCategoryIndex, subCategoryIndex]);

    const getToCollection = (id) => `/collection/${id}`;

    return (
        <div>
            <div className="header-list-collection">
                <div className="header-list-collection-item">
                    {!selectedCategory && (
                        <ul className="header-list-collection-woman">
                            <li>
                                <Link to={getToCollection(34)} className="header-list-collection-woman-sale">
                                    Sale
                                </Link>
                            </li>
                            {adaptedCategories.withSub.map(({ name, id }, index) => (
                                <>
                                    <li
                                        key={id}
                                        onClick={() => {
                                            setSelectedCategory(true);
                                            setSubCategoryIndex(index);
                                        }}
                                        className="main"
                                    >
                                        {name}
                                        <div className="header-list-collection-woman-arrow">
                                            <AccardionArrow width={20} />
                                        </div>
                                    </li>
                                </>
                            ))}
                        </ul>
                    )}
                    {selectedCategory && (

                        <ul className="header-list-collection-woman">
                            <li className="main">
                                <div className="header-list-collection-woman-arrow-btn">
                                    <AccardionArrow
                                        transform="rotate(30deg)"
                                        width={20}
                                        onClick={() => {
                                            setSelectedCategory(false);
                                            setSubCategoryIndex(null);
                                        }}
                                    />
                                </div>
                            </li>
                            <>
                                {subCategory?.subcategories?.map(
                                    ({ category_id, category_name }) => (
                                        <li className="main">
                                            <Link to={getToCollection(category_id)}>
                                                {category_name}
                                            </Link>
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

// {!!adaptedCategories.withoutSub.length && (
//     <ul className="header-list-collection-woman">
//         {adaptedCategories.withoutSub?.map(({ id, name }) => (
//             <li key={id} className="main">
//                 <Link to={getToCollection(id)}>{name}</Link>
//             </li>
//         ))}
//     </ul>
// )}
// {adaptedCategories.withSub?.map(({ id, name, subcategories }) => (
//     <ul key={id} className="header-list-collection-woman">
//         <li className="main">
//             <Link to={getToCollection(id)}>{name}</Link>
//         </li>
//         {subcategories?.map(({ category_name, category_id }) => (
//             <li key={category_id}>
//                 <Link to={getToCollection(category_id)}>{category_name}</Link>
//             </li>
//         ))}
//     </ul>
// ))}
// <div>
//     <img style={{ zIndex: 1 }} src={getImage('header.jpeg')} alt="Костюм чоловічий купити" />
// </div>
