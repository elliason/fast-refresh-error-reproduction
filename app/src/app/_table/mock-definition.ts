export const mockDefinition = {
  dataApiUrl: "/grid/data/example",
  sorting: {
    defaultSort: {
      name: "name",
      direction: "ASC",
    },
    sortOptions: [
      {
        name: "id",
        label: "ID",
      },
      {
        name: "name",
        label: "Jméno",
      },
      {
        name: "surname",
        label: "Příjmení",
      },
      {
        name: "personalNumber",
        label: "Osobní číslo",
      },
      {
        name: "age",
        label: "Věk",
      },
      {
        name: "dateOfBirth",
        label: "Datum narození",
      },
      {
        name: "email",
        label: "Email",
      },
      {
        name: "phoneNumber",
        label: "Telefonní číslo",
      },
      {
        name: "salary",
        label: "Plat",
      },
      {
        name: "fullTime",
        label: "Plný úvazek",
      },
    ],
  },
  sendSort: {
    placement: "QUERY",
    sortParamName: "sortName",
    directionParamName: "sortDirection",
  },
  filters: [
    {
      name: "name",
      label: "Jméno",
      input: {
        defaultValue: "",
        type: "TEXT",
      },
      type: "FILTER",
    },
    {
      name: "age",
      label: "Věk",
      input: {
        defaultValue: "",
        type: "TEXT",
      },
      type: "FILTER",
    },
    {
      name: "department",
      label: "Oddělení",
      input: {
        defaultValue: [],
        options: [
          {
            value: 1,
            label: "Arts and Crafts",
          },
          {
            value: 2,
            label: "Arts and Crafts",
          },
          {
            value: 3,
            label: "Architecture & Planning",
          },
          {
            value: 4,
            label: "Business Supplies and Equipment",
          },
          {
            value: 5,
            label: "Online Media",
          },
        ],
        type: "MULTISELECT",
      },
      type: "FILTER",
    },
    {
      name: "email",
      label: "Email",
      input: {
        defaultValue: "",
        type: "TEXT",
      },
      type: "FILTER",
    },
    {
      name: "phoneNumber",
      label: "Telefonní číslo",
      input: {
        defaultValue: "",
        type: "TEXT",
      },
      type: "FILTER",
    },
    {
      name: "salary",
      label: "Plat",
      input: {
        defaultValue: "",
        type: "TEXT",
      },
      type: "FILTER",
    },
    {
      name: "ageGroup",
      label: "Věková skupina",
      input: {
        defaultValue: "ALL",
        options: [
          {
            value: "ALL",
            label: "Všichni",
          },
          {
            value: "YOUNG",
            label: "Mladí",
          },
          {
            value: "OLD",
            label: "Staří",
          },
        ],
        type: "SINGLESELECT_TOGGLE",
      },
      type: "FILTER",
    },
    {
      name: "fullTime",
      label: "Plný úvazek",
      input: {
        defaultValue: false,
        type: "CHECKBOX",
      },
      type: "FILTER",
    },
  ],
  sendFilters: {
    placement: "QUERY",
    parameterNamePrefix: "filter",
  },
  paging: {
    defaultSize: 5,
    sizeOptions: [20, 5, 10],
  },
  sendPage: {
    placement: "QUERY",
    pageParamName: "page",
    sizeParamName: "pageSize",
    beforeCursor: "pageBeforeCursor",
    afterCursor: "pageAfterCursor",
  },
  render: {
    type: "TABLE",
    globalButtons: [
      {
        label: "Smazat",
        icon: "delete",
        action: {
          sendFilters: null,
          sendSort: null,
          sendPage: null,
          sendSelectedRows: {
            rowIdentifierKey: "id",
            placement: "QUERY",
            parameterName: "ids",
          },
          method: "DELETE",
          url: "/api/delete",
          type: "BACKEND_GLOBAL_ACTION",
        },
      },
      {
        label: "Vytvořit",
        icon: null,
        action: {
          sendFilters: null,
          sendSort: null,
          sendPage: null,
          sendSelectedRows: null,
          url: "/create",
          type: "LINK_GLOBAL_ACTION",
        },
      },
      {
        label: "Exportovat",
        icon: null,
        action: {
          sendFilters: {
            placement: "QUERY",
            parameterNamePrefix: "filter",
          },
          sendSort: {
            placement: "QUERY",
            sortParamName: "sortName",
            directionParamName: "sortDirection",
          },
          sendPage: null,
          sendSelectedRows: null,
          method: "GET",
          url: "/api/grid/export/example",
          type: "BACKEND_GLOBAL_ACTION",
        },
      },
    ],
    columns: [
      {
        name: "id",
        label: "ID",
        sortable: true,
      },
      {
        name: "name",
        label: "Jméno",
        sortable: true,
      },
      {
        name: "surname",
        label: "Příjmení",
        sortable: true,
      },
      {
        name: "personalNumber",
        label: "Osobní číslo",
        sortable: true,
      },
      {
        name: "age",
        label: "Věk",
        sortable: true,
      },
      {
        name: "dateOfBirth",
        label: "Datum narození",
        sortable: true,
      },
      {
        name: "email",
        label: "Email",
        sortable: true,
      },
      {
        name: "department",
        label: "Oddělení",
        sortable: false,
      },
      {
        name: "phoneNumber",
        label: "Telefonní číslo",
        sortable: true,
      },
      {
        name: "salary",
        label: "Plat",
        sortable: true,
      },
      {
        name: "fullTime",
        label: "Plný úvazek",
        sortable: true,
      },
      {
        name: "actions",
        label: "Akce",
        sortable: false,
      },
      {
        name: "sscId",
        label: "SSC ID",
        sortable: false,
      },
      {
        name: "roles",
        label: "grid.column.roles",
        sortable: false,
      },
    ],
    identifiers: ["id", "personalNumber"],
  },
  type: "GRID_DEFINITION",
} as const;
