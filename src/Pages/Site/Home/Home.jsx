import React from 'react';

import { View } from 'Components/View';
import { BigSlider } from 'Components/Slider';
import { CheckboxFilter } from 'Components/CheckboxFilter';
import { CardList } from 'Components/CardList';

import { useHome } from 'context/home/hooks/useHome';

import './Home.css';

export const Home = () => {
    const { result } = useHome();

    console.log(result);

    return (
        <View>
            <BigSlider data={result} />
            <View className="main-container">
                <CheckboxFilter />
                <CardList />
            </View>
        </View>
    );
};
