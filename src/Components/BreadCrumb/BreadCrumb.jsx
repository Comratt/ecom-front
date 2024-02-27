import React from 'react';
import { Link } from '../Link';

import './styles.css';

export const BreadCrumb = ({ items }) => (
    <ol className="lib-breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link itemScope itemType="https://schema.org/Thing" itemProp="item" to="/" itemID="/">
                <span itemProp="name">Головна сторінка</span>
            </Link>
            <meta itemProp="position" content="1" />
        </li>
        {items.sort((a, b) => a.position - b.position).map(({ href, name }) => (
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link
                    itemScope
                    itemType="https://schema.org/Thing"
                    itemProp="item"
                    to={href}
                    itemID={href}
                >
                    <span itemProp="name">{name}</span>
                </Link>
                <meta itemProp="position" content="2" />
            </li>
        ))}
    </ol>
);
