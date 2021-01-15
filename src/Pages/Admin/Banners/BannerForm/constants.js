import {
    VALIDATION_REQUIRED,
    VALIDATION_MAX_LENGTH,
} from 'Constants';

export const TITLE_FIELD = 'title';
export const DESCRIPTION_FIELD = 'description';
export const LINK_FIELD = 'link';
export const IMAGE_FIELD = 'image';

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
        type: 'text',
        required: true,
        icon: 'tags',
        iconPosition: 'left',
        placeholder: 'Добавить ссылку',
        label: 'Ссылка',
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
    [IMAGE_FIELD]: {},
};
