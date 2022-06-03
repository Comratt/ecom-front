import React from 'react';

const Menu = (props) => (
    <svg
        className="svg-icon icon-hamburger"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M4 6H20" strokeWidth="1.2" strokeLinecap="square" />
        <path d="M4 12H20" strokeWidth="1.2" strokeLinecap="square" />
        <path d="M4 18H20" strokeWidth="1.2" strokeLinecap="square" />
    </svg>
);

export default Menu;
