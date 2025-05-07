"use client";

import { useLocalState } from "@project/table/client/hooks/use-local-state";

const definition = {
  dataApiUrl: "/grid/data/no-features",
  sorting: null,
  sendSort: null,
  filters: [],
  sendFilters: null,
  paging: null,
  sendPage: null,
  render: {
    type: "TABLE",
    globalButtons: [],
    columns: [
      {
        name: "id",
        label: "ID",
        sortable: false,
      },
      {
        name: "name",
        label: "Jméno",
        sortable: false,
      },
      {
        name: "surname",
        label: "Příjmení",
        sortable: false,
      },
      {
        name: "personalNumber",
        label: "Osobní číslo",
        sortable: false,
      },
    ],
    identifiers: [],
  },
  type: "GRID_DEFINITION",
};

export const ClientComponent = () => {
  const state = useLocalState({ definition });
  console.log(state);
  return <div>ClientComponent</div>;
};
