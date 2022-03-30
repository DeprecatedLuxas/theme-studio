import { Configuration, ConfigurationSection } from "../types";

class ConfigurationRegistry {
  private readonly configurationSections: ConfigurationSection[];
  private readonly configurations: Configuration[];

  constructor() {
    this.configurationSections = [];
    this.configurations = [];
  }

  /**
   * Register a configuration to the registry.
   */
  registerSection(section: ConfigurationSection): void {
    if (this.configurationSections.some((s) => s.id === section.id)) {
      console.error(
        `Tried to register a configuration section with id "${section.id}" but this id is already registered.`
      );
      return;
    }
    this.configurationSections.push(section);
  }

  /**
   * Returns all configuration sections contributed to this registry.
   */
  getSections(): ConfigurationSection[] {
    return this.configurationSections;
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

  /**
   * Returns all configuration nodes contributed to this registry.
   */
  getConfigurations(): Configuration[] {
    return this.configurations;
  }
}

export const configurationRegistry = new ConfigurationRegistry();

configurationRegistry.registerSection({
  id: "general",
  title: "General",
});

configurationRegistry.registerSection({
  id: "personalization",
  title: "Personalization",
  description: "Configure the visuals for this theme, can only be seen by you.",
});

configurationRegistry.registerSection({
  id: "extensions",
  title: "Extensions",
  description: "Extensions are installed from the marketplace.",
});

configurationRegistry.registerConfiguration({
  id: "name",
  title: "Theme Name",
  description: "The name of the theme",
  section: "general",
  node: {
    type: "string",
    default: "Untitled",
  },
});

configurationRegistry.registerConfiguration({
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

configurationRegistry.registerConfiguration({
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

configurationRegistry.registerConfiguration({
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
