import type { MaskitoOptions } from '@maskito/core';
import { useMaskito } from '@maskito/react';

export type AllMasks = 'phoneCzech' | 'phoneGermany';
export type InputMaskitoProps =
    | {
          customMask: MaskitoOptions;
          mask?: never;
      }
    | {
          customMask?: never;
          mask: AllMasks;
      };

export const useInputMask = (mask?: InputMaskitoProps) => {
    const resultMask = mask ? mask.customMask || masks[mask.mask] : null;
    return useMaskito({ options: resultMask });
};
const masks: Record<AllMasks, MaskitoOptions> = {
    phoneCzech: {
        mask: ['+', '4', '2', '0', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
    },
    phoneGermany: {
        mask: ['+', '4', '9', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
    },
};
