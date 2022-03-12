export interface FeatonDetectionOptions {}

export interface CustomFeatonDetectionOptions {}

export type FeatonOptions =
  | CustomFeatonDetectionOptions
  | FeatonDetectionOptions;
