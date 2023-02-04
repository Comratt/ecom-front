import isEqual from 'lodash/isEqual';
import trim from 'lodash/trim';
import hmacMD5 from 'crypto-js/hmac-md5';
import { WAYFORPAY_KEY, WAYFORPAY_MERCHANT, WAYFORPAY_WEBSITE } from './Constants';

export const getFilteredOptions = (options = [], type) => (
    options.filter(({ option_type }) => option_type === type)?.map(
        (item) => ({ ...item, id: item.option_value_id, name: item.name_value }),
    )
);

export const sortOrder = (first, second) => first?.sort_order - second?.sort_order;

export const getNameById = (arrData = [], id) => {
    if (!Array.isArray(arrData)) return null;

    const findItem = arrData.find(({ id: dataId }) => id === dataId) || {};

    return findItem?.name;
};

export const getObjectDiff = (obj1, obj2) => Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
        result.push(key);
    } else if (isEqual(obj1[key], obj2[key])) {
        const resultKeyIndex = result.indexOf(key);

        result.splice(resultKeyIndex, 1);
    }

    return result;
}, Object.keys(obj2));

const getRelativePos = (elm) => {
    const pPos = elm.parentNode.getBoundingClientRect(); // parent pos
    const cPos = elm.getBoundingClientRect(); // target pos

    return {
        top: cPos.top - pPos.top + elm.parentNode.scrollTop,
        right: cPos.right - pPos.right,
        bottom: cPos.bottom - pPos.bottom,
        left: cPos.left - pPos.left,
    };
};

const scrollTo = (element, to, duration, onDone) => {
    const start = element.scrollTop;
    const change = to - start;
    const startTime = performance.now();

    function animateScroll() {
        const now = performance.now();
        const elapsed = (now - startTime) / 1000;
        const t = (elapsed / duration);

        element.scrollTop = start + change * easeInOutQuad(t);

        if (t < 1) window.requestAnimationFrame(animateScroll);
        else onDone && onDone();
    }

    animateScroll();
};

const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

export const scrollToElm = (container, elm, duration) => {
    const pos = getRelativePos(elm);

    scrollTo(container, pos.top, duration); // duration in seconds
};

export const getMerchantSignature = (params, order) => {
    const orderTime = new Date(order.created_at).getTime() / 1000;
    const productNames = params?.products?.reduce((acc, val) => `${acc }${val?.name};`, '');
    const productQuantity = params?.products?.reduce((acc, val) => `${acc }${val?.quantity};`, '');
    const productPrices = params?.products?.reduce((acc, val) => `${acc }${val?.purePrice};`, '');
    // eslint-disable-next-line max-len
    const productAmount = params?.products?.reduce((acc, val) => acc + +val?.purePrice, 0).toFixed(2);
    const string = trim(`${WAYFORPAY_MERCHANT};${WAYFORPAY_WEBSITE};${order.order_id};${orderTime};${productAmount};UAH;${productNames}${productQuantity}${productPrices}`, ';');

    console.log(string);

    return hmacMD5(string, WAYFORPAY_KEY).toString();
};
