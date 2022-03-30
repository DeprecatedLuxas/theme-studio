import { Configuration } from "../types";

class ConfigurationRegistry {
  private readonly configurations: Configuration[];

  constructor() {
    this.configurations = [];
  }

  /**
   * Register a configuration to the registry.
   */
  registerConfiguration(configuration: Configuration): void {
    if (this.configurations.some((c) => c.id === configuration.id)) {
      console.error(
        `Tried to register a configuration with id "${configuration.id}" but this id is already registered.`
      );
      return;
    }

    this.configurations.push(configuration);
  }

  /**
   * Returns all configuration nodes contributed to this registry.
   */
  getConfigurations(): Configuration[] {
    return this.configurations;
  }
}

export const configurationRegistry = new ConfigurationRegistry();

configurationRegistry.registerConfiguration({
  id: "name",
  title: "Theme Name",
  description: "The name of the theme",
  section: "General",
  node: {
    type: "string",
    default: "Untitled",
  },
});

configurationRegistry.registerConfiguration({
  id: "type",
  title: "Theme Type",
  description: "The type of the theme",
  section: "General",
  node: {
    type: "string",
    enum: ["dark", "light", "highContrast", "highContrastLight"],
    default: "dark",
  },
});

configurationRegistry.registerConfiguration({
  id: "sidebar-position",
  title: "Side Bar Position",
  description: "Side Bar Position of the VS Code Window",
  section: "Personalization",
  node: {
    type: "string",
    enum: ["left", "right"],
    default: "left",
  },
});

configurationRegistry.registerConfiguration({
  id: "window-title",
  title: "Window Title",
  description: "The title of the VSCode Window",
  section: "Personalization",
  node: {
    type: "string",
    enum: ["left", "right"],
    default: "left",
  },
});
