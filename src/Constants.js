export const MOBILE_VIEWPORT_MAX_WIDTH = 576;
export const TABLET_VIEWPORT_MAX_WIDTH = 768;

export const VALIDATION_REQUIRED = 'required';
export const VALIDATION_MAX_LENGTH = 'maxLength';
export const VALIDATION_MIN_LENGTH = 'minLength';
export const VALIDATION_MAX_NUMBER = 'max';
export const VALIDATION_MIN_NUMBER = 'min';
export const VALIDATION_REGEXP_PATTERN = 'pattern';
export const VALIDATION_CUSTOM = 'validate';

const ALL_VALIDATION_RULES = [
    VALIDATION_REQUIRED,
    VALIDATION_MAX_LENGTH,
    VALIDATION_MIN_LENGTH,
    VALIDATION_MAX_NUMBER,
    VALIDATION_MIN_NUMBER,
    VALIDATION_REGEXP_PATTERN,
];

export const ADD_METHOD = 'add';
export const UPDATE_METHOD = 'update';

export const getValidationMessage = ({ type = '', message } = {}) => {
    if (ALL_VALIDATION_RULES.includes(type)) {
        return message;
    }

    return '';
};
