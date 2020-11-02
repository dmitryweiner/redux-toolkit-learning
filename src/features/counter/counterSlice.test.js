import store from '../../app/store';
import {
    increment, decrement, incrementByAmount, incrementAsync
} from './counterSlice';

jest.useFakeTimers();

test('initial state should be 0', () => {
    expect(store.getState().counter.value).toEqual(0);
});

test('action increment should increment', () => {
    const previousValue = store.getState().counter.value;
    store.dispatch(increment());
    expect(store.getState().counter.value - previousValue).toEqual(1);
});

test('action increment by amount should increment by amount', () => {
    const previousValue = store.getState().counter.value;
    store.dispatch(incrementByAmount(10));
    expect(store.getState().counter.value - previousValue).toEqual(10);
});

test('async increment should increment after 1 sec', () => {
    const previousValue = store.getState().counter.value;
    store.dispatch(incrementAsync(10));
    jest.runAllTimers();
    expect(store.getState().counter.value - previousValue).toEqual(10);
});

test('action decrement should decrement', () => {
    const previousValue = store.getState().counter.value;
    store.dispatch(decrement());
    expect(store.getState().counter.value - previousValue).toEqual(-1);
});
