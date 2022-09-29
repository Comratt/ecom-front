import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useForm } from 'react-hook-form';
import Modal from 'Components/Modal';
import { novaPoshtaAPI } from 'API';
import SelectedCity from './SelectedCity';
import OrderService from '../../../Services/OrderService';

const TtnModal = ({
    showTtnModal, toggleTtnModal, result, setResult,
}) => {
    const [offices, setOffices] = useState({
        data: [],
        loading: true,
        error: null,
    });

    const [recipientOffices, setRecipientOffices] = useState({
        data: [],
        loading: true,
        error: null,
    });
    const [refSender, setRefSender] = useState('');
    const [refSenderCounterParty, setRefSenderCounterParty] = useState('');
    const [refRecipientCounterParty, setRefRecipientCounterParty] = useState('');

    const openBlob = (data, type) => {
        const file = new Blob([data], {
            type: type.indexOf('pdf') === 0 ? 'application/pdf' : 'text/html',
        });
        const url = URL.createObjectURL(file);

        window.open(url, '_blank');
    };

    const redirectToPrint = async () => {
        const npRef = result.novaposhta_ttn_ref;
        const { data } = await novaPoshtaAPI.post('', {
            modelName: 'InternetDocument',
            calledMethod: 'printFull',
            methodProperties: {
                DocumentRefs: [npRef],
                Type: 'pdf',
                printForm: 'Marking_100x100',
                Position: '',
            },
        }, { headers: { 'Content-Type': 'application/pdf' }, responseType: 'blob' });

        openBlob(data, 'pdf');

        return null;
    };

    const {
        register, handleSubmit, control, watch, getValues, errors,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            description: 'Одяг',
            price: `${Math.ceil(result.total)}`,
            weight: '0.5',
            payer: 'Recipient',
            paymentMethod: 'Cash',
            dateTime: '',
            cargoType: 'Одяг',
            sender: '',
            citySender: '',
            senderAddress: '',
            recipientsPhone: result.phone,
            recipientName: result.first_name,
            recipientSurname: result.last_name,
            recipientFullName: '',
            recipientCityName: {
                label: result.shipping_city,
                value: result.shipping_city_ref,
            },
            recipientAddress: {
                label: result.shipping_address,
                value: result.shipping_address_ref,
            },
        },
    });
    const onSubmit = async (v) => {
        // ContactRecipient - contactPersonGeneral.Ref
        const { data: contactPersonGeneral } = await novaPoshtaAPI.post('', {
            modelName: 'ContactPersonGeneral',
            calledMethod: 'save',
            methodProperties: {
                CounterpartyRef: refRecipientCounterParty,
                FirstName: v.recipientName,
                LastName: v.recipientSurname,
                MiddleName: v.recipientFullName || '',
                Phone: v.recipientsPhone,
            },
        });

        const { data: { data, success } } = await novaPoshtaAPI.post('', {
            modelName: 'InternetDocument',
            calledMethod: 'save',
            methodProperties: {
                PayerType: 'Recipient',
                PaymentMethod: 'Cash',
                DateTime: new Date().toLocaleString('uk-UA').split(',')[0],
                CargoType: 'Cargo',
                Weight: v.weight,
                ServiceType: 'WarehouseWarehouse',
                SeatsAmount: '1',
                Description: v.description,
                Cost: v.price,
                ParamsOptionsSeats: true,
                CitySender: v.citySender.value,
                Sender: refSenderCounterParty,
                Recipient: refRecipientCounterParty,
                SenderAddress: v.senderAddress,
                ContactSender: refSender?.Ref,
                ContactRecipient: contactPersonGeneral?.data?.[0]?.Ref,
                SendersPhone: refSender?.Phones,
                CityRecipient: v.recipientCityName.value,
                RecipientAddress: v.recipientAddress,
                RecipientsPhone: `38${v.recipientsPhone}`,
            },
        });

        if (!success) {
            console.log('err');

            return;
        }

        try {
            const order = await OrderService.addTtn(result.order_id, data[0]?.Ref);

            setResult((res) => ({
                ...res,
                result: {
                    ...res.result,
                    novaposhta_ttn_ref: order.novaposhta_ttn_ref,
                },
            }));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        novaPoshtaAPI.post('', {
            modelName: 'Counterparty',
            calledMethod: 'getCounterparties',
            methodProperties: {
                CounterpartyProperty: 'Sender',
                GetPrivatePerson: '1',
            },
        })
            .then(({ data: { data } }) => {
                setRefSenderCounterParty(data[0].Ref);
            });
    }, []);

    useEffect(() => {
        novaPoshtaAPI.post('', {
            modelName: 'Counterparty',
            calledMethod: 'getCounterparties',
            methodProperties: {
                CounterpartyProperty: 'Recipient',
                GetPrivatePerson: '1',
            },
        })
            .then(({ data: { data } }) => {
                setRefRecipientCounterParty(data[0].Ref);
            });
    }, []);

    useEffect(() => {
        if (refSenderCounterParty) {
            novaPoshtaAPI.post('', {
                modelName: 'ContactPersonGeneral',
                calledMethod: 'getContactPersonsList',
                methodProperties: {
                    CounterpartyRef: refSenderCounterParty,
                    ContactProperty: 'Sender',
                    Limit: 200,
                    Page: 1,
                    getContactPersonAddress: 1,
                    FindByString: '',
                },
            })
                .then(({ data: { data } }) => {
                    setRefSender(data[0]);
                });
        }
    }, [refSenderCounterParty]);

    useEffect(() => {
        if (watch('recipientCityName')) {
            novaPoshtaAPI.post('', {
                modelName: 'AddressGeneral',
                calledMethod: 'getWarehouses',
                methodProperties: {
                    CityName: watch('recipientCityName').label,
                },
            })
                .then(({ data: { data } }) => setRecipientOffices({
                    data,
                    error: null,
                    loading: false,
                }))
                .catch((e) => {
                    setRecipientOffices({
                        data: [],
                        error: e,
                        loading: false,
                    });
                });
        }
    }, [watch('recipientCityName')?.value]);

    useEffect(() => {
        if (watch('citySender')) {
            novaPoshtaAPI.post('', {
                modelName: 'AddressGeneral',
                calledMethod: 'getWarehouses',
                methodProperties: {
                    CityName: watch('citySender').label,
                },
            })
                .then(({ data: { data } }) => setOffices({
                    data,
                    error: null,
                    loading: false,
                }))
                .catch((e) => {
                    setOffices({
                        data: [],
                        error: e,
                        loading: false,
                    });
                });
        }
    }, [watch('citySender')?.value]);

    return (
        <div>
            <Modal
                show={showTtnModal}
                toggleModal={toggleTtnModal}
                className="return-modal"
            >
                <div className="ttn-container">
                    <div className="container">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="description">Опис відправлення</label>
                                    <input
                                        name="description"
                                        ref={register({ required: 'Обовʼязкове поле' })}
                                        type="text"
                                        className={classNames('form-control', { 'is-invalid': errors?.description })}
                                        id="description"
                                        placeholder="Опис відправлення"
                                    />
                                    <div className="invalid-feedback">
                                        {errors?.description?.message}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="price">Оголошена вартість</label>
                                    <input
                                        ref={register({ required: 'Обовʼязкове поле' })}
                                        type="text"
                                        className={classNames('form-control', { 'is-invalid': errors?.price })}
                                        name="price"
                                        id="price"
                                        placeholder="Оголошена вартість"
                                    />
                                    <div className="invalid-feedback">
                                        {errors?.price?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight">Загальна вага</label>
                                <input
                                    ref={register({ required: 'Обовʼязкове поле' })}
                                    type="text"
                                    className={classNames('form-control', { 'is-invalid': errors?.weight })}
                                    name="weight"
                                    id="weight"
                                    placeholder="Загальна вага"
                                />
                                <div className="invalid-feedback">
                                    {errors?.weight?.message}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="disabledTextInput"><b>Відправник</b></label>
                                <input
                                    ref={register({ required: 'Обовʼязкове поле' })}
                                    type="text"
                                    id="sender"
                                    name="sender"
                                    className={classNames('form-control', { 'is-invalid': errors?.sender })}
                                    disabled
                                    value={`${refSender.Description} +${refSender.Phones}`}
                                />
                                <div className="invalid-feedback">
                                    {errors?.sender?.message}
                                </div>
                            </div>
                            <div className="form-row">

                                <div className="form-group col-md-6">
                                    <label htmlFor="citySender">Населений пункт</label>
                                    <SelectedCity name="citySender" control={control} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputState">Відділення</label>
                                    <select
                                        name="senderAddress"
                                        ref={register({ required: 'Обовʼязкове поле' })}
                                        id="senderAddress"
                                        className={classNames('form-control ttn-select', { 'is-invalid': errors?.senderAddress })}
                                    >
                                        <option selected disabled value={0}>Відділення</option>
                                        {offices.data.map(({ Description, Ref }) => (
                                            <option value={Ref}>
                                                {Description}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">
                                        {errors?.senderAddress?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="disabledTextInput"><b>Одержувач</b></label>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="recipientsPhone">Номер телефону</label>
                                        <input
                                            ref={register({ required: 'Обовʼязкове поле' })}
                                            name="recipientsPhone"
                                            type="text"
                                            className={classNames('form-control', { 'is-invalid': errors?.recipientsPhone })}
                                            id="recipientsPhone"
                                            placeholder="Номер телефону"
                                        />
                                        <div className="invalid-feedback">
                                            {errors?.recipientsPhone?.message}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="recipientSurname">Прізвище</label>
                                        <input
                                            ref={register({ required: 'Обовʼязкове поле' })}
                                            type="text"
                                            className={classNames('form-control', { 'is-invalid': errors?.recipientSurname })}
                                            id="recipientSurname"
                                            name="recipientSurname"
                                            placeholder="Прізвище"
                                        />
                                        <div className="invalid-feedback">
                                            {errors?.recipientSurname?.message}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="recipientName">Імя</label>
                                        <input
                                            ref={register({ required: 'Обовʼязкове поле' })}
                                            type="text"
                                            className={classNames('form-control', { 'is-invalid': errors?.recipientName })}
                                            id="recipientName"
                                            name="recipientName"
                                            placeholder="Імя"
                                        />
                                        <div className="invalid-feedback">
                                            {errors?.recipientName?.message}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="recipientFullName">По батькові</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recipientFullName"
                                            name="recipientFullName"
                                            placeholder="По батькові"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">

                                <div className="form-group col-md-6">
                                    <label htmlFor="recipientCityName">Населений пункт</label>
                                    <SelectedCity
                                        name="recipientCityName"
                                        control={control}
                                        value={{
                                            label: result.shipping_city,
                                            value: result.shipping_city_ref,
                                        }}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="recipientAddressName">Відділення</label>
                                    <select
                                        className={classNames('form-control ttn-select', { 'is-invalid': errors?.recipientAddress })}
                                        ref={register({ required: 'Обовʼязкове поле' })}
                                        name="recipientAddress"
                                    >
                                        <option selected disabled>Відділення</option>
                                        {recipientOffices.data.map(({ Description, Ref }) => (
                                            <option
                                                selected={Ref === result.shipping_address_ref}
                                                value={Ref}
                                            >
                                                {Description}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">
                                        {errors?.recipientAddress?.message}
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Створити накладну</button>
                            {result.novaposhta_ttn_ref
                                && (
                                    <button
                                        type="button"
                                        onClick={redirectToPrint}
                                        className="btn btn-outline-primary ml-3"
                                    >
                                        Роздрукувати
                                    </button>
                                )}
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TtnModal;
