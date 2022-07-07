import React from 'react';
import { useCategories } from 'context/CategoriesWrapper/useCategories';
import { adaptCategories } from 'context/adapters';
import { Link } from '../Link';

import './HeaderListCollectionNews.css';

const adaptParentCategories = (data = []) => {
    if (!Array.isArray(data)) {
        return { withSub: [], withoutSub: [] };
    }

    return data.reduce((acc, item) => {
        if (item?.subcategories?.length) {
            return ({
                ...acc,
                withSub: [
                    ...acc.withSub,
                    item,
                ],
            });
        }

        return ({
            ...acc,
            withoutSub: [
                ...acc.withoutSub,
                item,
            ],
        });
    }, { withSub: [], withoutSub: [] });
};

const HeaderListCollectionNews = () => {
    const {
        categories,
    } = useCategories();
    const adaptedCategories = adaptParentCategories(adaptCategories(categories));

    const getToCollection = (id) => `/collection/${id}`;

    return (
        <div>
            <div className="header-list-collection">
                <div className="header-list-collection-item">
                    {!!adaptedCategories.withoutSub.length && (
                        <ul className="header-list-collection-woman">
                            {adaptedCategories.withoutSub?.map(({ id, name }) => (
                                <li key={id} className="main">
                                    <Link to={getToCollection(id)}>{name}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    {adaptedCategories.withSub?.map(({ id, name, subcategories }) => (
                        <ul key={id} className="header-list-collection-woman">
                            <li className="main">
                                <Link to={getToCollection(id)}>{name}</Link>
                            </li>
                            {subcategories?.map(({ category_name, category_id }) => (
                                <li key={category_id}>
                                    <Link to={getToCollection(category_id)}>{category_name}</Link>
                                </li>
                            ))}
                        </ul>
                    ))}
                    <div>
                        <img style={{ zIndex: 1 }} src="https://cdn.shopify.com/s/files/1/0292/1375/3428/files/9fc0642b8a3abc3f4ce53f7b6e5769bc_e229744b-4441-4f91-8614-ab42e6c7c564_320x.jpg?v=1634808767" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderListCollectionNews;
