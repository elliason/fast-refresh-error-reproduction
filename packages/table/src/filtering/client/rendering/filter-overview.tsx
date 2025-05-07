import React from 'react';
import { ErrorMessage } from '../../../client/components/error-message.js';
import type { SetFiltersState } from '../../../client/state/state.js';
import {
    isCheckboxFilterDefinition,
    isMultiselectFilterDefinition,
    isSingleSelectToggleFilterDefinition,
    isTextFilterDefinition,
    type FiltersDefinition,
} from '../../shared/filters-definition.js';
import {
    assertCheckboxState,
    assertSingleSelectToggleState,
    assertsMultiselectState,
    assertTextState,
    isEmptyCheckboxState,
    isEmptyMultiselectState,
    isEmptySingleSelectToggleState,
    isEmptyTextState,
    type FiltersState,
} from '../../shared/filters-state.js';
import { FilterCheckboxOverview } from './filters/filter-checkbox-overview.js';
import { FilterMultiselectOverview } from './filters/filter-multiselect-overview.js';
import { FilterTextOverview } from './filters/filter-text-overview.js';
import { FilterSingleSelectOverview } from './filters/filter-single-select-overview.js';

export const FilterOverview = ({
    filtersDefinition,
    filtersState,
    setFiltersState,
}: {
    filtersDefinition: FiltersDefinition;
    filtersState: FiltersState | null;
    setFiltersState: SetFiltersState;
}) => {
    return (
        <>
            {filtersDefinition.map((item) => {
                return (
                    <React.Fragment key={item.name}>
                        {(() => {
                            if (isMultiselectFilterDefinition(item)) {
                                try {
                                    const state = filtersState?.[item.name];
                                    if (!state) return null;
                                    assertsMultiselectState(state);

                                    if (isEmptyMultiselectState(state)) return null;

                                    return (
                                        <FilterMultiselectOverview
                                            state={state}
                                            definition={item}
                                            setState={(value) => {
                                                setFiltersState({ ...filtersState, [item.name]: value });
                                            }}
                                        />
                                    );
                                } catch (error) {
                                    console.error(error);
                                    return (
                                        <ErrorMessage
                                            title="Filter Error"
                                            description="Invalid state or definition for the multiselect filter."
                                        />
                                    );
                                }
                            }

                            if (isCheckboxFilterDefinition(item)) {
                                try {
                                    const state = filtersState?.[item.name];
                                    if (!state) return null;
                                    assertCheckboxState(state);

                                    if (isEmptyCheckboxState(state)) return null;

                                    return (
                                        <FilterCheckboxOverview
                                            state={state}
                                            definition={item}
                                            setState={(value) => {
                                                setFiltersState({ ...filtersState, [item.name]: value });
                                            }}
                                        />
                                    );
                                } catch (error) {
                                    console.error(error);
                                    return (
                                        <ErrorMessage
                                            title="Filter Error"
                                            description="Invalid state or definition for the checkbox filter."
                                        />
                                    );
                                }
                            }

                            if (isTextFilterDefinition(item)) {
                                try {
                                    const state = filtersState?.[item.name];
                                    if (!state) return null;
                                    assertTextState(state);

                                    if (isEmptyTextState(state)) return null;

                                    return (
                                        <FilterTextOverview
                                            state={state}
                                            definition={item}
                                            setState={(value) => {
                                                setFiltersState({ ...filtersState, [item.name]: value });
                                            }}
                                        />
                                    );
                                } catch (error) {
                                    console.error(error);
                                    return (
                                        <ErrorMessage
                                            title="Filter Error"
                                            description="Invalid state or definition for the text filter."
                                        />
                                    );
                                }
                            }

                            if (isSingleSelectToggleFilterDefinition(item)) {
                                try {
                                    const state = filtersState?.[item.name];
                                    if (!state || state === item.input.defaultValue) return null;
                                    assertSingleSelectToggleState(state);

                                    if (isEmptySingleSelectToggleState(state)) return null;

                                    return (
                                        <FilterSingleSelectOverview
                                            state={state}
                                            definition={item}
                                            setState={(value) => {
                                                setFiltersState({ ...filtersState, [item.name]: value });
                                            }}
                                        />
                                    );
                                } catch (error) {
                                    console.error(error);
                                    return (
                                        <ErrorMessage
                                            title="Filter Error"
                                            description="Invalid state or definition for the single select toggle filter."
                                        />
                                    );
                                }
                            }
                        })()}
                    </React.Fragment>
                );
            })}
        </>
    );
};
