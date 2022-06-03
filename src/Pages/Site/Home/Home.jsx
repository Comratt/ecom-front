import React from 'react';

import { View } from 'Components/View';
import { BigSlider } from 'Components/Slider';
import { SliderCardList } from 'Components/SliderCardList';
import MetaTags from 'Components/MetaTags';
import { ThreeDots } from 'Components/SkeletonLoader';
import { SliderWithDisableVerticalScroll } from 'Components/Slider/SliderWithDisableVerticalScroll';

import { useHome } from 'context/home/hooks/useHome';

import './Home.css';

export const Home = () => {
    const {
        result,
        loading,
        loadingCategories,
        resultCategories,
    } = useHome();

    if (loading || loadingCategories) {
        return <ThreeDots />;
    }

    return (
        <View>
            <MetaTags
                title="Інтернет магазин - 13"
                metaTitle="Інтернет магазин - 12"
                description="Description"
                tags="Tags"
                keywords="asd, dds, sfdsf"
            />
            <SliderWithDisableVerticalScroll>
                <BigSlider data={result} />
            </SliderWithDisableVerticalScroll>
            <View className="main-container">
                {resultCategories?.map((category, index) => (
                    <SliderCardList
                        count={index % 2 === 0 ? 4 : 5}
                        key={category?.id}
                        category={[category?.id]}
                        title={category?.name}
                    />
                ))}
            </View>
        </View>
    );
};
