import {
    VALIDATION_REQUIRED,
    VALIDATION_MAX_LENGTH, VALIDATION_MIN_NUMBER,
} from 'Constants';
import { SORT_FIELD } from '../../Banners/BannerForm/constants';

export const OPTION_NAME_FIELD = 'name';
export const OPTION_VALUE_NAME = 'name_value';
export const OPTION_VALUE_DESCRIPTION = 'description';
export const OPTION_VALUE_IMAGE = 'image';
export const OPTION_VALUE_COLOR = 'color';

export const VALIDATION_RULES = {
    [OPTION_NAME_FIELD]: {
        [VALIDATION_REQUIRED]: 'Название опции обязательное поле',
        [VALIDATION_MAX_LENGTH]: {
            value: 20,
            message: 'Название опции должен быть меньше 20 символов',
        },
    },
    [OPTION_VALUE_NAME]: {
        [VALIDATION_REQUIRED]: 'Значение опции обязательное поле',
        [VALIDATION_MAX_LENGTH]: {
            value: 50,
            message: 'Значение опции должно быть меньше 20 символов',
        },
    },
    [OPTION_VALUE_DESCRIPTION]: {
        [VALIDATION_MAX_LENGTH]: {
            value: 25,
            message: 'Описание должно быть меньше 25 символов',
        },
    },
    [OPTION_VALUE_COLOR]: {
        [VALIDATION_MIN_NUMBER]: {
            value: 1,
            message: 'Сортування починається з 1',
        },
    },
    [OPTION_VALUE_IMAGE]: {},
};
