import React from 'react';

const Search = (props) => (
    <svg
        className="svg-icon icon-search"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle
            cx="11"
            cy="11"
            r="6.4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="square"
        />
        <path
            d="M16.4243 15.5757L16 15.1515L15.1515 16L15.5757 16.4243L16.4243 15.5757ZM15.5757 16.4243L19.5757 20.4243L20.4243 19.5757L16.4243 15.5757L15.5757 16.4243Z"
            fill="currentColor"
        />
    </svg>
);

export default Search;
