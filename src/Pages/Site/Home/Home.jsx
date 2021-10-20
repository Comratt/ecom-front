import React, { useEffect } from 'react';

import { useLayout } from 'hooks/useLayout';

import { View } from 'Components/View';
import { BigSlider } from 'Components/Slider';
import { CheckboxFilter } from 'Components/CheckboxFilter';
import { CardList } from 'Components/CardList';

import './Home.css';

const slides = [
    {
        link: '/',
        title: 'Summer Sale',
        image: 'https://cdn.shopify.com/s/files/1/0292/1375/3428/files/0_87468e02-d36c-4ea7-baee-1347e7948683.jpg?v=1623845665',
    },
    {
        link: '/',
        title: 'New in',
        image: 'https://cdn.shopify.com/s/files/1/0292/1375/3428/files/2_9f6c5c80-8ce5-4408-95c1-bada22e0f883.jpg?v=1623846968',
    },
    {
        link: '/',
        title: 'Summer Dresses',
        image: 'https://cdn.shopify.com/s/files/1/0292/1375/3428/files/2_9f6c5c80-8ce5-4408-95c1-bada22e0f883.jpg?v=1623846968',
    },
];

export const Home = ({ className }) => {
    const { initTopNavState, initLayoutState, changeTopNavState } = useLayout();

    useEffect(() => {
        initTopNavState({
            bordered: false,
            transparent: true,
        });

        initLayoutState({
            className: 'home-page',
        });
    }, []);

    useEffect(() => {
        document.addEventListener('scroll', (e) => {
            changeTopNavState({
                bordered: true,
                transparent: false,
            });
        });
    }, []);

    return (
        <View>
            <BigSlider data={slides} />
            <View className="main-container">
                <CheckboxFilter />
                <CardList />
            </View>
        </View>
    );
};
