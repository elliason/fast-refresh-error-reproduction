import 'server-only'; // This is a marker package to indicate that a module can only be used in Server Components

/**
 * We have to use this file for separate export of server handling code, due to few reasons:
 * 1) Don't know why, but mixing server actions code and client code breaks the application from working and there are errors telling that we are using client stuff in server code
 * 2) We don't want the server related code to leak into the client bundle
 */
export {
    type FormServerState,
    type RecursiveValidationObject,
    type FieldValidationResult,
} from './schema/form-server-state.js';
export { submitAction } from './actions/submit-action.js';
