import * as React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref !== null && ref !== undefined) {
        (ref as React.MutableRefObject<T>).current = value;
    }
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
function composeRefs<T>(...refs: PossibleRef<T>[]) {
    return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

/**
 * A custom hook that composes multiple refs
 * A simple utility for composing two or more react refs (ref objects and callbacks are both supported and can be mixed) into a single callback ref. This enables you to effectively set multiple refs on the same component/element.
 * Accepts callback refs and RefObject(s)
 */
function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useCallback(composeRefs(...refs), refs);
}

export { composeRefs, useComposedRefs };
