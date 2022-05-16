import React from 'react';

import { View } from 'Components/View';
import { BigSlider } from 'Components/Slider';
import { SliderCardList } from 'Components/SliderCardList';

import { useHome } from 'context/home/hooks/useHome';

import './Home.css';

export const Home = () => {
    const { result } = useHome();

    return (
        <View>
            <BigSlider data={result} />
            <View className="main-container">
                <SliderCardList title="Новинка цього тижня" />
                <SliderCardList title="Нова колекція" />
            </View>
        </View>
    );
};
