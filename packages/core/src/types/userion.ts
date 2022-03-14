import { UserionDetections } from "../userion/userion-detections";

export interface UserionAgent {
  agent: string;
  os?: string;
  device?: string;
}

export interface UserionDetection {
  type: UserionDetections;
  checks: Array<RegExp>;
}

export interface UserionOptions {
  /**
   * The features to check.
   */
  detections: Array<UserionDetections>;
  /**
   * Use media queries, to give more accurate
   * device detections
   * @requires window
   */
  useMedia: boolean;
}
