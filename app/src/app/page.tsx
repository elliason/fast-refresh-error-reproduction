import { ClientComponent } from "./client-component";
import { getTableData } from "./_table/get-table-data";

export default async function Home() {
  const data = await getTableData();
  console.log(data);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ClientComponent />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
