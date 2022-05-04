export const getFilteredOptions = (options = [], type) => (
    options.filter(({ option_type }) => option_type === type)?.map(
        (item) => ({ ...item, id: item.option_value_id, name: item.name_value }),
    )
);

export const getNameById = (arrData = [], id) => {
    if (!Array.isArray(arrData)) return null;

    const findItem = arrData.find(({ id: dataId }) => id === dataId) || {};

    return findItem?.name;
};

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
