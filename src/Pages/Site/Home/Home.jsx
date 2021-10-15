import React from 'react';

import { View } from 'Components/View';
import { BigSlider } from 'Components/Slider';
import { CheckboxFilter } from 'Components/CheckboxFilter';
import { SliderCardList } from 'Components/SliderCardList';

import { useHome } from 'context/home/hooks/useHome';

import './Home.css';

export const Home = () => {
    const { result } = useHome();

    return (
        <View>
            <BigSlider data={result} />
            <View className="main-container">
                <CheckboxFilter />
                <SliderCardList />
            </View>
        </View>
    );
};
