import { Data } from 'effect';

export class TypeCheckError extends Data.TaggedError('TypeCheckError')<{
    error: unknown;
}> {}
