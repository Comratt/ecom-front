import React from 'react';
import styled from 'styled-components';
import Sheet from 'react-modal-sheet';
import { Title } from 'Components/Title';

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

  .react-modal-sheet-content {
    /* custom styles */
  }
`;

export const BottomModal = ({ isOpen, setOpen }) => {
    const handleClose = () => setOpen(false);

    return (
        <CustomSheet disableDrag isOpen={isOpen} onClose={handleClose}>
            <Sheet.Container>
                <Sheet.Header className="react-modal-sheet-header">
                    <Title type={2}>
                        Filters
                    </Title>
                    <button onClick={handleClose} className="modal-sheet-close-btn" />
                </Sheet.Header>
                <Sheet.Content>Some content</Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </CustomSheet>
    );
};
