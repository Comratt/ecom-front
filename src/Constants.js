import currency from 'currency.js';

export const MARKET_NAME = 'PAPAROT';
export const MARKET_DESCRIPTION = `Інтернет-магазин ${MARKET_NAME}: купити чоловічі костюми та куртки саме в нас. Купуйте в ${MARKET_NAME}! | Офіційна гарантія | Доставка по всій Україні | Якісні чоловічі куртки, костюми $ Вигідні ціни та знижки %`;
export const MARKET_TITLE = `Інтернет-магазин ${MARKET_NAME}: сайт з найпопулярнішими чоловічими куртками та костюмами в Україні`;
export const MARKET_KEYWORDS = `${MARKET_NAME.toLowerCase()}, ${MARKET_NAME.toUpperCase()}, костюми, чоловічі костюми, куртки, чоловічі куртки, купити, костюм на весілля, свадьба, костюм для нареченого, наречений, дешевий весільний костюм, костюм на пошив, онлайн-магазин`;

export const MOBILE_VIEWPORT_MAX_WIDTH = 576;
export const TABLET_VIEWPORT_MAX_WIDTH = 768;
export const DESKTOP_VIEWPORT_MAX_WIDTH = 1024;

export const VALIDATION_REQUIRED = 'required';
export const VALIDATION_MAX_LENGTH = 'maxLength';
export const VALIDATION_MIN_LENGTH = 'minLength';
export const VALIDATION_MAX_NUMBER = 'max';
export const VALIDATION_MIN_NUMBER = 'min';
export const VALIDATION_REGEXP_PATTERN = 'pattern';
export const VALIDATION_CUSTOM = 'validate';
export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATEDDMMYYYY = 'DD.MM.YYYY';

const ALL_VALIDATION_RULES = [
    VALIDATION_REQUIRED,
    VALIDATION_MAX_LENGTH,
    VALIDATION_MIN_LENGTH,
    VALIDATION_MAX_NUMBER,
    VALIDATION_MIN_NUMBER,
    VALIDATION_REGEXP_PATTERN,
];

export const extensionRegExp = new RegExp('(?:\\.([^.]+))?$');
export const emailRegExp = new RegExp('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$');
export const numberRegExp = new RegExp('^[0-9]+$');
export const floatRegExp = new RegExp('^\\d+(\\.\\d+)?$');
export const dateRegExp = new RegExp('^(0[1-9]|1\\d|2[0-8]|29(?=-\\d\\d-(?!1[01345789]00|2[1235679]00)\\d\\d(?:[02468][048]|[13579][26]))|30(?!-02)|31(?=-0[13578]|-1[02]))-(0[1-9]|1[0-2])-([12]\\d{3})$');
export const phoneNumberRegExp = new RegExp('^\\+38 \\(\\d{3}\\) \\d{3}(-\\d{2}){2}$');

export const ADD_METHOD = 'add';
export const UPDATE_METHOD = 'update';

export const OPTION_TYPES = {
    Color: 1,
    Size: 2,
};

export const SHIPPING_CODES = {
    1: 'Очікує менеджера',
    2: 'В роботі',
    3: 'Прямує до отримувача',
    4: 'Очікує на складі',
    5: 'Nova Poshta',
    6: 'Завершено',
    7: 'Відмінено',
};

export const SHIPPING_RATE = 45;

export const getValidationMessage = ({ type = '', message } = {}) => {
    if (ALL_VALIDATION_RULES.includes(type)) {
        return message;
    }

    return '';
};

export const getFormattedPrice = (price = 0, prefix = '₴') => currency(price, { pattern: '# !', precision: 1 }).format({ symbol: prefix });
