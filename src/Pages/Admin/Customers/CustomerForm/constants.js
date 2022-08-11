import {
    VALIDATION_REQUIRED,
    VALIDATION_MAX_LENGTH,
    VALIDATION_REGEXP_PATTERN,
    emailRegExp, VALIDATION_MIN_LENGTH,
} from 'Constants';

export const FIRST_NAME_FIELD = 'first_name';
export const LAST_NAME_FIELD = 'last_name';
export const PHONE_FIELD = 'phone';
export const EMAIL_FIELD = 'email';
export const PASSWORD_FIELD = 'password';
export const ROLE_FIELD = 'role';

export const FIELDS = [
    {
        name: FIRST_NAME_FIELD,
        type: 'text',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Імя користувача',
        label: 'Імя',
    },
    {
        name: LAST_NAME_FIELD,
        type: 'text',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Прізвище користувача',
        label: 'Прізвище',
    },
    {
        name: PHONE_FIELD,
        type: 'number',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Телефон користувача',
        label: 'Телефон',
    },
    {
        name: EMAIL_FIELD,
        type: 'email',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Email користувача',
        label: 'Email',
    },
    {
        name: PASSWORD_FIELD,
        type: 'text',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Пароль користувача',
        label: 'Пароль',
    },
    {
        name: ROLE_FIELD,
        type: 'select',
        required: false,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Пароль користувача',
        label: 'Роль користувача',
        options: [
            {
                label: 'Користувач',
                value: 'customer',
            },
            {
                label: 'Адміністратор!',
                value: 'admin',
            },
            {
                label: 'Менеджер',
                value: 'subadmin',
            },
        ],
    },
];

export const VALIDATION_RULES = {
    [FIRST_NAME_FIELD]: {
        [VALIDATION_REQUIRED]: 'Імя обовязкове поле',
        [VALIDATION_MAX_LENGTH]: {
            value: 20,
            message: 'Заголовок должен быть меньше 20 символов',
        },
    },
    [LAST_NAME_FIELD]: {
        [VALIDATION_REQUIRED]: 'Фамілія обовязкове поле',
        [VALIDATION_MAX_LENGTH]: {
            value: 50,
            message: 'Описание должно быть меньше 50 символов',
        },
    },
    [PHONE_FIELD]: {
        [VALIDATION_REQUIRED]: 'Телефон обовязкове поле',
        [VALIDATION_MIN_LENGTH]: {
            value: 10,
            message: 'Введіть коректний номер телефону',
        },
        [VALIDATION_MAX_LENGTH]: {
            value: 13,
            message: 'Введіть коректний номер телефону',
        },
    },
    [EMAIL_FIELD]: {
        [VALIDATION_REQUIRED]: 'Email обовязкове поле',
        [VALIDATION_REGEXP_PATTERN]: {
            value: emailRegExp,
            message: 'Введіть коректний email',
        },
    },
    [PASSWORD_FIELD]: {
        [VALIDATION_REQUIRED]: 'Пароль обовязкове поле',
        [VALIDATION_MIN_LENGTH]: {
            value: 6,
            message: 'Введіть пароль не менш ніж 6 символів',
        },
        [VALIDATION_MAX_LENGTH]: {
            value: 20,
            message: 'Введіть пароль не більш ніж 20 символів',
        },
    },
    [ROLE_FIELD]: {},
};
