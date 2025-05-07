import type { ValidationMode as HookFormValidationMode } from 'react-hook-form';

export type ValidationMode = keyof HookFormValidationMode;

export type ValidationModeProp = { ValidationMode?: ValidationMode };
