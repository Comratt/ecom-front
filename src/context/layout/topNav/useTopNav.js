import {
    useMemo,
    useCallback,
    useReducer,
} from 'react';

import {
    TopNavActionType,
    defaultTopNavState,
} from './types';

const topNavReducer = (state, { type, payload }) => {
    switch (type) {
        case TopNavActionType.Init: return payload;
        case TopNavActionType.Change: return ({
            ...state,
            ...payload,
        });
        case TopNavActionType.Clear: return defaultTopNavState;
        default: return state;
    }
};

export const useTopNav = () => {
    const [topNavState, dispatchTopNav] = useReducer(
        topNavReducer,
        defaultTopNavState,
    );

    const initTopNavState = useCallback((payload) => {
        dispatchTopNav({ type: TopNavActionType.Init, payload });
    }, [dispatchTopNav]);

    const changeTopNavState = useCallback((payload) => {
        dispatchTopNav({ type: TopNavActionType.Change, payload });
    }, [dispatchTopNav]);

    return useMemo(() => ({
        topNavState,
        initTopNavState,
        changeTopNavState,
    }), [
        topNavState,
        initTopNavState,
        changeTopNavState,
    ]);
};
