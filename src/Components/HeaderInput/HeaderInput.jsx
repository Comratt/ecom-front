import React from 'react';
import { Search } from '../../Icons';

import './HeaderInput.css';

const HeaderInput = () => (
    <form action="#">
        <label htmlFor="search">
            <Search
                className="header-icon-search"
                width={24}
                height={24}
            />
        </label>
        <input type="text" placeholder="Search" className="header-input-search" id="search" />
    </form>
);

export default HeaderInput;
