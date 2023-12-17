import type { Options } from '../Entity/types';

export type ExtendedOptions = Omit<Options, 'size'> & {
  size?: {
    width: number;
    height?: number;
  } | {
    width?: number;
    height: number;
  };
};
