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
    type FiltersState,
} from '../../shared/filters-state.js';
import { FilterMultiselect } from './filters/filter-multiselect.js';
import { ErrorMessage } from '../../../client/components/error-message.js';
import { FilterText } from './filters/filter-text.js';
import { FilterCheckbox } from './filters/filter-checkbox.js';
import React from 'react';
import type {
    MultiselectGridFilterOptions,
    FilterRenderers,
    RenderersByFilterName,
} from '../../shared/filter-renderers.js';
import { FilterSingleSelect } from './filters/filter-single-select.js';

export const FilterControls = ({
    filtersState,
    setFiltersState,
    filtersDefinition,
    multiselectOptions,
    renderers,
    renderersByFilterName,
}: {
    filtersState: FiltersState | null;
    setFiltersState: SetFiltersState;
    filtersDefinition: FiltersDefinition;
    multiselectOptions: MultiselectGridFilterOptions;
    renderers?: FilterRenderers;
    renderersByFilterName?: RenderersByFilterName;
}) => {
    const {
        MultiselectFilter: MultiselectFilterRenderer,
        TextFilter: TextFilterRenderer,
        CheckboxFilter: CheckboxFilterRenderer,
        SingleSelectToggleFilter: SingleSelectToggleFilterRenderer,
    } = renderers ?? {};
    return (
        <>
            {filtersDefinition.map((item) => {
                return (
                    <React.Fragment key={item.name}>
                        {(() => {
                            const Renderer = renderersByFilterName?.[item.name];
                            if (Renderer) {
                                const state = filtersState?.[item.name];

                                return (
                                    <Renderer
                                        definition={item}
                                        state={state ?? null}
                                        setState={(value) => setFiltersState({ ...filtersState, [item.name]: value })}
                                    />
                                );
                            }

                            if (isMultiselectFilterDefinition(item)) {
                                try {
                                    const state = filtersState?.[item.name];

                                    assertsMultiselectState(state);

                                    if (MultiselectFilterRenderer) {
                                        return (
                                            <MultiselectFilterRenderer
                                                state={state}
                                                setState={(value) =>
                                                    setFiltersState({ ...filtersState, [item.name]: value })
                                                }
                                                definition={item}
                                                placeholder={multiselectOptions.placeholder}
                                                searchPlaceholder={multiselectOptions.searchPlaceholder}
                                            />
                                        );
                                    }

                                    return (
                                        <FilterMultiselect
                                            state={state}
                                            setState={(value) =>
                                                setFiltersState({ ...filtersState, [item.name]: value })
                                            }
                                            definition={item}
                                            placeholder={multiselectOptions.placeholder}
                                            searchPlaceholder={multiselectOptions.searchPlaceholder}
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

                            if (isTextFilterDefinition(item)) {
                                try {
                                    const state = filtersState?.[item.name];

                                    assertTextState(state);

                                    if (TextFilterRenderer) {
                                        return (
                                            <TextFilterRenderer
                                                definition={item}
                                                state={state}
                                                setState={(value, preservePagination) =>
                                                    setFiltersState(
                                                        { ...filtersState, [item.name]: value },
                                                        preservePagination
                                                    )
                                                }
                                            />
                                        );
                                    }

                                    return (
                                        <FilterText
                                            definition={item}
                                            state={state}
                                            setState={(value, preservePagination) =>
                                                setFiltersState(
                                                    { ...filtersState, [item.name]: value },
                                                    preservePagination
                                                )
                                            }
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

                            if (isCheckboxFilterDefinition(item)) {
                                try {
                                    const state = filtersState?.[item.name];

                                    assertCheckboxState(state);

                                    if (CheckboxFilterRenderer) {
                                        return (
                                            <CheckboxFilterRenderer
                                                definition={item}
                                                state={state}
                                                setState={(value) =>
                                                    setFiltersState({ ...filtersState, [item.name]: value })
                                                }
                                            />
                                        );
                                    }

                                    return (
                                        <FilterCheckbox
                                            definition={item}
                                            state={state}
                                            setState={(value) =>
                                                setFiltersState({ ...filtersState, [item.name]: value })
                                            }
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

                            if (isSingleSelectToggleFilterDefinition(item)) {
                                try {
                                    const state = filtersState?.[item.name];

                                    assertSingleSelectToggleState(state);

                                    if (SingleSelectToggleFilterRenderer) {
                                        return (
                                            <SingleSelectToggleFilterRenderer
                                                definition={item}
                                                state={state}
                                                setState={(value) =>
                                                    setFiltersState({ ...filtersState, [item.name]: value })
                                                }
                                            />
                                        );
                                    }

                                    return (
                                        <FilterSingleSelect
                                            definition={item}
                                            state={state}
                                            setState={(value) =>
                                                setFiltersState({ ...filtersState, [item.name]: value })
                                            }
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
