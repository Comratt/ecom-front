import React from 'react';
import { Helmet } from 'react-helmet';

const MetaWithOG = ({ name, content }) => (
    <Helmet>
        <meta name={name} content={content} />
        <meta property={`og:${name}`} content={content} />
        <meta name={`twitter:${name}`} content={content} />
    </Helmet>
);

const MetaTags = ({
    title, description, tags, metaTitle, keywords,
}) => (
    <>
        {title && (
            <Helmet>
                <title>{title}</title>
            </Helmet>
        )}
        {description && <MetaWithOG name="description" content={description} />}
        {keywords && <MetaWithOG name="keywords" content={keywords} />}
        {tags && <MetaWithOG name="tags" content={tags} />}
        {metaTitle && <MetaWithOG name="title" content={metaTitle} />}
    </>
);

export default MetaTags;
