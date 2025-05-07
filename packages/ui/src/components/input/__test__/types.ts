import type { JSX } from 'react';
import type { MountResult } from '@playwright/experimental-ct-react';

export type Locator = ReturnType<MountResult['locator']>;
export type MountFunction = (component: JSX.Element) => Promise<MountResult>;
