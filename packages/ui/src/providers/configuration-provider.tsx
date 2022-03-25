import {
  configurationRegistry,
  IConfiguration,
  IConfigurationSection,
} from "@theme-studio/core";
import { createContext, FC } from "react";

type IConfigurationContext = {
  sections: IConfigurationSection[];
  configurations: IConfiguration[];
};

export const ConfigurationContext = createContext<IConfigurationContext>({
  sections: [],
  configurations: [],
});

export const ConfigurationProvider: FC = ({ children }) => {
  return (
    <ConfigurationContext.Provider
      value={{
        sections: configurationRegistry.getSections(),
        configurations: configurationRegistry.getConfigurations(),
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};
