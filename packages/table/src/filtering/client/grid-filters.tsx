import { FilterControls } from './rendering/filter-controls.js';
import type { FiltersState } from '../shared/filters-state.js';
import type { SetFiltersState } from '../../client/state/state.js';
import type { FiltersDefinition } from '../shared/filters-definition.js';
import { FilterOverview } from './rendering/filter-overview.js';
import type {
    MultiselectGridFilterOptions,
    FilterRenderers,
    RenderersByFilterName,
} from '../shared/filter-renderers.js';

interface GridFiltersProps {
    title?: string;
    filtersDefinition: FiltersDefinition;
    filtersState: FiltersState | null;
    setFiltersState: SetFiltersState;
    multiselectOptions: MultiselectGridFilterOptions;
    renderers?: FilterRenderers;
    filterWrappersClassNames?: {
        filtersWrapper?: string;
        filterControlsWrapper?: string;
        filterOverviewWrapper?: string;
        filterTitle?: string;
    };
    renderersByFilterName?: RenderersByFilterName;
}

export const GridFilters = ({
    title,
    filtersDefinition,
    filtersState,
    setFiltersState,
    multiselectOptions,
    renderers,
    renderersByFilterName,
    filterWrappersClassNames = {
        filtersWrapper: 'grid-filters space-y-8',
        filterControlsWrapper: 'grid-filters-wrapper grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
        filterOverviewWrapper: 'grid-filter-labels flex flex-wrap gap-2',
        filterTitle: 'grid-filter-title mb-2 text-base',
    },
}: GridFiltersProps) => {
    const { FilterOverview: FilterOverviewRenderer, FilterTitle: FilterTitleRenderer } = renderers ?? {};
    return (
        <div className={filterWrappersClassNames.filtersWrapper}>
            {(() => {
                if (title) {
                    return <h3 className={filterWrappersClassNames.filterTitle}>{title}</h3>;
                }
                if (FilterTitleRenderer) {
                    return <FilterTitleRenderer />;
                }
                return null;
            })()}

            <div className={filterWrappersClassNames.filterControlsWrapper}>
                <FilterControls
                    filtersDefinition={filtersDefinition}
                    filtersState={filtersState}
                    setFiltersState={setFiltersState}
                    multiselectOptions={multiselectOptions}
                    renderers={renderers}
                    renderersByFilterName={renderersByFilterName}
                />
            </div>
            <div className={filterWrappersClassNames.filterOverviewWrapper}>
                {(() => {
                    if (FilterOverviewRenderer) {
                        return (
                            <FilterOverviewRenderer
                                filtersDefinition={filtersDefinition}
                                filtersState={filtersState}
                                setFiltersState={setFiltersState}
                            />
                        );
                    }

                    return (
                        <FilterOverview
                            filtersDefinition={filtersDefinition}
                            filtersState={filtersState}
                            setFiltersState={setFiltersState}
                        />
                    );
                })()}
            </div>
        </div>
    );
};
