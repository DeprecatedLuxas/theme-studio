import { IncomingMessage } from "http";
import { default as UserAgentParser } from "./user-agent";


export function getAgent(req: IncomingMessage): string {
  const userAgent = req.headers["user-agent"];
  
  if (!userAgent) {
    return "";
  }
  
  return userAgent;
}

export { UserAgentParser };
