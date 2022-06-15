import React from 'react';
import Layout from '../Layout';
import './PromoCode.css';

const PromoCode = () => (
    <div className="promocode">
        <h4 className="promocode_title">Створення промокоду</h4>
        <form>
            <div className="mb-3">
                <label htmlFor="promo-code" className="form-label">Промокод</label>
                <input type="text" className="form-control" id="promo-code" aria-describedby="promo-code" />
            </div>
            <div className="mb-3">
                <label htmlFor="promo-code" className="form-label">Знижка</label>
                <input type="number" className="form-control" id="promo-code" aria-describedby="promo-code" />
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    %
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    ₴
                </label>
            </div>
            <div className="mb-3">
                <label htmlFor="promo-code" className="form-label">Дійсний з - 12.12.12</label>
                <input type="date" className="form-control" id="promo-code" aria-describedby="promo-code" />
            </div>
            <div className="mb-3">
                <label htmlFor="promo-code" className="form-label">Дійсний до - 13.12.12</label>
                <input type="date" className="form-control" id="promo-code" aria-describedby="promo-code" />
            </div>
            <button type="submit" className="btn btn-primary">Створити</button>
        </form>
    </div>
);

export default Layout(PromoCode);
