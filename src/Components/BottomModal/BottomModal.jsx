import React, { useState } from 'react';
import MultilevelSidebar from 'Components/MultiLevelSidebar';
import styled from 'styled-components';
import Sheet from 'react-modal-sheet';
import { Title } from 'Components/Title';
import { PriceRange } from '../CheckboxFilterItem/CheckboxFilterItem';
import { Check } from '../../Icons';

const CustomSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
    /* custom styles */
  }

  .react-modal-sheet-container {
    /* custom styles */
  }

  .react-modal-sheet-header {
    justify-content: center;
    border-bottom: 1px solid #e5e5e5;
    height: 51px;
    padding: 15px;
    text-align: left;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
  }

  .react-modal-sheet-header .modal-sheet-close-btn {
    height: 51px;
    right: 0;
    left: auto;
    width: 50px;
    position: absolute;
    z-index: 999999999;
    top: 0;
    border: 0;
    border-radius: 0;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgMUw3IDdNMTMgMTNMNyA3TTcgN0wxIDEzTTcgN0wxMyAxIiBzdHJva2U9IiM3MzYyNTYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cgo=) no-repeat 50% 50%;
    cursor: pointer;
  }

  .react-modal-sheet-drag-indicator {
    /* custom styles */
  }
  
  #react-sidebar .sidebar-backdrop.show {
    visibility: hidden;
    opacity: 1;
  }
  #react-sidebar .sidebar-main {
    position: absolute;
    width: 100%;
  }
  .sidebar-main li:first-child{
    border-top:none
  }
  
  .sidebar-main li{
    color: #887568;
    border-top: 1px solid #e5e5e5;
    font-size: 14px;
  }
  .first-back-btn{
    color: #887568;
    background: #F5F3F3;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .sidebar-body{
    margin-top: 10px;
  }
  .sidebar-main g{
    fill: #887568;
  }
  
`;

export const BottomModal = ({
    isOpen,
    setOpen,
    filters,
    handleSortBy,
    handleFilterBy,
    handleAvailable,
    minMaxPrice = [],
    colors = [],
}) => {
    const options = [
        {
            content: [
                {
                    id: 1,
                    name: 'Sort By',
                    type: 'sort',
                    children: [
                        {
                            content: [
                                {
                                    id: 2,
                                    optionId: 2,
                                    value: 'relevance',
                                    name: 'Relevance',
                                    optName: 'sortBy',
                                },
                                {
                                    id: 3,
                                    optionId: 3,
                                    value: 'dateAsc',
                                    name: 'Date | New to Old',
                                    optName: 'sortBy',
                                },
                                {
                                    id: 4,
                                    optionId: 4,
                                    value: 'dateDesc',
                                    name: 'Date | Old to New',
                                    optName: 'sortBy',
                                },
                                {
                                    id: 5,
                                    optionId: 5,
                                    value: 'priceAsc',
                                    name: 'Price | Low to high',
                                    optName: 'sortBy',
                                },
                                {
                                    id: 6,
                                    optionId: 6,
                                    value: 'priceDesc',
                                    name: 'Price | High to low',
                                    optName: 'sortBy',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 7,
                    name: 'Colour',
                    type: 'color',
                    children: [
                        {
                            content: colors?.map((color) => ({
                                id: color.id,
                                name: color.name,
                                optionId: color.id,
                                optName: 'color',
                            })),
                        },
                    ],
                },
                {
                    id: 8,
                    name: 'Stock',
                    type: 'stock',
                    children: [
                        {
                            content: [
                                {
                                    id: 'stock',
                                    optionId: 'stock',
                                    optName: 'stock',
                                    name: 'In stock',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 9,
                    name: 'Price',
                    children: [{
                        element: <PriceRange
                            current={filters?.price}
                            min={minMaxPrice[0]}
                            max={minMaxPrice[1]}
                            onFinalChange={handleFilterBy}
                        />,
                    }],
                },
            ],
        },
    ];
    const handleClose = () => setOpen(false);
    const [opt, setOpt] = useState(options);

    const handleItemClick = (o) => {
        if (o.optName === 'sortBy') {
            handleSortBy(filters.sortBy === o.value ? '' : o.value);
        }
        if (o.optName === 'stock') {
            handleAvailable();
        }
        if (o.optName === 'color') {
            const filterColors = filters?.color || [];
            const modColors = filterColors?.includes(o.optionId)
                ? filterColors?.filter((s) => s !== o.optionId)
                : [...filterColors, o.optionId];

            handleFilterBy('color', modColors);
        }
        if (o.optionId) {
            setOpt((prevOptions) => ([{
                ...prevOptions,
                content: prevOptions[0].content?.map((option) => {
                    if (['color', 'sort', 'stock'].includes(option.type)) {
                        return ({
                            ...option,
                            children: [{
                                content: option.children[0].content.map((childOption) => {
                                    if (childOption.optionId === o.optionId) {
                                        return ({
                                            ...childOption,
                                            icon: childOption?.icon ? null : <Check />,
                                        });
                                    }

                                    return ({
                                        ...childOption,
                                        icon: ['color', 'size'].includes(option.type) ? childOption.icon : null,
                                    });
                                }),
                            }],
                        });
                    }

                    return option;
                }),
            }]));
        }
    };

    return (
        <CustomSheet disableDrag isOpen={isOpen} onClose={handleClose}>
            <Sheet.Container>
                <Sheet.Header className="react-modal-sheet-header">
                    <Title type={2}>
                        Фільтри
                    </Title>
                    <button onClick={handleClose} className="modal-sheet-close-btn" />
                </Sheet.Header>
                <Sheet.Content>
                    <div className="react-modal-sheet-content">
                        <div>
                            <MultilevelSidebar
                                open
                                options={opt}
                                onItemClick={handleItemClick}
                            >
                                <h1>Деякі текстові ціни</h1>
                            </MultilevelSidebar>
                        </div>
                    </div>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </CustomSheet>
    );
};
