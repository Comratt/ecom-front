import React from 'react';
import { Content } from '../ProductTab';

const ProductTabSpecial = () => (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Група клієнтів</th>
                    <th>Пріоритет</th>
                    <th>Дата початку</th>
                    <th>Дата закінчення</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <select>
                            <option value="Checkbox 1">За замовчуванням</option>
                        </select>
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
                        <button>видалити</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default ProductTabSpecial;
