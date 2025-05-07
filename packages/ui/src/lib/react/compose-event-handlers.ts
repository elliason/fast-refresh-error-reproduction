/**
 * @example
 * <input onChange={composeEventHandlers(props.onChange, (event)=> {...})}>
 *
 * @param originalEventHandler
 * @param ourEventHandler
 * @param param2
 * @returns
 */
function composeEventHandlers<E>(
    originalEventHandler?: (event: E) => void,
    ourEventHandler?: (event: E) => void,
    { checkForDefaultPrevented = true } = {}
) {
    return function handleEvent(event: E) {
        originalEventHandler?.(event);

        if (checkForDefaultPrevented === false || !(event as unknown as Event).defaultPrevented) {
            return ourEventHandler?.(event);
        }
    };
}

export { composeEventHandlers };
