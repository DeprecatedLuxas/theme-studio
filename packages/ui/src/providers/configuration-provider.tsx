import { configurationRegistry, type Configuration } from "@theme-studio/core";
import { createContext, FC } from "react";

type Context = {
  sections: string[];
  configurations: Configuration[];
  getConfigurationsBySectionId: (section: string) => Configuration[];
};

export const ConfigurationContext = createContext<Context>({
  sections: [],
  configurations: [],
  getConfigurationsBySectionId: (section: string) => [],
});

export const ConfigurationProvider: FC = ({ children }) => {
  const configurations = configurationRegistry.getConfigurations();
  return (
    <ConfigurationContext.Provider
      value={{
        sections: [
          ...new Set(
            configurations.map((configuration) => configuration.section)
          ),
        ],
        configurations: configurations,
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
