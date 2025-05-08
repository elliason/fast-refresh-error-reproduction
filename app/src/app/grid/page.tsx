import { Card, CardContent } from "@project/ui/components/card";
import GridClientPage from "./client-page";
import { serverGetTableDefinition } from "../_table/get-table-data-server";
import { getTableData } from "../_table/get-table-data";

export default async function GridPage() {
  const definition = await serverGetTableDefinition();
  return (
    <div className="m-4">
      <Card>
        <CardContent className="space-y-16">
          <div className="space-y-4">
            <h2>No Features Grid</h2>
            <GridClientPage tableDefinition={definition} getData={getTableData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
