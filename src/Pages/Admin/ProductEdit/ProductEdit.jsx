import React, { useState } from 'react';
import { Tab, Tabs, Content } from './ProductTab';
import Layout from '../Layout';
import './ProductEdit.css';
import { Pencil } from '../../../Icons';

const App = () => {
    const [active, setActive] = useState(0);
    const handleClick = (e) => {
        const index = parseInt(e.target.id, 0);

        if (index !== active) {
            setActive(index);
        }
    };

    return (
        <div className="App">
            <h5 className="header-tabs">Edit Product</h5>

            <Tabs>
                <Tab onClick={handleClick} active={active === 0} id={0}>
                    General
                </Tab>

                <Tab onClick={handleClick} active={active === 1} id={1}>
                    Data
                </Tab>
                <Tab onClick={handleClick} active={active === 2} id={2}>
                    Links
                </Tab>
                <Tab onClick={handleClick} active={active === 3} id={3}>
                    Attribute
                </Tab>
                <Tab onClick={handleClick} active={active === 4} id={4}>
                    Option
                </Tab>
                <Tab onClick={handleClick} active={active === 5} id={5}>
                    Reccuring
                </Tab>
                <Tab onClick={handleClick} active={active === 6} id={6}>
                    Discount
                </Tab>
                <Tab onClick={handleClick} active={active === 7} id={7}>
                    Special
                </Tab>
                <Tab onClick={handleClick} active={active === 8} id={8}>
                    Image
                </Tab>
                <Tab onClick={handleClick} active={active === 9} id={9}>
                    Reward
                </Tab>

                <Tab onClick={handleClick} active={active === 10} id={10}>
                    Seo
                </Tab>

                <Tab onClick={handleClick} active={active === 11} id={11}>
                    Design
                </Tab>

            </Tabs>
            <>
                <Content active={active === 0}>
                    <form>
                        <div className="from-section">
                            <label htmlFor="productName">
                                Product Name
                            </label>
                            <input id="ProductName" type="text" />
                        </div>
                        <div className="from-section">
                            <label htmlFor="productTextArea">
                                Description
                            </label>
                            <textarea id="productTextArea">
                                Text Area
                            </textarea>
                        </div>
                    </form>
                </Content>
                <Content active={active === 1}>
                    <h1>Content 2</h1>
                </Content>
                <Content active={active === 2}>
                    <h1>Content 2</h1>
                </Content>
                <Content active={active === 3}>
                    <h1>Content 2</h1>
                </Content>
                <Content active={active === 4}>
                    <h1>Content 2</h1>
                </Content>
                <Content active={active === 5}>
                    <h1>Content 2</h1>
                </Content>
                <Content active={active === 6}>
                    <h1>Content 2</h1>
                </Content>
                <Content active={active === 7}>
                    <h1>Content 2</h1>
                </Content>
                <Content active={active === 8}>
                    <h1>Content 2</h1>
                </Content>
                <Content active={active === 9}>
                    <h1>Content 2</h1>
                </Content>
                <Content active={active === 10}>
                    <h1>Content 2</h1>
                </Content>
                <Content active={active === 11}>
                    <h1>Content 2</h1>
                </Content>
            </>
        </div>
    );
};

export default Layout(App);
