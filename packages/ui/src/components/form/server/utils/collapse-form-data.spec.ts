import { describe, expect, it } from "vitest";
import { collapseFormData } from "./collapse-form-data.js";

describe("collapseFormData", () => {
  it("should collapse FormData into a multilevel object", () => {
    const formData = new FormData();
    formData.append("a.b", "c");
    formData.append("d.e.f", "g");
    formData.append("h", "i");

    const result = collapseFormData(formData);

    expect(result).toEqual({
      a: {
        b: "c",
      },
      d: {
        e: {
          f: "g",
        },
      },
      h: "i",
    });
  });
});
