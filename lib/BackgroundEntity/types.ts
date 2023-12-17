import type { FitMode } from '../types';
import type { ExtendedOptions as Options } from '../ImageEntity/types';

export type ExtendedOptions = Options & {
    fitMode?: FitMode;
    alignX?: boolean;
    alignY?: boolean;
};
