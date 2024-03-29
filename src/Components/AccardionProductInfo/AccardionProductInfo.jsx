import React from 'react';
import './AccardionProductInfo.css';
import { AccardionArrow } from '../../Icons';

const AccordionItem = ({
    label, isCollapsed, handleClick, children,
}) => (
    <>
        <button className="accordion-button" onClick={handleClick}>
            {label}
            <div className={`accordion-item ${isCollapsed ? 'reverse' : 'position'}`}>
                <AccardionArrow
                    width={20}
                    fill="var(--color-accent)"
                />
            </div>
        </button>
        <div
            className={`accordion-item ${isCollapsed ? 'collapsed' : 'expanded'}`}
            aria-expanded={isCollapsed}
        >
            {children}
        </div>
    </>
);

const AccardionProductInfo = ({ defaultIndex, onItemClick, children }) => {
    const [bindIndex, setBindIndex] = React.useState(defaultIndex);

    const changeItem = (itemIndex) => {
        if (typeof onItemClick === 'function') onItemClick(itemIndex);
        if (itemIndex !== bindIndex) setBindIndex(itemIndex);
    };
    const items = children.filter((item) => item.type.name === 'AccordionItem');

    return (
        <>
            {items.map(({ props }) => (
                <AccordionItem
                    isCollapsed={bindIndex !== props.index}
                    label={props.label}
                    handleClick={() => changeItem(props.index)}
                    children={props.children}
                />
            ))}
        </>
    );
};
const Accardion = () => (
    <AccardionProductInfo defaultIndex="0">
        <AccordionItem label="Description" index="1">
            107584
            Denim Bermuda shorts
            Mid rise
            Zipper fly and button closure
            A classic five-pocket design
            Contrast stitching
            Raw hem
            Made in China
        </AccordionItem>
        <AccordionItem label="Size & fit" index="2">
            Dolor sit amet
        </AccordionItem>
        <AccordionItem label="Product measurements" index="4">
            Dolor sit amet
        </AccordionItem>
        <AccordionItem label="Care" index="5">
            Dolor sit amet
        </AccordionItem>
        <AccordionItem label="Composition" index="6">
            Dolor sit amet
        </AccordionItem>
    </AccardionProductInfo>
);

export default Accardion;
