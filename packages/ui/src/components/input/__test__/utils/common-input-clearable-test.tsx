import type { ComponentPropsWithRef } from "react";
import { type InputClearableProps } from "../../components/button-clear.js";
import { FlexibleInput } from "../../flexible-input.js";
import type { Locator, MountFunction } from "../types.js";
import { mountAndVerifyInputClearable } from "./mount-and-verify-clearable.js";

export async function commonInputClearableTest({
  mount,
  componentProps,
  testFn,
}: {
  mount: MountFunction;
  componentProps: ComponentPropsWithRef<typeof FlexibleInput>;
  testFn: (input: Locator, clearButton: Locator) => Promise<void>;
}) {
  const componentControlled = await mount(<FlexibleInput {...componentProps} />);

  await mountAndVerifyInputClearable({
    component: componentControlled,
    test: testFn,
  });
  await componentControlled.unmount();

  const componentUncontrolled = await mount(<FlexibleInput {...componentProps} />);
  await mountAndVerifyInputClearable({
    component: componentUncontrolled,
    test: testFn,
  });
}
