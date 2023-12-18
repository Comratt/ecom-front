import React from 'react';

import { MARKET_DESCRIPTION, MARKET_TITLE, MARKET_KEYWORDS } from 'Constants';
import { View } from 'Components/View';
import { BigSlider } from 'Components/Slider';
import { SliderCardList } from 'Components/SliderCardList';
import MetaTags from 'Components/MetaTags';
import { ThreeDots } from 'Components/SkeletonLoader';
import { Title } from 'Components/Title';
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
                tags="Tags"
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
            <View className="main-container">
                <Title type={1}>
                    Вітаємо в інтернет-магазині жіночого одягу Paparot!
                    У нас ви знайдете останні тренди моди та найширший асортимент стильних та якісних рішень для Вашого гардероба.
                    Ваші пошуки кінчаються тут, адже Paparot - ідеальне місце, метою якого є створити максимально легкий, приємний та ефективний процескупівлі жіночого одягу в Україні.
                </Title>
                <Title type={2}>
                    Спеціально для того, щоб задовольнити всі Ваші модні потреби, ми підібрали для Вас кращі моделі від відомих брендів і молодих дизайнерів в яких Ви будете відчувати себе комфортно та впевнено. Від елегантних платтів та костюмів до зручних джинсів і світшотів, ми пропонуємо вишуканий та стильний одяг для будь-якої нагоди.
                </Title>
                <Title type={3}>
                    Paparot орієнтується на деталі, які робять нас відрізняють від інших магазинів жіночого одягу. Ми забезпечуємо швидку та безкоштовну доставку по всій Україні, а також можливість безплатного повернення товару протягом 14 календарних днів, для отримання максимально вигідних і комфортних умов покупки для наших клієнтів.
                </Title>
                <Title type={4}>
                    Слідкуйте за нашими акціями та новими надходженнями, обирайте напрямок для шопінгу в Paparot і насолоджуйтеся зручністю, якісним асортиментом та приємною атмосферою вашого улюбленого інтернет-магазину жіночого одягу. Дозвольте Paparot допомогти Вам зробити ваші покупки приємний та ефективний досвід, дізнайтесь, чому ми заслужили таку популярність серед модниць українського мегафункціонального інтернет-майста. Зробіть свій вибір та переконайтеся самі, що жоден інший інтернет-магазин не може пропонувати вам більше!
                </Title>
            </View>
        </View>
    );
};
