import { Brand, Schema } from 'effect';

export type GridID = string & Brand.Brand<'GridID'>;
export const GridID = Brand.nominal<GridID>();

export const GridIdSchema = Schema.String.pipe(Schema.fromBrand(GridID));
