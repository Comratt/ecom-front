import React from 'react';
import classNames from 'classnames';
import './AboutUs.css';

const AboutUs = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-company_about_us',
        className,
    );

    return (
        <div className={componentClasses}>
            <div className="lib-company_about_us-title">
                <div className="lib-company_about_us-title-content">
                    <div className="lib-company_about_us-title-header">
                        <h1>
                            12 STOREEZ: Who We Are
                        </h1>
                        <p>
                            A capsule wardrobe for a busy life.
                            Clothes that work for you time and time again.
                            Timeless, feminine and subtle. It’s nice to meet you.
                        </p>
                    </div>
                </div>
            </div>
            <div className="lib-company_about_us-story-starts">
                <div className="lib-company_about_us-img">
                    <div>
                        <img className="lib-company_about_us-img" src="https://cdn.shopify.com/s/files/1/0292/1375/3428/files/image_214_720x.png?v=1619122226" alt="story" />
                    </div>
                </div>
                <div className="lib-company_about_us-text-content">
                    <p className="lib-company_about_us-text-story">
                        Our story starts with twin sisters who were after elegant,
                        simple pieces they couldn’t find elsewhere.
                        Irina and Marina Golomazdina asked their seamstress mother
                        to create designs for them when they were younger.
                    </p>
                    <p className="lib-company_about_us-text-promo">
                        “People would always ask where our clothes came from,
                        and we couldn’t really answer. Created by seamstresses
                        based on our sketches,
                        the clothes were a brainchild of many things that inspired us.
                        Then, one day, we had an idea of starting our own
                        brand — and it immediately felt like an obvious decision.”
                    </p>
                    <p className="lib-company_about_us-text-born-company">
                        12 STOREEZ was born in 2014,
                        with ten items, an account on social media, and a small showroom.
                        Today, we have a passionate community of women who appreciate our designs,
                        46 stores and a team of over 800 people that tell our story.
                    </p>
                </div>
            </div>
            <div className="lib-company_about_us-choose-our-company">
                <p className="lib-company_about_us-choose-our-company-text">
                    We celebrate versatile designs, feminine chic and premium-quality materials.
                    We want to save you time and effort,
                    and provide you with a wardrobe you will wear for years,
                    and even decades, to come.
                </p>
            </div>
            <div className="lib-company_about_us-story-starts">
                <div className="lib-company_about_us-text-content">
                    <p className="lib-company_about_us-text-story">
                        Every month, we create a selection of
                        highly-curated pieces in limited quantities.
                        We believe in designs that can be easily matched with
                        the rest of your wardrobe.
                    </p>
                    <p className="lib-company_about_us-text-promo">
                        We produce our garments in Russia, Turkey, China,
                        Belarus and other countries.
                        Most of our partners in APAC work in compliance with global standards
                        (WRAP, Sedex, BSCI),
                        assuring safe, legal and ethical manufacturing processes
                        as well as sustainable production practices.
                    </p>
                    <p className="lib-company_about_us-text-born-company">
                        12 STOREEZ is the simple elegance,
                        the feminine chic, the warm attitude.
                        Welcome to the story.
                    </p>
                </div>
                <div className="lib-company_about_us-img">
                    <img className="lib-company_about_us-img" src="https://cdn.shopify.com/s/files/1/0292/1375/3428/files/image_214_720x.png?v=1619122226" alt="story" />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
