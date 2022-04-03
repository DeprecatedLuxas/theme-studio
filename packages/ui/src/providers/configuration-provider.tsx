import {
  configurationRegistry,
  Configurations,
  getByConfigurations,
  type Configuration,
} from "@theme-studio/core";
import { createContext, Dispatch, FC, useReducer } from "react";

type Context = {
  sections: string[];
  configurations: Configuration[];
  getConfigurationsBySection: (section: string) => Configuration[];
  configuration: Configurations;
  dispatch: Dispatch<ConfigurationActions>;
};

const configurations = configurationRegistry.getConfigurations();

const initialContext: Context = {
  sections: [
    ...new Set(configurations.map((configuration) => configuration.section)),
  ],
  configurations: configurations,
  getConfigurationsBySection: (section: string) =>
    configurationRegistry
      .getConfigurations()
      .filter((configuration) => configuration.section === section),
  configuration: getByConfigurations(configurations),
  dispatch: () => null,
};

export enum ConfigurationActionTypes {
  SET_VALUE = "SET_VALUE",
}

type ConfigurationActions = {
  type: ConfigurationActionTypes.SET_VALUE;
  payload: { id: string; value: any };
};

export const ConfigurationContext = createContext<Context>(initialContext);

function reducer(state: Context, action: ConfigurationActions): Context {
  switch (action.type) {
    case ConfigurationActionTypes.SET_VALUE: {
      const { id, value } = action.payload;
      return {
        ...state,
        configuration: {
          ...state.configuration,
          [id]: value,
        },
      };
    }
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}

export const ConfigurationProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialContext);
  return (
    <ConfigurationContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};
