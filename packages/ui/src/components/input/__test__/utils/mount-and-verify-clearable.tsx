import { expect, type MountResult } from "@playwright/experimental-ct-react";
import type { Locator } from "../types.js";

type Params = {
  component: MountResult; // TestType is not exported from the module yet
  test: (input: Locator, clearButton: Locator) => Promise<void>;
};

export async function mountAndVerifyInputClearable({ component, test }: Params) {
  expect(component).not.toBeNull();

  const input = component.locator("input");
  await expect(input).toBeVisible();

  const clearButton = component.locator("#clear-button");

  await test(input, clearButton);
}
