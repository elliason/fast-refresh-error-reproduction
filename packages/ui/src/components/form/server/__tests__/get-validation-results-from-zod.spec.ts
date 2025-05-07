import { fromAny } from "@total-typescript/shoehorn";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { getValidationResultsFromZod } from "../utils/get-validation-results-from-zod.js";

describe("getValidationResultsFromZod", () => {
  it("should construct validation results from array of issues and input data", () => {
    const input = {
      simple: "Hello",
      nested: {
        number: 5,
        deepNested: {
          number: "5",
        },
      },
    };

    const error = {
      issues: [
        {
          path: ["simple"],
          message: "invalid field",
          code: "invalid_type",
          expected: "number",
          received: "string",
        },
        {
          path: ["nested", "deepNested", "number"],
          message: "invalid field",
          code: "invalid_type",
          expected: "number",
          received: "string",
        },
      ] satisfies z.ZodIssue[],
    };

    const result = getValidationResultsFromZod(input, fromAny(error));
    console.log("resultt", result);
    expect(result).toEqual({
      simple: {
        value: "Hello",
        invalid: true,
        issue: {
          path: ["simple"],
          message: "invalid field",
          code: "invalid_type",
          expected: "number",
          received: "string",
        },
      },
      nested: {
        value: {
          number: 5,
          deepNested: {
            number: "5",
          },
        },
        invalid: false,
      },
      "nested.deepNested.number": {
        value: "5",
        invalid: true,
        issue: {
          path: ["nested", "deepNested", "number"],
          message: "invalid field",
          code: "invalid_type",
          expected: "number",
          received: "string",
        },
      },
    });
  });
});
