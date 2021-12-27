
import { UserAgent } from "@lib/types";
import { deviceAgents } from "./agents";

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
      device: match ? "mobile" : "desktop"
    };
  }
}

const userAgentParser = new UserAgentParser();
export default userAgentParser;