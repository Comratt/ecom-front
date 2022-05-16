import React from 'react';
import './GuestBtn.css';

const GuestBtn = (...props) => (
    <div className="lib-guest-btn">
        <button {...props}>
            Continue as Guest
        </button>
    </div>
);

export default GuestBtn;
