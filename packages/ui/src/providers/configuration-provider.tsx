import {
  configurationRegistry,
  type Configuration,
  type ConfigurationSection,
} from "@theme-studio/core";
import { createContext, FC } from "react";

type Context = {
  sections: ConfigurationSection[];
  configurations: Configuration[];
  getConfigurationsBySectionId: (sectionId: string) => Configuration[];
};

export const ConfigurationContext = createContext<Context>({
  sections: [],
  configurations: [],
  getConfigurationsBySectionId: (sectionId: string) => [],
});

export const ConfigurationProvider: FC = ({ children }) => {
  return (
    <ConfigurationContext.Provider
      value={{
        sections: configurationRegistry.getSections(),
        configurations: configurationRegistry.getConfigurations(),
        getConfigurationsBySectionId: (sectionId: string) => {
          return configurationRegistry
            .getConfigurations()
            .filter((configuration) => configuration.section === sectionId);
        },
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};
