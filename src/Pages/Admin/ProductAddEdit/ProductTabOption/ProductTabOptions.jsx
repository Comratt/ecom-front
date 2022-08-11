import React from 'react';
import { useAsync } from 'react-async-hook';

import OptionService from 'Services/OptionService';
// eslint-disable-next-line import/no-cycle
import { useAddProduct } from 'context/addProduct/useAddProduct';
import { OPTION_TYPES } from 'Constants';
import { getFilteredOptions } from 'Helpers';
import PlusIcon from 'Icons/PlusIcon';
import Remove from 'Icons/Remove';

import './ProductTabOptions.css';

const ProductTabOptions = () => {
    const {
        handleAddOption,
        handleOptionDelete,
        handleChangeOption,
        options,
    } = useAddProduct();
    const { result: optionsData } = useAsync(OptionService.getOptionsValue, []);
    const colors = getFilteredOptions(optionsData, OPTION_TYPES.Color);
    const sizes = getFilteredOptions(optionsData, OPTION_TYPES.Size);

    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Колір</th>
                        <th>Розмір</th>
                        <th>Кількість</th>
                        <th>Ціна</th>
                        <th style={{ width: '2%' }}>Діяння</th>
                    </tr>
                </thead>
                <tbody>
                    {options.map(({
                        id, color, size, quantity,
                    }) => (
                        <tr key={id}>
                            <td>
                                <select
                                    name="color"
                                    className="form-control productTabOptionSelect"
                                    onChange={(e) => handleChangeOption(id)(e)}
                                >
                                    <option selected disabled>Select color</option>
                                    {colors.map((colorItem) => (
                                        <option
                                            key={colorItem.id}
                                            value={colorItem.id}
                                            selected={colorItem.id === color}
                                        >
                                            {colorItem.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    name="size"
                                    className="form-control productTabOptionSelect"
                                    onChange={(e) => handleChangeOption(id)(e)}
                                >
                                    <option selected disabled>Select size</option>
                                    {sizes.map((sizeItem) => (
                                        <option
                                            key={sizeItem.id}
                                            value={sizeItem.id}
                                            selected={sizeItem.id === size}
                                        >
                                            {sizeItem.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input
                                    min={1}
                                    name="quantity"
                                    value={quantity}
                                    type="number"
                                    className="form-control"
                                    onChange={(e) => handleChangeOption(id)(e)}
                                />
                            </td>
                            <td>
                                <select className="form-control productTabOptionSelect">
                                    <option value="Minus">-</option>
                                    <option value="Plus">+</option>
                                </select>
                                <input className="form-control productTabOptionInput" type="text" />
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => handleOptionDelete(id)}
                                >
                                    <Remove
                                        fill="red"
                                        width={14}
                                        height={14}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={handleAddOption}
                            >
                                <PlusIcon
                                    fill="blue"
                                    width={14}
                                    height={14}
                                />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProductTabOptions;
