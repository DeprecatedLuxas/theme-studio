import { IncomingMessage } from "http";
import { isBrowser } from "../utils";
import { UserionOptions, UserionAgent, UserionDetection } from "../types";
import { UserionDetections } from "./userion-detections";
import { UserionDeviceDetection } from "./detection";

const defaultUserionOptions: UserionOptions = {
  detections: [UserionDetections.DEVICE],
  useMedia: false,
};

// TailwindCSS Small Screen Breakpoint
const MEDIA_MATCH = "(min-width: 640px)";

class Userion {
  private registeredDetectors: Map<UserionDetections, UserionDetection>;

  private UNKNOWN_AGENT: UserionAgent = {
    agent: "",
    device: "Unknown",
  };

  constructor() {
    this.registeredDetectors = new Map();
    this.register(UserionDeviceDetection);
  }

  private register(detector: UserionDetection) {
    if (this.registeredDetectors.has(detector.type)) {
      console.error(`Detector ${detector.type} already registered, skipping`);
      return;
    }
    this.registeredDetectors.set(detector.type, detector);
  }

  parse(
    agent?: string,
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

      userionAgent[detection] = this.detect(agent, detector, options, browser);
    });

    return userionAgent;
  }

  // TODO: Clean this up.
  private detect(
    agent: string,
    detection: UserionDetection,
    options: UserionOptions,
    browser: boolean = false
  ): string {
    const { type, checks } = detection;
    const { useMedia } = options;
    const checksLength = checks.length;
    let matchedMedia = false;
    if (type === UserionDetections.DEVICE && browser && useMedia) {
      const mediaMatch = window.matchMedia(MEDIA_MATCH);
      matchedMedia = mediaMatch.matches;
    }

    let i = 0;

    let match: RegExpExecArray | null = null;

    while (i < checksLength && !match) {
      const regex = checks[i];
      match = regex.exec(agent);
      i++;
    }

    const deviceMatch = match ? "mobile" : "desktop";

    if (!useMedia) {
      return deviceMatch;
    }

    if (deviceMatch === "mobile" && !matchedMedia) {
      return "mobile";
    }

    // Probably a desktop device with a mobile user agent
    if (deviceMatch === "mobile" && matchedMedia) {
      return "desktop";
    }

    // Probably spoofed or desktop screen is really small.
    if (deviceMatch === "desktop" && !matchedMedia) {
      return "mobile";
    }

    if (deviceMatch === "desktop" && matchedMedia) {
      return "desktop";
    }

    return deviceMatch;
  }
}

const userion = new Userion();

/**
 * Gets the user agent header from the request.
 * @param req the incoming message
 * @returns user agent string or null
 */
const getAgentString = (req: IncomingMessage): string | null =>
  req.headers["user-agent"] || null;

export { userion, getAgentString, UserionDetections };
