import React from 'react';
import { MultiselectStateValuesSchema, type FiltersState } from '../shared/filters-state.js';
import type { FiltersDefinition } from '../shared/filters-definition.js';
import { parseAsBoolean, parseAsJson, parseAsString, useQueryStates } from 'nuqs';
import { Schema } from 'effect';
import type { GridID } from '../../shared/lib/grid-id.js';

const prepareFilter = (definition: FiltersDefinition, id: GridID) =>
    definition.reduce(
        (acc, filter) => {
            acc.states[filter.name] = (() => {
                if (filter.input.type === 'TEXT') {
                    if (filter.input.defaultValue === null) {
                        return parseAsString;
                    }

                    return parseAsString.withDefault(String(filter.input.defaultValue));
                }
                if (filter.input.type === 'CHECKBOX') {
                    if (filter.input.defaultValue === null) {
                        return parseAsBoolean;
                    }

                    return parseAsBoolean.withDefault(Boolean(filter.input.defaultValue));
                }
                if (filter.input.type === 'MULTISELECT') {
                    return parseAsJson(Schema.decodeUnknownSync(MultiselectStateValuesSchema)).withDefault(
                        Array.isArray(filter.input.defaultValue) ? filter.input.defaultValue : []
                    );
                }
                if (filter.input.type === 'SINGLESELECT_TOGGLE') {
                    return parseAsString.withDefault(String(filter.input.defaultValue));
                }
                return parseAsJson;
            })();
            acc.urlKeys[filter.name] = `${id}_${filter.name}`;
            return acc;
        },
        {
            states: {} as Record<string, any>,
            urlKeys: {} as Record<string, string>,
        }
    );

export const useFilteringUrlState = ({
    definition,
    resetPagination,
    id,
}: {
    definition: FiltersDefinition;
    resetPagination: () => void;
    id: GridID;
}) => {
    const { states, urlKeys } = prepareFilter(definition, id);

    const [filtersState, setFiltersStateInternal] = useQueryStates(
        {
            ...states,
        },
        {
            urlKeys,
        }
    );

    const setFiltersState = React.useCallback(
        (newFilters: FiltersState, preservePagination: boolean = false) => {
            setFiltersStateInternal(newFilters);
            if (!preservePagination) {
                resetPagination();
            }
        },
        [resetPagination, setFiltersStateInternal]
    );

    console.log('filtersState', filtersState);

    return {
        filtersState,
        setFiltersState,
    };
};
