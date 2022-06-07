import React, { useState, useEffect } from 'react';
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
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px;
  }
  .sidebar-main g{
    fill: #887568;
  }
  .sidebar-main-content .item-filtered {
    position: relative;
  }
  .sidebar-main-content .item-filtered:before {
    content: '!';
    position: absolute;
    right: -25px;
    bottom: 3px;
    z-index: 2;
    background: var(--color-accent);
    color: var(--color-lightest);
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -1px 1px 0 0 #fff;
    border-radius: 7px;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
  }
  
`;

const getColorStyles = (color) => ({
    width: 12,
    height: 12,
    marginRight: 10,
    backgroundColor: color,
    borderRadius: '50%',
});
const colorWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
};

export const BottomModal = ({
    isOpen,
    setOpen,
    filters,
    handleSortBy,
    handleFilterBy,
    handleAvailable,
    minMaxPrice = [],
    colors = [],
    resetFilters,
    isFiltered,
    filtersDiff,
    subcategories,
    collectionId,
}) => {
    const options = [
        {
            content: [
                {
                    id: 1,
                    name: 'Сортування',
                    type: 'sort',
                    filterType: 'sortBy',
                    children: [
                        {
                            content: [
                                {
                                    id: 2,
                                    optionId: 2,
                                    value: 'relevance',
                                    name: 'Актуальні',
                                    optName: 'sortBy',
                                },
                                {
                                    id: 3,
                                    optionId: 3,
                                    value: 'dateAsc',
                                    name: 'Дата | Від нових до старіших',
                                    optName: 'sortBy',
                                },
                                {
                                    id: 4,
                                    optionId: 4,
                                    value: 'dateDesc',
                                    name: 'Дата | Від старіших до нових',
                                    optName: 'sortBy',
                                },
                                {
                                    id: 5,
                                    optionId: 5,
                                    value: 'priceAsc',
                                    name: 'Ціна | Від нижчого до більшого',
                                    optName: 'sortBy',
                                },
                                {
                                    id: 6,
                                    optionId: 6,
                                    value: 'priceDesc',
                                    name: 'Ціна | Від більшого до нижчого',
                                    optName: 'sortBy',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 7,
                    name: 'Колір',
                    type: 'color',
                    children: [
                        {
                            content: colors?.map((color) => ({
                                id: color.id,
                                name: (
                                    <div style={colorWrapperStyles}>
                                        <div style={getColorStyles(color.color)} />
                                        {color.name}
                                    </div>
                                ),
                                optionId: color.id,
                                optName: 'color',
                            })),
                        },
                    ],
                },
                {
                    id: 8,
                    name: 'Наявність',
                    type: 'stock',
                    filterType: 'available',
                    children: [
                        {
                            content: [
                                {
                                    id: 'stock',
                                    optionId: 'stock',
                                    optName: 'stock',
                                    name: 'В наявності',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 11,
                    name: 'Підкатегорія',
                    type: 'category',
                    filterType: 'category',
                    children: [{
                        content: subcategories?.map((subcategory) => ({
                            id: subcategory.category_id,
                            optionId: subcategory.category_id,
                            name: subcategory.category_name,
                            optName: 'category',
                        })),
                    }],
                },
                {
                    id: 9,
                    name: 'Ціна від і до',
                    children: [{
                        element: <PriceRange
                            current={filters?.price}
                            min={minMaxPrice[0]}
                            max={minMaxPrice[1]}
                            onFinalChange={handleFilterBy}
                        />,
                    }],
                },
                {
                    id: 10,
                    name: '',
                },
            ],
        },
    ];
    const handleClose = () => setOpen(false);
    const [opt, setOpt] = useState(options);

    useEffect(() => {
        if (colors?.length) {
            setOpt((prevOptions) => ([{
                content: prevOptions[0].content?.map((option) => {
                    if (option.id === 7) {
                        return ({
                            id: 7,
                            name: 'Колір',
                            type: 'color',
                            filterType: 'color',
                            children: [{
                                content: colors?.map((color) => ({
                                    id: color.id,
                                    name: (
                                        <div style={colorWrapperStyles}>
                                            <div style={getColorStyles(color.color)} />
                                            {color.name}
                                        </div>
                                    ),
                                    optionId: color.id,
                                    optName: 'color',
                                    icon: !filters?.color?.includes(color.id) ? null : <Check />,
                                })),
                            }],
                        });
                    }

                    return option;
                }),
            }]));
        }
    }, [colors]);
    useEffect(() => {
        setOpt((prevOptions) => ([{
            content: prevOptions[0].content?.map((option) => {
                if (option.id === 1) {
                    return ({
                        ...option,
                        children: [{
                            content: option.children[0].content.map((childOption) => ({
                                ...childOption,
                                icon: filters?.sortBy !== childOption.value ? null : <Check />,
                            })),
                        }],
                    });
                }
                if (option.id === 8) {
                    return ({
                        ...option,
                        children: [{
                            content: option.children[0].content.map((childOption) => ({
                                ...childOption,
                                icon: !filters?.available ? null : <Check />,
                            })),
                        }],
                    });
                }

                return option;
            }),
        }]));
    }, [filters]);

    useEffect(() => {
        if (minMaxPrice?.length) {
            setOpt((prevOptions) => ([{
                content: prevOptions[0].content?.map((option) => {
                    if (option.id === 9) {
                        return ({
                            id: 9,
                            name: 'Ціна від і до',
                            filterType: 'price',
                            children: [{
                                element: <PriceRange
                                    current={filters?.price}
                                    min={minMaxPrice[0]}
                                    max={minMaxPrice[1]}
                                    onFinalChange={handleFilterBy}
                                />,
                            }],
                        });
                    }

                    return option;
                }),
            }]));
        }
    }, [filters.price]);

    useEffect(() => {
        setOpt((prevOptions) => ([{
            content: prevOptions[0].content?.map((option) => {
                if (option.id === 10) {
                    if (isFiltered) {
                        return {
                            id: 10,
                            name: <span onClick={resetFilters}>Обнулити фільтри</span>,
                        };
                    }

                    return {
                        id: 10,
                        name: '',
                    };
                }

                return option;
            }),
        }]));
    }, [isFiltered]);

    useEffect(() => {
        if (minMaxPrice?.length) {
            setOpt((prevOptions) => ([{
                content: prevOptions[0].content?.map((option) => {
                    if (option.id === 9) {
                        return ({
                            id: 9,
                            name: 'Ціна від і до',
                            filterType: 'price',
                            children: [{
                                element: <PriceRange
                                    current={filters?.price}
                                    min={minMaxPrice[0]}
                                    max={minMaxPrice[1]}
                                    onFinalChange={handleFilterBy}
                                />,
                            }],
                        });
                    }

                    return option;
                }),
            }]));
        }
    }, [minMaxPrice]);

    useEffect(() => {
        setOpt((prevOptions) => ([{
            content: prevOptions[0].content?.map((option) => ({
                ...option,
                filtered: filtersDiff?.includes(option.filterType),
            })),
        }]));
    }, [filtersDiff]);

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
        if (o.optName === 'category') {
            const filterCat = filters?.category?.filter((cat) => cat !== collectionId) || [];
            const modCat = filterCat?.includes(o.optionId)
                ? filterCat?.filter((s) => s !== o.optionId)
                : [...filterCat, o.optionId];

            if (!modCat?.length) {
                modCat.push(collectionId);
            }

            handleFilterBy('category', modCat);
        }
        if (o.optionId) {
            setOpt((prevOptions) => ([{
                ...prevOptions,
                content: prevOptions[0].content?.map((option) => {
                    if (['color', 'sort', 'stock', 'category'].includes(option.type)) {
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
                                        icon: ['color', 'size', 'category'].includes(option.type) ? childOption.icon : null,
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
