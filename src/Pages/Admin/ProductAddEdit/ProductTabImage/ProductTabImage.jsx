import React from 'react';

import { useAddProduct } from 'context/addProduct/useAddProduct';
import { PlusIcon, Remove } from 'Icons';
import { getImage } from 'API';

const ProductTabImage = () => {
    const {
        onAddProductImage,
        onChangeProductImage,
        onDeleteProductImage,
        onChangeMainImage,
        mainImage,
        images,
    } = useAddProduct();

    return (
        <div>
            <table className="table table-bordered table-striped">
                <thead>
                    <th>Image</th>
                    <th>Choose image</th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img
                                className="img-thumbnail"
                                style={{ width: '100px' }}
                                src={(
                                    mainImage.imagePreview || getImage(mainImage.image)
                                )}
                                alt="product"
                            />
                        </td>
                        <td>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    onChange={onChangeMainImage}
                                    className="custom-file-input"
                                    id="customFileLang"
                                    lang="es"
                                />
                                <label className="custom-file-label" htmlFor="customFileLang" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Additional Images</th>
                        <th>Sort Order</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {images.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img
                                    className="img-thumbnail"
                                    style={{ width: '100px' }}
                                    src={(
                                        item.imagePreview || getImage(item.image)
                                    )}
                                    alt="product"
                                />
                            </td>
                            <td>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFileLang"
                                        onChange={(e) => onChangeProductImage(item.id)(e)}
                                    />
                                    <label className="custom-file-label" htmlFor="customFileLang" />
                                </div>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => onDeleteProductImage(item.id)}
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
                        <td>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={onAddProductImage}
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

export default ProductTabImage;