import React, { useState, useEffect } from 'react';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Input from 'Components/Input';

import { useAddProduct } from 'context/addProduct/useAddProduct';

import './ProductTabGeneral.css';
import { getImage } from '../../../../API';
import Remove from '../../../../Icons/Remove';

const ProductTabGeneral = () => {
    const [v, setV] = useState();
    const {
        values,
        handleValuesChange,
        handleDescriptionChange,
        product,
        tableSizeImage,
        onChangeTableSizeImage,
        onDeleteTableSizeImage,
    } = useAddProduct();
    const onEditorStateChange = (editorState) => {
        setV(editorState);
        handleDescriptionChange(draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
    };

    useEffect(() => {
        if (product.description) {
            const rawData = markdownToDraft(product.description);
            const contentState = convertFromRaw(rawData);
            const newEditorState = EditorState.createWithContent(contentState);

            setV(newEditorState);
        }
    }, [product.description]);

    return (
        <div>
            <form>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="status">
                            <b>
                                Статус
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <select
                            className="form-control"
                            onChange={handleValuesChange}
                            name="status"
                            id="status"
                        >
                            <option selected={values.status == 1} value="1">Активний</option>
                            <option selected={values.status == 0} value="0">Вимкнено</option>
                        </select>
                    </div>
                </div>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="productName">
                            <b>
                                Назва продукту
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <Input
                            value={values.productName}
                            name="productName"
                            onChange={handleValuesChange}
                            id="ProductName"
                            type="text"
                        />
                    </div>
                </div>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="productName">
                            <b>
                                Модель
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <Input
                            value={values.model}
                            name="model"
                            onChange={handleValuesChange}
                            id="model"
                            type="text"
                        />
                    </div>
                </div>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="price">
                            <b>
                                Ціна
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <Input
                            value={values.price}
                            name="price"
                            onChange={handleValuesChange}
                            id="price"
                            type="number"
                        />
                    </div>
                </div>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="price">
                            <b>
                                Таблиця розмірів
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <img
                            className="img-thumbnail"
                            style={{ width: '100px' }}
                            src={(
                                tableSizeImage.imagePreview || getImage(tableSizeImage.image)
                            )}
                            alt="product"
                        />
                        <div className="custom-file">
                            <input
                                type="file"
                                onChange={onChangeTableSizeImage}
                                className="custom-file-input"
                                id="customFileLang"
                                lang="es"
                            />
                            <label className="custom-file-label" htmlFor="customFileLang" />
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={onDeleteTableSizeImage}
                            >
                                <Remove
                                    fill="red"
                                    width={14}
                                    height={14}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="productTextArea">
                            <b>
                                Опис
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput input-description">
                        <Editor
                            editorState={v}
                            onEditorStateChange={onEditorStateChange}
                            toolbar={{
                                history: { inDropdown: true },
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductTabGeneral;
