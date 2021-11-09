import React, { useState } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Input from 'Components/Input';
import { useAddProduct } from 'context/addProduct/useAddProduct';

import './ProductTabGeneral.css';

const ProductTabGeneral = () => {
    const [v, setV] = useState();
    const { values, handleValuesChange } = useAddProduct();
    const onEditorStateChange = (editorState) => setV(editorState);

    console.log(v && draftToMarkdown(convertToRaw(v.getCurrentContent())));

    return (
        <div>
            <form>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="productName">
                            <b>
                                Product Name
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
                        <label htmlFor="productTextArea">
                            <b>
                                Description
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <Editor
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
