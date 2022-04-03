import { Configuration, ConfigurationKeys, Configurations } from "../types";

/**
 * Get all defaultValues from configurations,
 * and adds it to return value.
 * @param configurations
 */
export function getByConfigurations(
  configurations: Configuration[]
): Configurations {
  let result: Configurations = {
    name: "Untitled",
    type: "dark",
    sidebarPosition: "left",
    windowTitle: "$(dirty)$(fileName) - $(workspaceName) - $(appName)",
  };

  for (const configuration of configurations) {
    const {
      id,
      node: { default: defaultValue },
    } = configuration;

    const configurationKeys = Object.keys(result);

    if (!configurationKeys.includes(id)) {
      throw new Error("Invalid configuration id");
    }

    if (result[<ConfigurationKeys>id] !== defaultValue) {
      result[<ConfigurationKeys>id] = defaultValue;
    }
  }

  return result;
}
