import {
    VALIDATION_REQUIRED,
    VALIDATION_MAX_LENGTH,
} from 'Constants';

export const CATEGORY_NAME_FIELD = 'category_name';
export const CATEGORY_DESCRIPTION_FIELD = 'description';
export const CATEGORY_META_TITLE_FIELD = 'meta_title';
export const CATEGORY_META_DESCRIPTION_FIELD = 'meta_description';
export const CATEGORY_META_KEYWORDS_FIELD = 'meta_keywords';
export const PARENT_ID_FIELD = 'parent_id';
export const IMAGE_FIELD = 'image';

export const FIELDS = [
    {
        name: CATEGORY_NAME_FIELD,
        type: 'text',
        required: true,
        placeholder: 'Добавить заголовок',
        label: 'Заголовок',
    },
    {
        name: CATEGORY_DESCRIPTION_FIELD,
        type: 'text',
        required: true,
        placeholder: 'Добавить описание',
        label: 'Описание',
    },
    {
        name: PARENT_ID_FIELD,
        type: 'select',
        required: true,
        placeholder: 'Родительская категория',
        label: 'Родительская категория',
    },
    {
        name: IMAGE_FIELD,
        type: 'file',
        required: true,
        placeholder: 'Добавить картинку',
        label: 'Картинка',
    },
];

export const SEO_FIELDS = [
    {
        name: CATEGORY_META_TITLE_FIELD,
        type: 'text',
        required: true,
        placeholder: 'SEO заголовок',
        label: 'SEO Заголовок',
    },
    {
        name: CATEGORY_META_DESCRIPTION_FIELD,
        type: 'text',
        required: true,
        placeholder: 'SEO описание',
        label: 'SEO описание',
    },
    {
        name: CATEGORY_META_KEYWORDS_FIELD,
        type: 'text',
        required: true,
        placeholder: 'SEO ключевые слова',
        label: 'SEO ключевые слова',
    },
];

export const VALIDATION_RULES = {
    [CATEGORY_NAME_FIELD]: {
        [VALIDATION_REQUIRED]: 'Заголовок обязательное поле',
        [VALIDATION_MAX_LENGTH]: {
            value: 20,
            message: 'Заголовок должен быть меньше 20 символов',
        },
    },
    [CATEGORY_DESCRIPTION_FIELD]: {
        [VALIDATION_REQUIRED]: 'Описание обязательное поле',
        [VALIDATION_MAX_LENGTH]: {
            value: 50,
            message: 'Описание должно быть меньше 50 символов',
        },
    },
    [CATEGORY_META_TITLE_FIELD]: {
        [VALIDATION_MAX_LENGTH]: {
            value: 25,
            message: 'SEO Заголовок должен быть меньше 25 символов',
        },
    },
    [CATEGORY_META_DESCRIPTION_FIELD]: {
        [VALIDATION_MAX_LENGTH]: {
            value: 50,
            message: 'SEO Описание должно быть меньше 50 символов',
        },
    },
    [CATEGORY_META_KEYWORDS_FIELD]: {
        [VALIDATION_MAX_LENGTH]: {
            value: 50,
            message: 'SEO ключевые слова',
        },
    },
    [PARENT_ID_FIELD]: {},
    [IMAGE_FIELD]: {},
};
