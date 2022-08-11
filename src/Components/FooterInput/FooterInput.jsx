import React from 'react';

import './FooterInput.css';
import Arrow from '../../Icons/Arrow';

const FooterInput = () => (
    <form action="#" className="footer-form">
        <input className="footer-input" type="text" name="" id="footer-input" placeholder="Підписатися на новинки" />
        <div className="arrow">
            <label htmlFor="footer-input">
                <Arrow
                    fill="white"
                />
            </label>
        </div>
    </form>
);

export default FooterInput;
