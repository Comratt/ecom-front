import React, { useEffect } from 'react';
import classNames from 'classnames';
import './AboutCompany.css';
import { useFetchProducts } from '../../../context/hooks/useFetchProducts';
import Loader from '../../../Components/Loader';
import Button from '../../../Components/Button/Button';
import { Link } from '../../../Components/Link';
import { useLayout } from '../../../hooks/useLayout';

const AboutCompany = ({
    className,
}) => {
    const { initTopNavState, initLayoutState } = useLayout();

    useEffect(() => {
        initTopNavState({
            bordered: true,
            transparent: false,
            showLogo: true,
        });

        initLayoutState({
            className: 'login-page',
        });

        window.scrollTo(0, 0);
    }, []);
    const componentClasses = classNames(
        'lib-about-company',
        className,
    );
    const { result, loading } = useFetchProducts();

    if (loading) return <Loader />;

    return (
        <div className={componentClasses}>
            <h2 className="lib-about-company header">
                Про компанію
            </h2>
            <div className="lib-about-company title">
                <div>
                    <h2>12 STOREEZ: Хто ми</h2>
                    <p>
                        Капсульний гардероб для насиченого життя.
                        Одяг, який працює для вас знову і знову.
                        Позачасовий, жіночний і тонкий.
                        {' '}
                        <br />
                        Приємно познайомитися.
                    </p>
                </div>
            </div>
            <div className="lib-about-company images">
                <img className="lib-about-company img-about" src={`http://ecom.manager-app.xyz/uploads/images/${result[0]?.image}`} alt="asd" />
                <p>
                    12 STOREEZ — бренд жінок для жінок.
                    Заснований у 2014 році, ми перетворилися на міжнародний бренд
                    із понад 45 магазинами та 900 людьми, які допомагають нам
                    розповідати нашу історію.
                    Надихаючись життям і потребами жінок,
                    ми прагнемо створити гардероб, який ви будете носити довгі роки.
                </p>
            </div>
            <article className="lib-about-company about">
                <p>
                    12 STOREEZ — бренд жінок для жінок. Заснований у 2014 році,
                    ми перетворилися на міжнародний бренд із понад 45 магазинами та 900 людьми,
                    які допомагають нам розповідати нашу історію. Надихаючись життям і
                    потребами жінок, ми прагнемо створити гардероб,
                    який ви будете носити довгі роки.
                </p>
            </article>
            <div className="lib-about-company images">
                <p>
                    Для нас важливо дбати про планету — і хоча ми розуміємо, що як модний бренд ми ніколи не будемо повністю стійкими,
                    ми прагнемо досягти цілі щодо нейтрального викиду вуглецю до 2030 року.
                    Шукаючи всесвітні рішення на користь кращої якості, ми виробляємо наш
                    одяг у Туреччині, Китаї та Португалії, серед інших країн.
                    <h3>
                        12 STOREEZ - це проста елегантність,
                        розроблена, щоб покращити ваше повсякденне життя. Ласкаво просимо до історії.
                    </h3>
                </p>
                <img className="lib-about-company img-about" src={`http://ecom.manager-app.xyz/uploads/images/${result[12]?.image}`} alt="asd" />
            </div>
            <div className="lib-about-company btn">
                <div className="lib-about-company btn-content">
                    <Link to="/" style={{ width: '200px' }}>
                        <Button variant="solid">
                            <span style={{ color: 'white' }}>В магазин</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutCompany;
