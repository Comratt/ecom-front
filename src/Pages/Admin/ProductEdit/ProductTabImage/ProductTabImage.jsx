import React from 'react';
import { Content } from '../ProductTab';

const ProductTabImage = () => (
    <div>
        <table>
            <thead>
                <th>Image</th>
            </thead>
            <tbody>
                <td>
                    <img style={{ width: '100px' }} src="https://demo.opencart.com/image/cache/catalog/demo/apple_cinema_30-40x40.jpg" alt="product" />
                </td>
            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                    <th>Additional Images</th>
                    <th>Sort Order	</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <img style={{ width: '100px' }} src="https://demo.opencart.com/image/cache/catalog/demo/apple_cinema_30-40x40.jpg" alt="product" />
                    </td>
                    <td>
                        <input type="text" />
                        <button>deleted</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default ProductTabImage;
