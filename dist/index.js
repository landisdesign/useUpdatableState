Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/**
 * `useState` that updates based on changes to provided value. If `value`
 * changes, the `state` value returned by `useUpdatableState` will reflect the
 * new value.
 * @param value The external value that initially populates `state` and from
 *        where `state` receives updates.
 * @param predicate An optional function (`(value, previous): boolean`) to
 *        compare the current and previous `value` properties. If it returns
 *        `false`, `state` will be updated and `changed` will be `true` until
 *        the component is rendered. If not provided, the new and previous
 *        values will be compared by a strict identity comparison (`===`).
 * @returns `[state, setState, changed]` where `state` and `setState` behave
 *          exactly like with the `useState` hook, including guarantees that
 *          `setState` will not change. `change` will be `true` when `value`
 *          changes between renders.
 */
function useUpdatableState(value, predicate) {
    if (predicate === void 0) { predicate = defaultComparator; }
    // I am explicitly choosing to modify the array returned by useState instead
    // of spreading its contents into a new array, in case React makes any
    // guarantees about the array's identity.
    var stateArray = react.useState(value);
    var _a = react.useState(value), previousValue = _a[0], setPreviousValue = _a[1];
    var changedRef = react.useRef(true);
    if (!predicate(value, previousValue)) {
        changedRef.current = true;
        stateArray[1](value);
        setPreviousValue(value);
    }
    stateArray[2] = changedRef.current;
    react.useLayoutEffect(function () {
        changedRef.current = false;
    });
    return stateArray;
}
var defaultComparator = function (a, b) { return a === b; };

exports.default = useUpdatableState;
//# sourceMappingURL=index.js.map
