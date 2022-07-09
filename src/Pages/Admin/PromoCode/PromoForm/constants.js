import {
    VALIDATION_REQUIRED,
    VALIDATION_MAX_LENGTH,
    VALIDATION_MIN_LENGTH,
    VALIDATION_MAX_NUMBER,
    VALIDATION_MIN_NUMBER,
} from 'Constants';

export const NAME_FIELD = 'promocode_name';
export const PRICE_FIELD = 'promocode_price';
export const PREFIX_FIELD = 'promocode_prefix';

export const FIELDS = [
    {
        name: NAME_FIELD,
        type: 'text',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Назва коду знижки',
        label: 'Номер',
    },
    {
        name: PRICE_FIELD,
        type: 'number',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Ціна знижки',
        label: 'Ціна',
    },
];

export const VALIDATION_RULES = {
    [NAME_FIELD]: {
        [VALIDATION_REQUIRED]: 'Назва коду обовязкове поле',
        [VALIDATION_MIN_LENGTH]: {
            value: 4,
            message: 'Назва коду має бути не менше 4 символів',
        },
        [VALIDATION_MAX_LENGTH]: {
            value: 10,
            message: 'Назва коду має бути не більше 10 символів',
        },
    },
    [PRICE_FIELD]: {
        [VALIDATION_REQUIRED]: 'Ціна обовязкове поле',
        [VALIDATION_MIN_NUMBER]: {
            value: 1,
            message: 'Ціна має бути не менше 1',
        },
        [VALIDATION_MAX_NUMBER]: {
            value: 5000,
            message: 'Ціна має бути не більше 5000',
        },
    },
    [PREFIX_FIELD]: {
        [VALIDATION_REQUIRED]: 'Тип знижки обовязкове поле',
    },
};
