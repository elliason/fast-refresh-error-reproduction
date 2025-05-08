"use server";

import { mockDefinition } from "./mock-definition";

export const serverGetTableDefinition = async () => {
  return mockDefinition;
};
