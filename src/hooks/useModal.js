import { useState, useCallback } from 'react';

export const useModal = (initialState = false) => {
    const [opened, setOpened] = useState(initialState);

    const setModalState = useCallback(
        (state) => {
            setOpened(state);
        },
        [setOpened],
    );

    return {
        opened,
        setModalState,
    };
};
