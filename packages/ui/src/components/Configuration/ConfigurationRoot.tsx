import type { Configuration } from "@theme-studio/core";
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
      <h1 className="text-4xl text-dark-700 dark:text-white mb-4">{section}</h1>
      <div className="">
        {configurations.map((configuration) => (
          <ConfigurationNode node={configuration} />
        ))}
      </div>
    </div>
  );
}