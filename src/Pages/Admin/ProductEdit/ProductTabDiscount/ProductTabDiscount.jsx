import React from 'react';

const ProductTabDiscount = () => (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Customer Group</th>
                    <th>Quantity</th>
                    <th>Priority</th>
                    <th>Date Start</th>
                    <th>Date End</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <select>
                            <option value="Checkbox 1">Default</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" value="10" />
                    </td>
                    <td>
                        <input type="text" value="1" />
                    </td>
                    <td>
                        <input type="date" />
                    </td>
                    <td>
                        <input type="date" />
                    </td>
                    <td>
                        <button>delet</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default ProductTabDiscount;