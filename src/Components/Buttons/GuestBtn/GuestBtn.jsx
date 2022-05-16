import React from 'react';
import './GuestBtn.css';

const GuestBtn = (...props) => (
    <div className="lib-guest-btn">
        <button {...props}>
            Продовжити як Гість
        </button>
    </div>
);

export default GuestBtn;
