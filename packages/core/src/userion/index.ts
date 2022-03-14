import { IncomingMessage } from "http";
import { isBrowser } from "../dom";
import { UserionOptions, UserionAgent, UserionDetection } from "../types";
import { UserionDetections } from "./userion-detections";
import { UserionDeviceDetection } from "./detection";

const defaultUserionOptions: UserionOptions = {
  detections: [UserionDetections.DEVICE],
  useMedia: false,
};

class Userion {
  private registeredDetectors: Map<UserionDetections, UserionDetection>;

  private UNKNOWN_AGENT: UserionAgent = {
    agent: "",
    device: "Unknown",
    os: "Unknown",
  };

  constructor() {
    this.registeredDetectors = new Map();
  }

  register(detector: UserionDetection) {
    if (this.registeredDetectors.has(detector.type)) {
      console.error(`Detector ${detector.type} already registered, skipping`);
      return;
    }
    console.log(`Registering userion detector for: ${detector.type}`);
    this.registeredDetectors.set(detector.type, detector);
  }

  parse(
    agent: string | null,
    options: UserionOptions = defaultUserionOptions
  ): UserionAgent {
    const { detections, useMedia } = options;

    if (!agent) return this.UNKNOWN_AGENT;

    const browser = isBrowser();
    if (useMedia && !browser) {
      throw new Error("Media detection is only supported in browser");
    }


    const userionAgent: UserionAgent = {
      agent,
    };

    detections.forEach((detection) => {
      const detector = this.registeredDetectors.get(detection);
      if (!detector) {
        console.error(`No detector found for ${detection}`);
        return;
      }

      userionAgent[detection] = this.detect(agent, detector, browser);
    });


    return userionAgent;
  }

  detect(agent: string, detection: UserionDetection, browser: boolean = false): string {
    const { type, checks } = detection;

    const checksLength = checks.length;
    
    let i = 0;

    let match: RegExpExecArray | null = null;

    while (i < checksLength && !match) {
      const regex = checks[i];
      match = regex.exec(agent);
      i++;
    }

    return match ? "mobile" : "desktop"; 
  }

}

const userion = new Userion();

userion.register(UserionDeviceDetection);

/**
 * Gets the user agent header from the request.
 * @param req the incoming message
 * @returns user agent string or null
 */
const getAgentString = (req: IncomingMessage): string | null =>
  req.headers["user-agent"] || null;

export { userion, getAgentString };
