import React from 'react';
import classNames from 'classnames';
import { StickyContainer } from 'react-sticky';
import { Accordion, AccordionItem } from '../Accordion';

import './CollectionList.css';

const CollectionList = ({
    className,
    children,
    data,
    onChange,
}) => {
    const componentClassNames = classNames('lib-collection-list', className);

    return (
        <div className={componentClassNames}>
            <aside>
                <div>
                    <Accordion defaultIndex={0}>
                        {data.map(({ name, subcategories }, index) => (
                            <AccordionItem
                                label={(
                                    <div className="collection-title">
                                        {name}
                                    </div>
                                )}
                                index={index}
                            >
                                {subcategories.map((subcategory) => (
                                    <div className="collection-item-checkbox">
                                        <label className="checkbox" htmlFor={subcategory.category_id}>
                                            <input onChange={onChange} id={subcategory.category_id} type="checkbox" />
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
