import React from 'react';

// eslint-disable-next-line import/no-cycle
import { useAddProduct } from 'context/addProduct/useAddProduct';
import PlusIcon from 'Icons/PlusIcon';
import Remove from 'Icons/Remove';
import { getImage } from 'API';
import { extensionRegExp } from 'Constants';
import './ProductTabImage.css';

const ItemVideo = ({ path = '', ext = '' }) => {
    const extWithoutDot = ext.replace('.', '');
    const extension = extWithoutDot || 'mp4';

    return (
        <video className="img-thumbnail" height="110" width="90" autoPlay playsInline muted loop>
            <source src={path} type={`video/${extension}`} />
        </video>
    );
};

const ItemImage = ({ image }) => (
    <img
        className="img-thumbnail"
        style={{ width: '100px' }}
        src={image}
        alt="product"
    />
);

const getBannerBody = (image = '') => {
    const extension = image.match(extensionRegExp)?.[0];

    if (!['.webp', '.jpeg', '.jpg'].includes(extension.toLowerCase())) {
        return <ItemVideo path={image} ext={extension} />;
    }

    return <ItemImage image={image} />;
};

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
        <div className="product-tab-image">
            <table className="table table-bordered table-striped">
                <thead>
                    <th>Зображення</th>
                    <th>Виберіть зображення</th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {getBannerBody(mainImage.imagePreview || getImage(mainImage.image))}
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
                        <th>Додаткові зображення</th>
                        <th>Порядок сортування</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {images.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {getBannerBody(item.imagePreview || getImage(item.image))}
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
