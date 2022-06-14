import React from 'react';
import { View } from '../../../Components/View';
import { Title } from '../../../Components/Title';
import Button from '../../../Components/Button/Button';
import './OrderFinaly.css';
import { useHistory } from 'react-router-dom';
import { UkraineIcon } from '../../../Icons';

const OrderFinaly = () => {
    const history = useHistory();

    return (
        <div>
            <View className="orderFinal-page__container">
                <Title className="orderFinal-page__title" type={3}>
                    Дякуємо за покупку
                </Title>
                <UkraineIcon />
                <Title className="orderFinal-page__title" type={2}>Ваше замовлення успішно оформлене. Очікуєте відправлення!</Title>
                <Title className="orderFinal-page__title" type={1}>Для того щоб відслівкувати своє замовлення увійдіть або зареєструйтесь в особистому кабінеті</Title>
                <div className="orderFinal-page-btn">

                    <Button variant="primary" onClick={() => history.push('/login')}>
                        Увійти
                    </Button>
                </div>
            </View>
        </div>
    );
};

export default OrderFinaly;
