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
