import { Data } from 'effect';

export class FetchError extends Data.TaggedError('FetchError')<{
    error: unknown;
}> {}
