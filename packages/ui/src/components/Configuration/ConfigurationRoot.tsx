import type { Configuration } from "@theme-studio/core";
import { Heading } from "../Heading";
import { ConfigurationNode } from "./ConfigurationNode";

interface ConfigurationRootProps {
  section: string;
  configurations: Configuration[];
}

export function ConfigurationRoot({
  section,
  configurations,
}: ConfigurationRootProps) {
  return (
    <div className="h-full">
      <Heading className="text-4xl text-dark-700 dark:text-white mb-4">{section}</Heading>
      <div className="">
        {configurations.map((configuration, idx) => (
          <ConfigurationNode key={`configuration-node-${idx}`} node={configuration} />
        ))}
      </div>
    </div>
  );
}
