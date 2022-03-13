import { UserionDetections } from "../userion/userion-detections";

export interface UserionAgent {
  os?: string;
  device?: string;
  agent: string;
}

export interface UserionDetection {
  type: UserionDetections;
  checks: Array<RegExp>;
}

export interface UserionOptions {
  /**
   * The features to check.
   */
  detections: Array<string>;
}
