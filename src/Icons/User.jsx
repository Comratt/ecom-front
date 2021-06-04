import React from 'react';

const User = (props) => (
    <svg
        className="svg-icon icon-user"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx="12" cy="8" r="4" stroke="#887569" strokeWidth="1.2" />
        <path
            d="M20 20C20 15.5817 16.4183 12 12 12C7.58172 12 4 15.5817 4 20"
            stroke="#887569"
            strokeWidth="1.2"
        />
    </svg>
);

export default User;
