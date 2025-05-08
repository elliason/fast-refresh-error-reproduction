import { mockDefinition } from "../../_table/mock-definition";

export const GET = async (request: Request) => {
  return new Response(JSON.stringify(mockDefinition));
};
