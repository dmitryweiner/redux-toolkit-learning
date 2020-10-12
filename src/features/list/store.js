import { createSelector } from 'reselect';

const ACTION_ADD = 'add';
const ACTION_DELETE = 'delete';
const ACTION_TOGGLE_DONE = 'toggle';
const ACTION_SET_FILTER = 'setFilter';
export const FilterValue = {
    ALL: 1,
    DONE: 2,
    UNDONE: 3
};

export function actionAdd(value) {
    return {
        type: ACTION_ADD,
        value
    };
}

export function actionDelete(id) {
    return {
        type: ACTION_DELETE,
        id
    };
}

export function actionToggleDone(id) {
    return {
        type: ACTION_TOGGLE_DONE,
        id
    };
}

export function actionSetFilter(value) {
    return {
        type: ACTION_SET_FILTER,
        value
    };
}

const initialState = {
    list: [],
    filter: FilterValue.ALL
};

export function listReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_ADD: {
            const newObject = {
                id: Math.random().toString(36).substring(2),
                value: action.value,
                isDone: false
            };
            return {
                ...state,
                list: [...state.list, newObject]
            };
        }
        case ACTION_DELETE: {
            const newList = state.list.filter(item => item.id !== action.id);
            return {
                ...state,
                list: [...newList]
            };
        }
        case ACTION_TOGGLE_DONE: {
            const newList = state.list.map(item => {
                if (item.id === action.id) {
                    item.isDone = !item.isDone;
                }
                return item;
            });
            return {
                ...state,
                list: [...newList]
            };
        }
        case ACTION_SET_FILTER: {
            return {
                ...state,
                filter: action.value
            }
        }
        default: {
            return state;
        }

    }
}

const listSelector = state => state.list.list;
const filterSelector = state => state.list.filter;

export const selectFilteredItems = createSelector(
    listSelector,
    filterSelector,
    (list, filter) => {
        switch (filter) {
            case FilterValue.DONE: return list.filter(item => item.isDone);
            case FilterValue.UNDONE: return list.filter(item => !item.isDone);
            default: return list;
        }
    }
);

export const selectAllItemsCount = createSelector(
    listSelector,
    list => list.length
);

export const selectDoneItemsCount = createSelector(
    listSelector,
    list => list.filter(item => item.isDone).length
);

export const selectUndoneItemsCount = createSelector(
    listSelector,
    list => list.filter(item => !item.isDone).length
);
