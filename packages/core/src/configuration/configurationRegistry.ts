import { IConfiguration, IConfigurationSection } from "../types";

export interface IConfigurationRegistry {
  /**
   * Register a configuration to the registry.
   */
  registerSeciton(section: IConfigurationSection): void;

  /**
   * Returns all configuration sections contributed to this registry.
   */
  getSections(): IConfigurationSection[];

  /**
   * Register a configuration to the registry.
   */
  registerConfiguration(configuration: IConfiguration): void;

  /**
   * Returns all configuration nodes contributed to this registry.
   */
  getConfigurations(): IConfiguration[];
}

class ConfigurationRegistry implements IConfigurationRegistry {
  private readonly configurationSections: IConfigurationSection[];
  private readonly configurations: IConfiguration[];

  constructor() {
    this.configurationSections = [];
    this.configurations = [];
  }

  registerSeciton(section: IConfigurationSection): void {
    if (this.configurationSections.some((s) => s.id === section.id)) {
      console.error(
        `Tried to register a configuration section with id "${section.id}" but this id is already registered.`
      );
      return;
    }
    this.configurationSections.push(section);
  }

  getSections(): IConfigurationSection[] {
    return this.configurationSections;
  }

  registerConfiguration(configuration: IConfiguration): void {
    if (this.configurations.some((c) => c.id === configuration.id)) {
      console.error(
        `Tried to register a configuration with id "${configuration.id}" but this id is already registered.`
      );
      return;
    }

    if (
      !this.configurationSections.some((c) => c.id === configuration.section)
    ) {
      console.error(
        `Tried to register a configuration with id "${configuration.id}" to a non existing section.`
      );
      return;
    }
    
    this.configurations.push(configuration);
  }

  getConfigurations(): IConfiguration[] {
    return this.configurations;
  }
}

export const registry = new ConfigurationRegistry();

registry.registerSeciton({
  id: "general",
  title: "General",
});

registry.registerSeciton({
  id: "personalization",
  title: "Personalization",
  description: "This configuration section, is only for personalization",
});

registry.registerConfiguration({
  id: "name",
  title: "Theme Name",
  description: "The name of the theme",
  section: "general",
  node: {
    type: "string",
    default: "Untitled",
  },
});

registry.registerConfiguration({
  id: "type",
  title: "Theme Type",
  description: "The type of the theme",
  section: "general",
  node: {
    type: "string",
    enum: ["dark", "light", "highContrast", "highContrastLight"],
    default: "dark",
  },
});

registry.registerConfiguration({
  id: "sidebar-position",
  title: "Side Bar Position",
  description: "Side Bar Position of the VS Code Window",
  section: "personalization",
  node: {
    type: "string",
    enum: ["left", "right"],
    default: "left",
  },
});

registry.registerConfiguration({
  id: "window-title",
  title: "Window Title",
  description: "The title of the VSCode Window",
  section: "personalization",
  node: {
    type: "string",
    enum: ["left", "right"],
    default: "left",
  },
});
