import React from 'react';
import classNames from 'classnames';
import { StickyContainer } from 'react-sticky';
import { useParams } from 'react-router-dom';
import { Link } from '../Link';
import { Accordion, AccordionItem } from '../Accordion';

import './CollectionList.css';

const CollectionList = ({
    className,
    children,
    data,
    onChange,
    filtered,
}) => {
    const { id: collectionId } = useParams();
    const componentClassNames = classNames('lib-collection-list', className);
    const adaptedCatIds = filtered?.map((catId) => +catId);

    return (
        <div className={componentClassNames}>
            <aside>
                <div>
                    <Accordion defaultIndex={+collectionId}>
                        {data.sort((a, b) => b.subcategories.length - a.subcategories.length).map(({ id, name, subcategories }) => (
                            <AccordionItem
                                label={(
                                    <Link to={`/collection/${id}`} className="collection-title">
                                        {name}
                                    </Link>
                                )}
                                key={id}
                                index={id}
                                hideArrow={!subcategories?.length}
                            >
                                {subcategories.map((subcategory) => (
                                    <div key={subcategory.category_id} className="collection-item-checkbox">
                                        <label className="checkbox" htmlFor={subcategory.category_id}>
                                            <input
                                                onChange={onChange}
                                                checked={(
                                                    adaptedCatIds?.includes(+subcategory.category_id)
                                                )}
                                                id={subcategory.category_id}
                                                type="checkbox"
                                            />
                                            <span>{subcategory.category_name}</span>
                                        </label>
                                    </div>
                                ))}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </aside>
            <StickyContainer className="lib-collection-list__container">
                {children}
            </StickyContainer>
        </div>
    );
};

export default CollectionList;
