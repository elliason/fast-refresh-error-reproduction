import { Card, CardContent } from "@project/ui/components/card";
import { getTableDefinition } from "../_table/get-table-data";
import GridClientPage from "./client-page";

export default async function GridPage() {
  const definition = await getTableDefinition();
  return (
    <div className="m-4">
      <Card>
        <CardContent className="space-y-16">
          <div className="space-y-4">
            <h2>No Features Grid</h2>
            <GridClientPage tableDefinition={definition} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
