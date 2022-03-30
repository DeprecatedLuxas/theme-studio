import { configurationRegistry, type Configuration } from "@theme-studio/core";
import { createContext, FC } from "react";

type Context = {
  sections: string[];
  configurations: Configuration[];
};

export const ConfigurationContext = createContext<Context>({
  sections: [],
  configurations: [],
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
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};
