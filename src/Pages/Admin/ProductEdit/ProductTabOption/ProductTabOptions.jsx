import React from 'react';
import './ProductTabOptions.css';

const ProductTabOptions = () => (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Option Value</th>
                    <th>Quantity</th>
                    <th>Subtract Stock</th>
                    <th>Price</th>
                    <th>Points</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <select className="productTabOptionSelect">
                            <option value="Checkbox 1">Checkbox 1</option>
                            <option value="Checkbox 2">Checkbox 2</option>
                            <option value="Checkbox 3">Checkbox 3</option>
                            <option value="Checkbox 4">Checkbox 4</option>
                        </select>
                    </td>
                    <td>
                        <input className="productTabOptionInput" type="text" />
                    </td>
                    <td>
                        <select className="productTabOptionSelect">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </td>
                    <td>
                        <select className="productTabOptionSelect">
                            <option value="Minus">-</option>
                            <option value="Plus">+</option>
                        </select>
                        <input className="productTabOptionInput" type="text" />
                    </td>
                    <td>
                        <select className="productTabOptionSelect">
                            <option value="Minus">-</option>
                            <option value="Plus">+</option>
                        </select>
                        <input className="productTabOptionInput" type="text" />
                    </td>
                    <td>
                        <select className="productTabOptionSelect">
                            <option value="Minus">-</option>
                            <option value="Plus">+</option>
                        </select>
                        <input className="productTabOptionInput" type="text" />
                    </td>
                    <td>
                        <button>delet</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default ProductTabOptions;
