import React from 'react';

import './FooterInput.css';
import { Arrow } from '../../Icons';

const FooterInput = () => (
    <form action="#" className="footer-form">
        <input className="footer-input" type="text" name="" id="footer-input" placeholder="Подписаться на новинки" />
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
