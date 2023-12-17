import type { FitMode, Size } from '../types';
import type { Options } from '../Entity/types';

export type ExtendedOptions = Options & {
    fitMode?: FitMode;
    alignX?: boolean;
    alignY?: boolean;
};
