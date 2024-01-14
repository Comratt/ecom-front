import {
    VALIDATION_REQUIRED,
    VALIDATION_MAX_LENGTH, VALIDATION_MIN_NUMBER,
} from 'Constants';

export const TITLE_FIELD = 'title';
export const DESCRIPTION_FIELD = 'description';
export const LINK_FIELD = 'link';
export const SORT_FIELD = 'sort_order';
export const IMAGE_FIELD = 'image';
export const IMAGE_MOBILE_FIELD = 'image_mobile';

export const FIELDS = [
    {
        name: TITLE_FIELD,
        type: 'text',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Добавить заголовок',
        label: 'Заголовок',
    },
    {
        name: DESCRIPTION_FIELD,
        type: 'text',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Добавить описание',
        label: 'Описание',
    },
    {
        name: LINK_FIELD,
        type: 'select',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Добавить ссылку',
        label: 'Ссылка',
    },
    {
        name: SORT_FIELD,
        type: 'number',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Добавити сортування',
        label: 'Сортування',
    },
    {
        name: IMAGE_FIELD,
        type: 'file',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Добавить картинку',
        label: 'Картинка',
    },
    {
        name: IMAGE_MOBILE_FIELD,
        type: 'file',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Добавить картинку для моб. девайсов',
        label: 'Картинка для мобильных девайсов',
    },
];

export const VALIDATION_RULES = {
    [TITLE_FIELD]: {
        [VALIDATION_REQUIRED]: 'Заголовок обязательное поле',
        [VALIDATION_MAX_LENGTH]: {
            value: 20,
            message: 'Заголовок должен быть меньше 20 символов',
        },
    },
    [DESCRIPTION_FIELD]: {
        [VALIDATION_REQUIRED]: 'Описание обязательное поле',
        [VALIDATION_MAX_LENGTH]: {
            value: 50,
            message: 'Описание должно быть меньше 50 символов',
        },
    },
    [LINK_FIELD]: {
        [VALIDATION_MAX_LENGTH]: {
            value: 50,
            message: 'Ссылка должна быть меньше 50 символов',
        },
    },
    [SORT_FIELD]: {
        [VALIDATION_MIN_NUMBER]: {
            value: 1,
            message: 'Сортування починається з 1',
        },
    },
    [IMAGE_FIELD]: {},
    [IMAGE_MOBILE_FIELD]: {},
};
