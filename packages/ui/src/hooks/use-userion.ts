import { userion, UserionOptions, UserionAgent } from "@theme-studio/core";
import { useEffect, useState } from "react";

type UseUserionResult = UserionAgent;

export function useUserion({
  detections,
  useMedia,
}: UserionOptions): UseUserionResult {
  const [agent, setAgent] = useState<UserionAgent>({
    agent: "",
  });

  useEffect(() => {
    setAgent(userion.parse(navigator.userAgent, { detections, useMedia }));
  }, []);

  return agent;
}
