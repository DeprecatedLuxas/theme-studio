import type { Configuration, ConfigurationSection } from "@theme-studio/core";

interface ConfigurationRootProps {
  section: ConfigurationSection;
  configurations: Configuration[];
}

export function ConfigurationRoot({
  section,
  configurations,
}: ConfigurationRootProps) {
  return (
    <div className="h-full bg-green-600">
      {!configurations.length && <p>Hello</p>}
    </div>
  );
}
