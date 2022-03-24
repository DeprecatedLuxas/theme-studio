import { IConfiguration } from "../types";

export interface IConfigurationRegistry {
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
  constructor() {}

  registerConfiguration(configuration: IConfiguration): void {}

  getConfigurations(): IConfiguration[] {
    return [];
  }
}
