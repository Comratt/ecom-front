import React from 'react';

import { MARKET_DESCRIPTION, MARKET_TITLE, MARKET_KEYWORDS } from 'Constants';
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
                title={MARKET_TITLE}
                metaTitle={MARKET_TITLE}
                description={MARKET_DESCRIPTION}
                tags="Besco"
                keywords={MARKET_KEYWORDS}
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
                        hideColors
                    />
                ))}
            </View>
        </View>
    );
};
