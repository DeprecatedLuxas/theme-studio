import { IncomingMessage } from "http";
import { UserAgent } from "../types";
import { deviceAgents } from "./device-agents";

class UserAgentParser {
  parse(userAgent: string): UserAgent {
    const agentsLength = deviceAgents.length;
    let i = 0;
    let match: RegExpExecArray | null = null;

    while (i < agentsLength && !match) {
      const regex = deviceAgents[i];
      match = regex.exec(userAgent);

      i++;
    }

    return {
      agent: userAgent,
      device: match ? "mobile" : "desktop",
    };
  }
}

const userAgentParser = new UserAgentParser();

function getAgent(req: IncomingMessage): string {
  const userAgent = req.headers["user-agent"];
  
  if (!userAgent) {
    return "";
  }
  
  return userAgent;
}

export { userAgentParser as UserAgentParser, getAgent };