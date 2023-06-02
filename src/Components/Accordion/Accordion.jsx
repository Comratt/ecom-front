import React from 'react';
import './Accordion.css';
import AccardionArrow from '../../Icons/AccardionArrow';

export const AccordionItem = ({
    label, isCollapsed, handleClick, children, hideArrow, className = '',
}) => (
    <>
        <button type="button" className="accordion-button" onClick={handleClick}>
            {label}
            {!hideArrow && (
                <div className={`accordion-item ${isCollapsed ? 'position' : 'reverse'}`}>
                    <AccardionArrow
                        width={20}
                        fill="var(--color-accent)"
                    />
                </div>
            )}
        </button>
        <div
            className={`accordion-item ${className} ${isCollapsed ? 'collapsed' : 'expanded'}`}
            aria-expanded={isCollapsed}
        >
            {children}
        </div>
    </>
);

export const Accordion = ({ defaultIndex, onItemClick, children }) => {
    const [bindIndex, setBindIndex] = React.useState(defaultIndex);

    const changeItem = (itemIndex) => {
        if (typeof onItemClick === 'function') onItemClick(itemIndex);
        if (itemIndex !== bindIndex) setBindIndex(itemIndex);
        if (itemIndex === bindIndex) setBindIndex(null);
    };
    const items = [];

    React.Children.forEach(children, (child) => {
        items.push((
            <AccordionItem
                key={child?.props.index}
                isCollapsed={bindIndex !== child?.props.index}
                label={child?.props.label}
                className={child?.props?.className}
                hideArrow={child?.props.hideArrow}
                handleClick={() => changeItem(child?.props.index)}
            >
                {child?.props.children}
            </AccordionItem>
        ));
    });

    return (
        <>
            {items}
        </>
    );
};
